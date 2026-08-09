#!/usr/bin/env python3
"""Fail-closed checks for the V2-only 1.x source tree and archives."""

from __future__ import annotations

import argparse
import gzip
import hashlib
import json
import re
import subprocess
import tarfile
import zipfile
from pathlib import Path
from typing import Dict, Iterable, Mapping, Tuple


ROOT = Path(__file__).resolve().parents[1]
PACKAGE_ROOT = ROOT / "streamlit_shadcn_ui"
V2_DIST = PACKAGE_ROOT / "frontend_v2" / "dist"
LEGACY_TRACKED_PREFIXES = (
    "e2e/",
    "local_components/",
    "streamlit_shadcn_ui/components/",
    "streamlit_shadcn_ui/py_components/",
    "streamlit_shadcn_ui/v1/",
)


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
            "Root, component, and frontend versions must match: %r"
            % sorted(versions)
        )
    version = next(iter(versions))
    if re.fullmatch(r"1\.\d+\.\d+", version) is None:
        raise AssertionError(
            "Release version must be a stable 1.x version: %r" % version
        )
    return version


def _verify_no_tracked_legacy_sources() -> None:
    process = subprocess.run(
        ["git", "ls-files"],
        cwd=ROOT,
        capture_output=True,
        check=False,
        text=True,
    )
    if process.returncode != 0:
        raise AssertionError("Unable to inspect tracked source files.")
    legacy = sorted(
        path
        for path in process.stdout.splitlines()
        if (ROOT / path).exists()
        and (
            path.startswith(LEGACY_TRACKED_PREFIXES)
            or path
            in {
                "docs/_Playground.py",
                "scripts/build_frontend.sh",
                "scripts/frontend.sh",
                "scripts/v1_dist_baseline.json",
                "scripts/verify_v1_build.sh",
                "tests/v2/fixtures/v1_smoke.py",
            }
        )
    )
    if legacy:
        raise AssertionError("Tracked V1-only files remain: %r" % legacy)


def _verify_checked_in_dist_is_current() -> None:
    relative_dist = V2_DIST.relative_to(ROOT).as_posix()
    process = subprocess.run(
        [
            "git",
            "status",
            "--porcelain",
            "--untracked-files=all",
            "--",
            relative_dist,
        ],
        cwd=ROOT,
        capture_output=True,
        check=False,
        text=True,
    )
    if process.returncode != 0:
        raise AssertionError("Unable to inspect the checked-in V2 dist.")
    if process.stdout.strip():
        raise AssertionError(
            "The checked-in V2 dist differs from the release build:\n%s"
            % process.stdout.rstrip()
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
        raise AssertionError("V2 dist contains unexpected files: %r" % unexpected)
    if b"sourceMappingURL" in files[entry]:
        raise AssertionError("Production V2 entry references a source map.")
    if b"@import" in files[stylesheet]:
        raise AssertionError("Production V2 CSS must not contain @import.")
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
        raise AssertionError("sdist must contain one top-level directory.")
    prefix = next(iter(roots)) + "/"
    return {
        name[len(prefix) :]: content
        for name, content in files.items()
        if name.startswith(prefix)
    }


def _verify_archive(
    path: Path,
    version: str,
    source_v2: Mapping[str, bytes],
) -> None:
    archive_files = _archive_files(path)
    wheel = path.suffix == ".whl"
    files = archive_files if wheel else _strip_sdist_prefix(archive_files)
    package_prefix = "streamlit_shadcn_ui/"

    archived_v2 = {
        name.split("/frontend_v2/dist/", 1)[1]: content
        for name, content in files.items()
        if name.startswith(package_prefix + "frontend_v2/dist/")
    }
    _verify_v2_files(archived_v2)
    if archived_v2 != source_v2:
        raise AssertionError("%s contains different V2 bytes." % path.name)

    nested_manifest = files.get(package_prefix + "pyproject.toml")
    if nested_manifest is None:
        raise AssertionError("%s omits the component manifest." % path.name)
    nested_text = nested_manifest.decode("utf-8")
    if 'asset_dir = "frontend_v2/dist"' not in nested_text:
        raise AssertionError("%s has the wrong V2 asset_dir." % path.name)
    if 'version = "%s"' % version not in nested_text:
        raise AssertionError("%s has a mismatched component version." % path.name)

    required = {
        package_prefix + "__init__.py",
        package_prefix + "v2/__init__.py",
    }
    missing = sorted(required - set(files))
    if missing:
        raise AssertionError("%s omits public package files %r" % (path.name, missing))

    forbidden = [
        name
        for name in files
        if name.startswith(
            (
                package_prefix + "components/",
                package_prefix + "py_components/",
                package_prefix + "v1/",
            )
        )
        or "/node_modules/" in ("/" + name)
        or name.startswith(package_prefix + "frontend_v2/src/")
        or name.endswith((".ts", ".tsx", ".map"))
    ]
    if forbidden:
        raise AssertionError(
            "%s contains legacy or development files: %r"
            % (path.name, forbidden[:10])
        )

    if wheel:
        metadata_names = [
            name for name in files if name.endswith(".dist-info/METADATA")
        ]
        if len(metadata_names) != 1:
            raise AssertionError("%s has ambiguous wheel metadata." % path.name)
        metadata = files[metadata_names[0]].decode("utf-8")
        lines = set(metadata.splitlines())
        required_lines = {
            "Requires-Python: >=3.10",
            "Requires-Dist: streamlit>=1.60",
        }
        missing_lines = sorted(required_lines - lines)
        if missing_lines:
            raise AssertionError(
                "%s wheel metadata is missing %r" % (path.name, missing_lines)
            )
        if "streamlit_extras" in metadata or "components-v2" in metadata:
            raise AssertionError("%s retains a legacy dependency or extra." % path.name)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("archives", nargs="*", type=Path)
    parser.add_argument("--require-clean-dist", action="store_true")
    args = parser.parse_args()

    version = _verify_versions()
    _verify_no_tracked_legacy_sources()
    if args.require_clean_dist:
        _verify_checked_in_dist_is_current()
    v2_files = _files_under(V2_DIST)
    entry, stylesheet = _verify_v2_files(v2_files)
    for archive in args.archives:
        _verify_archive(archive.resolve(), version, v2_files)

    summary = {
        "architecture": "streamlit-components-v2",
        "archives": [archive.name for archive in args.archives],
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
