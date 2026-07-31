import { readFile, readdir } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { Node, Project, ScriptKind, SyntaxKind } from "ts-morph"

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
)
const uiDir = path.join(projectRoot, "src", "components", "ui")
const files = (await readdir(uiDir))
  .filter((file) => file.endsWith(".tsx"))
  .sort()

const expected = ["button.tsx", "checkbox.tsx", "dropdown-menu.tsx", "select.tsx"]
if (files.join(",") !== expected.join(",")) {
  throw new Error(
    `Unexpected shadcn source set: ${files.join(", ")}; expected ${expected.join(
      ", "
    )}.`
  )
}

for (const file of files) {
  const source = await readFile(path.join(uiDir, file), "utf8")
  if (source.includes("streamlit") || source.includes("@radix-ui")) {
    throw new Error(`${file} crosses the generated-source boundary.`)
  }
  if (!source.includes("@base-ui/react")) {
    throw new Error(`${file} does not import Base UI.`)
  }

  const project = new Project({ useInMemoryFileSystem: true })
  const sourceFile = project.createSourceFile(file, source, {
    scriptKind: ScriptKind.TSX,
  })
  const portals = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ].filter((element) =>
    element.getTagNameNode().getText().endsWith("Primitive.Portal")
  )

  for (const portal of portals) {
    const hasContainer = portal
      .getAttributes()
      .some(
        (attribute) =>
          Node.isJsxAttribute(attribute) &&
          attribute.getNameNode().getText() === "container"
      )
    if (!hasContainer) {
      throw new Error(`${file} contains a Portal without a container prop.`)
    }
  }

  const positioners = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ].filter((element) =>
    element.getTagNameNode().getText().endsWith("Primitive.Positioner")
  )

  for (const positioner of positioners) {
    const positionMethod = positioner
      .getAttributes()
      .find(
        (attribute) =>
          Node.isJsxAttribute(attribute) &&
          attribute.getNameNode().getText() === "positionMethod"
      )
    if (
      !positionMethod ||
      !Node.isJsxAttribute(positionMethod) ||
      positionMethod.getInitializer()?.getText() !== '"fixed"'
    ) {
      throw new Error(
        `${file} contains a Positioner without positionMethod="fixed".`
      )
    }
  }
}

console.log(
  "Verified generated shadcn source boundary, portal ownership, and fixed positioning."
)
