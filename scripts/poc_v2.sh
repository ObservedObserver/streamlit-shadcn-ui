#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRONTEND_DIR="$ROOT_DIR/streamlit_shadcn_ui/frontend_v2"
COREPACK_SHIM_DIR="$(mktemp -d "${TMPDIR:-/tmp}/ssui-v2-corepack.XXXXXX")"

cleanup() {
  if [[ -n "$COREPACK_SHIM_DIR" && -d "$COREPACK_SHIM_DIR" ]]; then
    rm -rf "$COREPACK_SHIM_DIR"
  fi
}
trap cleanup EXIT

if [[ "$(node --version)" != "v22.20.0" ]]; then
  echo "Wave 1 requires Node v22.20.0 (see frontend_v2/.node-version)." >&2
  exit 1
fi

corepack enable --install-directory "$COREPACK_SHIM_DIR"
export PATH="$COREPACK_SHIM_DIR:$PATH"

(cd "$FRONTEND_DIR" && pnpm install --frozen-lockfile)
(cd "$FRONTEND_DIR" && pnpm build)
streamlit run "$ROOT_DIR/V2_POC.py" "$@"
