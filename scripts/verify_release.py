#!/usr/bin/env python3
"""Fail-closed release checks for the Components V2 tree and archives."""

from __future__ import annotations

import argparse
import gzip
import hashlib
import json
import re
import tarfile
import zipfile
from pathlib import Path
from typing import Dict, Iterable, Mapping, Tuple


ROOT = Path(__file__).resolve().parents[1]
PACKAGE_ROOT = ROOT / "streamlit_shadcn_ui"
V1_DIST = PACKAGE_ROOT / "components" / "packages" / "frontend" / "dist"
V2_DIST = PACKAGE_ROOT / "frontend_v2" / "dist"
BASELINE_PATH = ROOT / "scripts" / "v1_dist_baseline.json"


def _sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def _project_version(path: Path) -> str:
    in_project = False
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if line.startswith("[") and line.endswith("]"):
            in_project = line == "[project]"
            continue
        if in_project:
            match = re.fullmatch(r'version\s*=\s*"([^"]+)"', line)
            if match:
                return match.group(1)
    raise AssertionError("No [project].version found in %s" % path)


def _files_under(root: Path) -> Dict[str, bytes]:
    return {
        path.relative_to(root).as_posix(): path.read_bytes()
        for path in sorted(root.rglob("*"))
        if path.is_file()
    }


def _one_matching(
    names: Iterable[str],
    pattern: str,
    description: str,
) -> str:
    matches = sorted(name for name in names if re.fullmatch(pattern, name))
    if len(matches) != 1:
        raise AssertionError(
            "Expected exactly one %s, found %d: %r"
            % (description, len(matches), matches)
        )
    return matches[0]


def _verify_versions() -> str:
    root_version = _project_version(ROOT / "pyproject.toml")
    nested_version = _project_version(PACKAGE_ROOT / "pyproject.toml")
    frontend_version = json.loads(
        (PACKAGE_ROOT / "frontend_v2" / "package.json").read_text(
            encoding="utf-8"
        )
    )["version"]
    versions = {root_version, nested_version, frontend_version}
    if len(versions) != 1:
        raise AssertionError(
            "Root, nested component, and frontend versions differ: %r"
            % sorted(versions)
        )
    return root_version


def _verify_v1_files(files: Mapping[str, bytes]) -> None:
    baseline = json.loads(BASELINE_PATH.read_text(encoding="utf-8"))["files"]
    if set(files) != set(baseline):
        raise AssertionError(
            "V1 dist file set changed: expected %r, found %r"
            % (sorted(baseline), sorted(files))
        )
    mismatches = {
        name: {
            "expected": baseline[name],
            "actual": _sha256(files[name]),
        }
        for name in sorted(files)
        if _sha256(files[name]) != baseline[name]
    }
    if mismatches:
        raise AssertionError(
            "V1 rollback artifact checksum changed: %s"
            % json.dumps(mismatches, sort_keys=True)
        )


def _verify_v2_files(files: Mapping[str, bytes]) -> Tuple[str, str]:
    entry = _one_matching(
        files,
        r"entry-[A-Za-z0-9_-]+\.js",
        "content-hashed V2 JavaScript entry",
    )
    stylesheet = _one_matching(
        files,
        r"style-[A-Za-z0-9_-]+\.css",
        "content-hashed V2 stylesheet",
    )
    unexpected = sorted(set(files) - {entry, stylesheet})
    if unexpected:
        raise AssertionError(
            "Components V2 dist contains unexpected release files: %r"
            % unexpected
        )
    if b"sourceMappingURL" in files[entry]:
        raise AssertionError("Production V2 entry unexpectedly references a source map")
    if b"@import" in files[stylesheet]:
        raise AssertionError("Production V2 CSS must not contain @import")
    return entry, stylesheet


def _archive_files(path: Path) -> Dict[str, bytes]:
    if path.suffix == ".whl":
        with zipfile.ZipFile(path) as archive:
            return {
                name: archive.read(name)
                for name in archive.namelist()
                if not name.endswith("/")
            }
    if path.name.endswith((".tar.gz", ".tgz")):
        with tarfile.open(path, mode="r:gz") as archive:
            files = {}
            for member in archive.getmembers():
                if not member.isfile():
                    continue
                extracted = archive.extractfile(member)
                if extracted is None:
                    raise AssertionError(
                        "Unable to read archive member %s" % member.name
                    )
                files[member.name] = extracted.read()
            return files
    raise AssertionError("Unsupported release archive: %s" % path)


