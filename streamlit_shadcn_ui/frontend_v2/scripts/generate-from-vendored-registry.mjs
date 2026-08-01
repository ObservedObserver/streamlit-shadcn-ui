import { createHash } from "node:crypto"
import {
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  unlink,
  writeFile,
} from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

import {
  Node,
  Project,
  QuoteKind,
  ScriptKind,
  SyntaxKind,
} from "ts-morph"

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
)
const registryDir = path.join(projectRoot, "provenance", "registry")
const manifestPath = path.join(
  projectRoot,
  "provenance",
  "shadcn-base-ui.json"
)
const checkedSourceDir = path.join(
  projectRoot,
  "src",
  "components",
  "ui"
)
function sha256(content) {
  return createHash("sha256").update(content).digest("hex")
}

function getStringAttribute(element, name) {
  const attribute = element
    .getAttributes()
    .find(
      (candidate) =>
        Node.isJsxAttribute(candidate) &&
        candidate.getNameNode().getText() === name
    )

  if (!attribute || !Node.isJsxAttribute(attribute)) {
    return null
  }

  const initializer = attribute.getInitializer()
  return initializer && Node.isStringLiteral(initializer)
    ? initializer.getLiteralText()
    : null
}

function replaceIconPlaceholders(sourceFile) {
  const iconElements = sourceFile
    .getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)
    .filter((element) => element.getTagNameNode().getText() === "IconPlaceholder")

  if (iconElements.length === 0) {
    return
  }

  const iconNames = new Set()
  for (const element of iconElements) {
    const iconName = getStringAttribute(element, "lucide")
    if (!iconName) {
      throw new Error(
        `IconPlaceholder without a lucide name in ${sourceFile.getBaseName()}.`
      )
    }
    iconNames.add(iconName)

    const classNameAttribute = element
      .getAttributes()
      .find(
        (attribute) =>
          Node.isJsxAttribute(attribute) &&
          attribute.getNameNode().getText() === "className"
      )
    const className = classNameAttribute
      ? ` ${classNameAttribute.getText()}`
      : ""
    element.replaceWithText(`<${iconName}${className} />`)
  }

  const placeholderImport = sourceFile.getImportDeclaration(
    "@/app/(create)/components/icon-placeholder"
  )
  if (!placeholderImport) {
    throw new Error(
      `IconPlaceholder import missing in ${sourceFile.getBaseName()}.`
    )
  }
  placeholderImport.remove()

  sourceFile.addImportDeclaration({
    moduleSpecifier: "lucide-react",
    namedImports: [...iconNames].sort(),
  })
}

function adaptAliases(sourceFile) {
  for (const declaration of sourceFile.getImportDeclarations()) {
    const specifier = declaration.getModuleSpecifierValue()
    if (specifier === "@/registry/base-nova/lib/utils") {
      declaration.setModuleSpecifier("@/lib/utils")
    } else if (specifier.startsWith("@/registry/base-nova/ui/")) {
      declaration.setModuleSpecifier(
        specifier.replace(
          "@/registry/base-nova/ui/",
          "@/components/ui/"
        )
      )
    }
  }
}

function adaptPortals(sourceFile) {
  const portalElements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ].filter((element) =>
    element.getTagNameNode().getText().endsWith("Primitive.Portal")
  )

  if (portalElements.length === 0) {
    return
  }

  const ownerFunctions = new Set()
  for (const portal of portalElements) {
    const functionDeclaration = portal.getFirstAncestorByKind(
      SyntaxKind.FunctionDeclaration
    )
    if (!functionDeclaration) {
      throw new Error(
        `Portal outside a function declaration in ${sourceFile.getBaseName()}.`
      )
    }
    ownerFunctions.add(functionDeclaration)

    const hasContainer = portal
      .getAttributes()
      .some(
        (attribute) =>
          Node.isJsxAttribute(attribute) &&
          attribute.getNameNode().getText() === "container"
      )
    if (!hasContainer) {
      portal.addAttribute({
        name: "container",
        initializer: "{overlayContainer}",
      })
    }
  }

  for (const functionDeclaration of ownerFunctions) {
    const body = functionDeclaration.getBody()
    if (!body) {
      throw new Error(
        `Portal owner has no body in ${sourceFile.getBaseName()}.`
      )
    }
    if (!body.getText().includes("useOverlayContainer()")) {
      body.insertVariableStatement(0, {
        declarationKind: "const",
        declarations: [
          {
            name: "overlayContainer",
            initializer: "useOverlayContainer()",
          },
        ],
      })
    }
  }

  if (
    !sourceFile.getImportDeclaration("@/platform/overlay-container")
  ) {
    sourceFile.addImportDeclaration({
      moduleSpecifier: "@/platform/overlay-container",
      namedImports: ["useOverlayContainer"],
    })
  }
}

