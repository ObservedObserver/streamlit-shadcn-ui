#!/usr/bin/env bash
set -euo pipefail

task_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
task_frontend="$task_root/streamlit_shadcn_ui/frontend_v2"
task_corepack="$(mktemp -d "${TMPDIR:-/tmp}/ssui-v2-release-corepack.XXXXXX")"

cleanup() {
  if [[ -n "$task_corepack" && -d "$task_corepack" ]]; then
    rm -rf "$task_corepack"
  fi
}
trap cleanup EXIT

if [[ "$(node --version)" != "v22.20.0" ]]; then
  echo "V2 release verification requires Node v22.20.0." >&2
  exit 1
fi

corepack enable --install-directory "$task_corepack"
export PATH="$task_corepack:$PATH"

(
  cd "$task_frontend"
  pnpm install --frozen-lockfile
  pnpm run check
)

python3 "$task_root/scripts/verify_release.py" --require-clean-dist