def _strip_sdist_prefix(files: Mapping[str, bytes]) -> Dict[str, bytes]:
    roots = {name.split("/", 1)[0] for name in files}
    if len(roots) != 1:
        raise AssertionError("sdist must contain exactly one top-level directory")
    prefix = next(iter(roots)) + "/"
    return {
        name[len(prefix) :]: content
        for name, content in files.items()
        if name.startswith(prefix)
    }


def _verify_archive(
    path: Path,
    version: str,
    source_v1: Mapping[str, bytes],
    source_v2: Mapping[str, bytes],
) -> None:
    archive_files = _archive_files(path)
    wheel = path.suffix == ".whl"
    files = archive_files if wheel else _strip_sdist_prefix(archive_files)

    package_prefix = "streamlit_shadcn_ui/"
    archived_v1 = {
        name.split("/components/packages/frontend/dist/", 1)[1]: content
        for name, content in files.items()
        if name.startswith(
            package_prefix + "components/packages/frontend/dist/"
        )
    }
    archived_v2 = {
        name.split("/frontend_v2/dist/", 1)[1]: content
        for name, content in files.items()
        if name.startswith(package_prefix + "frontend_v2/dist/")
    }
    _verify_v1_files(archived_v1)
    _verify_v2_files(archived_v2)
    if archived_v1 != source_v1:
        raise AssertionError("%s contains different V1 bytes" % path.name)
    if archived_v2 != source_v2:
        raise AssertionError("%s contains different V2 bytes" % path.name)

    nested_manifest = files.get(package_prefix + "pyproject.toml")
    if nested_manifest is None:
        raise AssertionError("%s omits the nested component manifest" % path.name)
    nested_text = nested_manifest.decode("utf-8")
    if 'asset_dir = "frontend_v2/dist"' not in nested_text:
        raise AssertionError("%s has the wrong V2 asset_dir" % path.name)
    if 'version = "%s"' % version not in nested_text:
        raise AssertionError("%s has a mismatched nested version" % path.name)

    forbidden = [
        name
        for name in files
        if "/node_modules/" in ("/" + name)
        or name.startswith(package_prefix + "frontend_v2/src/")
        or name.endswith((".ts", ".tsx", ".map"))
    ]
    if forbidden:
        raise AssertionError(
            "%s contains development-only frontend files: %r"
            % (path.name, forbidden[:10])
        )

    if wheel:
        metadata_names = [
            name for name in files if name.endswith(".dist-info/METADATA")
        ]
        if len(metadata_names) != 1:
            raise AssertionError("%s has ambiguous wheel metadata" % path.name)
        metadata = files[metadata_names[0]].decode("utf-8")
        required_lines = {
            "Requires-Python: >=3.7",
            "Requires-Dist: streamlit>=0.63",
            (
                'Requires-Dist: streamlit_extras>=0.3.5; '
                'python_version >= "3.8"'
            ),
            (
                'Requires-Dist: streamlit>=1.60; '
                'extra == "components-v2"'
            ),
        }
        missing = sorted(
            line for line in required_lines if line not in metadata.splitlines()
        )
        if missing:
            raise AssertionError(
                "%s wheel metadata is missing %r" % (path.name, missing)
            )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "archives",
        nargs="*",
        type=Path,
        help="Optional wheel and/or sdist paths to inspect.",
    )
    args = parser.parse_args()

    version = _verify_versions()
    v1_files = _files_under(V1_DIST)
    v2_files = _files_under(V2_DIST)
    _verify_v1_files(v1_files)
    entry, stylesheet = _verify_v2_files(v2_files)

    for archive in args.archives:
        _verify_archive(
            archive.resolve(),
            version,
            v1_files,
            v2_files,
        )

    summary = {
        "archives": [archive.name for archive in args.archives],
        "v1Files": {
            name: _sha256(content)
            for name, content in sorted(v1_files.items())
        },
        "v2": {
            "entry": {
                "gzipBytes": len(gzip.compress(v2_files[entry], mtime=0)),
                "name": entry,
                "rawBytes": len(v2_files[entry]),
                "sha256": _sha256(v2_files[entry]),
            },
            "stylesheet": {
                "gzipBytes": len(
                    gzip.compress(v2_files[stylesheet], mtime=0)
                ),
                "name": stylesheet,
                "rawBytes": len(v2_files[stylesheet]),
                "sha256": _sha256(v2_files[stylesheet]),
            },
        },
        "version": version,
    }
    print(json.dumps(summary, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
