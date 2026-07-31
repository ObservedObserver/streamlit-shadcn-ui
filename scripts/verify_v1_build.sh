#!/usr/bin/env bash
set -euo pipefail

task_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
task_source="$task_root/streamlit_shadcn_ui/components"
task_temp="$(mktemp -d "${TMPDIR:-/tmp}/ssui-v1-build.XXXXXX")"
task_workspace="$task_temp/components"
task_output="$task_temp/dist"

cleanup() {
  if [[ -n "$task_temp" && -d "$task_temp" ]]; then
    rm -rf "$task_temp"
  fi
}
trap cleanup EXIT

if [[ "$(node --version)" != "v18.18.0" ]]; then
  echo "V1 source verification requires Node v18.18.0." >&2
  exit 1
fi

if [[ "$(yarn --version)" != 1.* ]]; then
  echo "V1 source verification requires Yarn Classic 1.x." >&2
  exit 1
fi

mkdir -p "$task_workspace"
rsync -a \
  --exclude node_modules \
  --exclude dist \
  "$task_source/" \
  "$task_workspace/"

(
  cd "$task_workspace"
  yarn install --frozen-lockfile --ignore-scripts
  yarn workspace streamlit-component-lib build
  SSUI_V1_OUT_DIR="$task_output" yarn workspace frontend build
)

task_javascript=("$task_output"/assets/*.js)
task_stylesheets=("$task_output"/assets/*.css)

if [[ ! -f "$task_output/index.html" ]]; then
  echo "V1 source build did not emit index.html." >&2
  exit 1
fi
if [[ ${#task_javascript[@]} -ne 1 || ! -f "${task_javascript[0]}" ]]; then
  echo "V1 source build must emit exactly one JavaScript asset." >&2
  exit 1
fi
if [[ ${#task_stylesheets[@]} -ne 1 || ! -f "${task_stylesheets[0]}" ]]; then
  echo "V1 source build must emit exactly one CSS asset." >&2
  exit 1
fi

# The source build is intentionally isolated from the checked-in rollback
# artifact. This final check proves the historical artifact was not touched.
python3 "$task_root/scripts/verify_release.py"

printf 'V1 source build passed without modifying the pinned rollback artifact. JS=%s CSS=%s\n' \
  "$(basename "${task_javascript[0]}")" \
  "$(basename "${task_stylesheets[0]}")"