function adaptAnchoredPositioners(sourceFile) {
  const positioners = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ].filter((element) =>
    element.getTagNameNode().getText().endsWith("Primitive.Positioner")
  )

  for (const positioner of positioners) {
    const hasPositionMethod = positioner
      .getAttributes()
      .some(
        (attribute) =>
          Node.isJsxAttribute(attribute) &&
          attribute.getNameNode().getText() === "positionMethod"
      )
    if (!hasPositionMethod) {
      positioner.addAttribute({
        name: "positionMethod",
        initializer: '"fixed"',
      })
    }
  }
}

function transformRegistrySource(item, content) {
  const project = new Project({
    useInMemoryFileSystem: true,
    manipulationSettings: {
      indentationText: "  ",
      quoteKind: QuoteKind.Double,
      useTrailingCommas: false,
    },
  })
  const sourceFile = project.createSourceFile(
    `${item}.tsx`,
    content,
    { scriptKind: ScriptKind.TSX }
  )

  adaptAliases(sourceFile)
  replaceIconPlaceholders(sourceFile)
  adaptPortals(sourceFile)
  adaptAnchoredPositioners(sourceFile)
  sourceFile.organizeImports()
  sourceFile.formatText({
    indentSize: 2,
    convertTabsToSpaces: true,
    ensureNewLineAtEndOfFile: true,
  })
  return sourceFile.getFullText()
}

async function loadManifest() {
  return JSON.parse(await readFile(manifestPath, "utf8"))
}

async function generateInto(outputDir) {
  const manifest = await loadManifest()
  const items = Object.keys(manifest.registry).sort()
  await mkdir(outputDir, { recursive: true })

  for (const file of await readdir(outputDir)) {
    if (
      file.endsWith(".tsx") &&
      !items.includes(file.slice(0, -".tsx".length))
    ) {
      await unlink(path.join(outputDir, file))
    }
  }

  for (const item of items) {
    const registryPath = path.join(registryDir, `${item}.json`)
    const rawPayload = await readFile(registryPath)
    const expectedHash = manifest.registry[item]?.sha256
    const actualHash = sha256(rawPayload)
    if (expectedHash !== actualHash) {
      throw new Error(
        `${item} registry payload hash mismatch: expected ${expectedHash}, got ${actualHash}.`
      )
    }

    const payload = JSON.parse(rawPayload.toString("utf8"))
    if (payload.name !== item || payload.files?.length !== 1) {
      throw new Error(`Unexpected vendored registry shape for ${item}.`)
    }
    const content = payload.files[0]?.content
    if (typeof content !== "string") {
      throw new Error(`Vendored registry item ${item} has no source content.`)
    }

    const transformed = transformRegistrySource(item, content)
    await writeFile(path.join(outputDir, `${item}.tsx`), transformed)
  }
}

async function checkGenerated() {
  const manifest = await loadManifest()
  const items = Object.keys(manifest.registry).sort()
  const temporaryRoot = await mkdtemp(
    path.join(os.tmpdir(), "ssui-v2-generated-")
  )
  try {
    await generateInto(temporaryRoot)
    const differences = []
    for (const item of items) {
      const generated = await readFile(
        path.join(temporaryRoot, `${item}.tsx`),
        "utf8"
      )
      let checked
      try {
        checked = await readFile(
          path.join(checkedSourceDir, `${item}.tsx`),
          "utf8"
        )
      } catch {
        differences.push(`${item}.tsx is missing`)
        continue
      }
      if (generated !== checked) {
        differences.push(`${item}.tsx differs from the vendored registry`)
      }
    }
    if (differences.length > 0) {
      throw new Error(
        `Generated shadcn source is stale:\n${differences
          .map((difference) => `- ${difference}`)
          .join("\n")}\nRun pnpm generate.`
      )
    }
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true })
  }
}

const mode = process.argv[2]
if (mode === "--write") {
  await generateInto(checkedSourceDir)
  console.log("Generated shadcn Base UI source from vendored registry payloads.")
} else if (mode === "--check") {
  await checkGenerated()
  console.log("Checked-in shadcn source matches the vendored registry.")
} else {
  throw new Error("Use --write or --check.")
}
