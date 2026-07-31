import assert from "node:assert/strict"

import {
  normalizeCompiledShadowCss,
  normalizeShadowCssInput,
} from "./normalize-shadow-css.mjs"

const fixture = `
:root, html { --tw-ring-color: red; }
body .dark .sentinel {
  --tw-shadow: 0 0 #0000;
  animation: spin 1s linear;
  color: var(--tw-ring-color);
  background: var(--shimmer-image);
}
@property --tw-translate-x { syntax: "*"; inherits: false; }
@property --shimmer-image { syntax: "<image>"; inherits: false; }
@keyframes spin { to { transform: rotate(360deg); } }
`

const normalizedInput = normalizeShadowCssInput(fixture)
assert.doesNotMatch(normalizedInput, /(^|[,\s])(:root|html|body)(?=[\s,{.#[:])/)
assert.match(normalizedInput, /:host/)
assert.match(normalizedInput, /\[data-ssui-v2-app-root\]/)

const normalized = normalizeCompiledShadowCss(fixture)
assert.doesNotMatch(normalized, /--tw-/)
assert.match(normalized, /--ssui-v2-1-tw-ring-color/)
assert.match(normalized, /@property --ssui-v2-1-tw-translate-x/)
assert.match(normalized, /@property --ssui-v2-1-shimmer-image/)
assert.match(normalized, /var\(--ssui-v2-1-shimmer-image\)/)
assert.match(normalized, /@keyframes ssui-v2-1-spin/)
assert.match(normalized, /animation: ssui-v2-1-spin/)
assert.equal(normalizeCompiledShadowCss(normalized), normalized)

console.log("Shadow CSS normalization and idempotency checks passed.")
