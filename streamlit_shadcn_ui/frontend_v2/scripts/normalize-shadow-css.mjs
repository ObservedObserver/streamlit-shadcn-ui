import postcss from "postcss"
import selectorParser from "postcss-selector-parser"
import valueParser from "postcss-value-parser"

const CSS_SCHEMA = "1"
const TAILWIND_PREFIX = `--ssui-v2-${CSS_SCHEMA}-tw-`
const REGISTERED_PROPERTY_PREFIX = `--ssui-v2-${CSS_SCHEMA}-`
const KEYFRAME_PREFIX = `ssui-v2-${CSS_SCHEMA}-`

function parseSelectorNode(selector) {
  const ast = selectorParser().astSync(selector)
  const node = ast.nodes[0]?.nodes[0]
  if (!node) {
    throw new Error(`Unable to parse replacement selector: ${selector}`)
  }
  return node.clone()
}

function normalizeSelectors(root) {
  root.walkRules((rule) => {
    if (!rule.selector) {
      return
    }

    const processor = selectorParser((selectors) => {
      selectors.walkPseudos((pseudo) => {
        if (pseudo.value === ":root") {
          pseudo.replaceWith(parseSelectorNode(":host"))
        }
      })

      selectors.walkTags((tag) => {
        if (tag.value === "html") {
          tag.replaceWith(parseSelectorNode(":host"))
        } else if (tag.value === "body") {
          tag.replaceWith(
            parseSelectorNode("[data-ssui-v2-app-root]")
          )
        }
      })

      selectors.walkClasses((classNode) => {
        if (classNode.value === "dark") {
          classNode.replaceWith(
            parseSelectorNode(':host([data-theme="dark"])')
          )
        }
      })
    })

    rule.selector = processor.processSync(rule.selector)
    rule.selectors = [...new Set(rule.selectors)]
  })
}

function namespaceTailwindProperties(root) {
  const namespaceText = (text) =>
    text.replaceAll("--tw-", TAILWIND_PREFIX)

  root.walkDecls((declaration) => {
    if (declaration.prop.startsWith("--tw-")) {
      declaration.prop = `${TAILWIND_PREFIX}${declaration.prop.slice(5)}`
    }

    const parsed = valueParser(declaration.value)
    parsed.walk((node) => {
      if (node.type === "word" && node.value.includes("--tw-")) {
        node.value = namespaceText(node.value)
      }
    })
    declaration.value = parsed.toString()
  })

  root.walkAtRules((atRule) => {
    if (atRule.name === "property" && atRule.params.startsWith("--tw-")) {
      atRule.params = `${TAILWIND_PREFIX}${atRule.params.slice(5)}`
      return
    }

    if (atRule.params.includes("--tw-")) {
      atRule.params = namespaceText(atRule.params)
    }
  })
}

function namespaceRegisteredProperties(root) {
  const registeredProperties = new Map()

  root.walkAtRules("property", (atRule) => {
    const originalName = atRule.params.trim()
    if (
      !originalName.startsWith("--") ||
      originalName.startsWith(REGISTERED_PROPERTY_PREFIX)
    ) {
      return
    }

    registeredProperties.set(
      originalName,
      `${REGISTERED_PROPERTY_PREFIX}${originalName.slice(2)}`
    )
  })

  if (registeredProperties.size === 0) {
    return
  }

  root.walkDecls((declaration) => {
    if (registeredProperties.has(declaration.prop)) {
      declaration.prop = registeredProperties.get(declaration.prop)
    }

    const parsed = valueParser(declaration.value)
    parsed.walk((node) => {
      if (
        node.type === "word" &&
        registeredProperties.has(node.value)
      ) {
        node.value = registeredProperties.get(node.value)
      }
    })
    declaration.value = parsed.toString()
  })

  root.walkAtRules((atRule) => {
    if (
      atRule.name === "property" &&
      registeredProperties.has(atRule.params.trim())
    ) {
      atRule.params = registeredProperties.get(atRule.params.trim())
      return
    }

    const parsed = valueParser(atRule.params)
    parsed.walk((node) => {
      if (
        node.type === "word" &&
        registeredProperties.has(node.value)
      ) {
        node.value = registeredProperties.get(node.value)
      }
    })
    atRule.params = parsed.toString()
  })
}

function namespaceKeyframes(root) {
  const keyframes = new Map()

  root.walkAtRules((atRule) => {
    if (!atRule.name.endsWith("keyframes")) {
      return
    }

    const originalName = atRule.params.trim()
    if (!originalName || originalName.startsWith(KEYFRAME_PREFIX)) {
      return
    }

    const namespacedName = `${KEYFRAME_PREFIX}${originalName}`
    keyframes.set(originalName, namespacedName)
    atRule.params = namespacedName
  })

  if (keyframes.size === 0) {
    return
  }

  root.walkDecls((declaration) => {
    const parsed = valueParser(declaration.value)
    parsed.walk((node) => {
      if (node.type === "word" && keyframes.has(node.value)) {
        node.value = keyframes.get(node.value)
      }
    })
    declaration.value = parsed.toString()
  })
}

function auditCompiledCss(root) {
  const violations = []

  root.walkAtRules((atRule) => {
    if (atRule.name === "import") {
      violations.push(`@import ${atRule.params}`)
    }
  })

  root.walkRules((rule) => {
    if (!rule.selector) {
      return
    }

    selectorParser((selectors) => {
      selectors.walkPseudos((pseudo) => {
        if (pseudo.value === ":root") {
          violations.push(`unscoped :root in ${rule.selector}`)
        }
      })
      selectors.walkTags((tag) => {
        if (tag.value === "html" || tag.value === "body") {
          violations.push(`document tag ${tag.value} in ${rule.selector}`)
        }
      })
      selectors.walkClasses((classNode) => {
        if (classNode.value === "dark") {
          violations.push(`external .dark in ${rule.selector}`)
        }
      })
      selectors.walkIds((id) => {
        violations.push(`document ID #${id.value} in ${rule.selector}`)
      })
    }).processSync(rule.selector)
  })

  root.walkDecls((declaration) => {
    if (
      declaration.prop.startsWith("--tw-") ||
      declaration.value.includes("--tw-")
    ) {
      violations.push(`unversioned Tailwind property in ${declaration}`)
    }
  })

  root.walkAtRules("property", (atRule) => {
    if (!atRule.params.startsWith(REGISTERED_PROPERTY_PREFIX)) {
      violations.push(`unversioned @property ${atRule.params}`)
    }
  })

  if (violations.length > 0) {
    throw new Error(
      `Shadow CSS audit failed:\n${violations
        .slice(0, 20)
        .map((violation) => `- ${violation}`)
        .join("\n")}`
    )
  }
}

export function normalizeShadowCssInput(css) {
  const root = postcss.parse(css)
  normalizeSelectors(root)
  return root.toString()
}

export function normalizeCompiledShadowCss(css) {
  const root = postcss.parse(css)
  normalizeSelectors(root)
  namespaceTailwindProperties(root)
  namespaceRegisteredProperties(root)
  namespaceKeyframes(root)
  auditCompiledCss(root)
  return root.toString()
}

export function shadowCssInputPlugin() {
  return {
    name: "ssui-v2-shadow-css-input",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/src/platform/shadow.css")) {
        return null
      }
      return {
        code: normalizeShadowCssInput(code),
        map: null,
      }
    },
  }
}

export function shadowCssOutputPlugin() {
  return {
    name: "ssui-v2-shadow-css-output",
    enforce: "post",
    generateBundle(_options, bundle) {
      const cssAssets = Object.entries(bundle).filter(
        ([fileName, output]) =>
          output.type === "asset" && fileName.endsWith(".css")
      )

      if (cssAssets.length !== 1) {
        throw new Error(
          `Expected exactly one compiled CSS asset, found ${cssAssets.length}.`
        )
      }

      const [, asset] = cssAssets[0]
      const rawSource =
        typeof asset.source === "string"
          ? asset.source
          : Buffer.from(asset.source).toString("utf8")
      const normalizedSource = normalizeCompiledShadowCss(rawSource)
      asset.source = normalizedSource
    },
  }
}
