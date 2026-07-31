# ADR-003: V2 packaging and V1 compatibility amendments

Status: **Accepted for Wave 1**

Date: 2026-07-30

## Context

The V2 runtime needs Python 3.10 and Streamlit 1.60, while the released package
declares Python 3.7 and Streamlit 0.63 for V1. Wave 1 must keep V2 opt-in
without silently raising the package-wide floor or invalidating the installed
V1 rollback path.

Actual clean-install and source-build tests exposed three historical issues:

1. `streamlit_extras>=0.3.5` requires Python 3.8 even though the root package
   declared Python 3.7.
2. A bare optional-extra name `v2` trips a marker parsing defect in the stock
   legacy Python 3.7 installer stack.
3. Five Radix dependencies still imported by V1 source had been removed from
   the legacy workspace manifest and lockfile, so a clean frozen V1 build
   failed even though the checked-in release artifact continued to run.

The historical checked-in V1 bundle was also produced from dependency state
that is not byte-reproducible from the current frozen source graph.

## Decision

### Keep the package-wide floor

The root metadata remains:

- `Requires-Python: >=3.7`;
- `streamlit>=0.63`.

V2 is installed with:

```sh
pip install "streamlit-shadcn-ui[components-v2]"
```

The `components-v2` extra adds `streamlit>=1.60`. Importing the top-level V1
namespace never imports V2. Calling V2 on Python below 3.10 or Streamlit below
1.60 fails before component registration with an actionable message.

The extra name is intentionally not `v2`: `components-v2` avoids the verified
legacy installer marker bug while remaining descriptive.

### Repair the Python 3.7 V1 path

`streamlit_extras` is conditional on Python 3.8 or newer. The small V1
`stylable_container` bridge:

- delegates unchanged to `streamlit_extras` on supported runtimes;
- provides the equivalent historical container/CSS behavior on Python 3.7.

V1 Dropdown Menu uses postponed annotation evaluation so `list[str]` in its
legacy source does not fail at import time on Python 3.7. A direct Python 3.7
grammar test covers every packaged Python file.

### Repair, but isolate, the V1 source build

The five dependencies still imported by V1 source are restored at the exact
resolved versions in the legacy Yarn Classic lockfile:

- `@radix-ui/react-accordion` 1.2.2;
- `@radix-ui/react-aspect-ratio` 1.1.1;
- `@radix-ui/react-collapsible` 1.1.2;
- `@radix-ui/react-progress` 1.1.1;
- `@radix-ui/react-scroll-area` 1.2.2.

V1 source verification uses Node 18.18.0 and Yarn Classic in a temporary
workspace, writes output only to a temporary directory, and then rechecks the
historical release bundle. A V2 build never invokes the V1 build.

### Preserve an exact rollback artifact

The package continues to ship the pre-Wave V1 bundle recorded at commit
`63f5120701d06838e47e5c779d55c85c8fd46b2d`. Release verification requires its
exact file set and SHA-256 checksums.

A clean frozen V1 source build now succeeds, but its deterministic JavaScript
asset differs from that historical bundle. This is recorded as legacy
reproducibility debt, not hidden by overwriting the rollback asset:

- install/rollback fidelity is proved against the exact historical bytes;
- current source buildability is proved independently in a temporary output;
- reconciliation of the old unrecorded dependency state is deferred because
  it does not affect Wave 1 runtime behavior.

## Distribution gates

Release verification requires:

- root, nested component manifest, and frontend versions to match;
- one content-hashed V2 JavaScript entry and one content-hashed V2 stylesheet;
- no source maps, TypeScript source, or `node_modules` in archives;
- wheel metadata to retain the V1 floors and expose `components-v2`;
- wheel and sdist V1/V2 assets to byte-match the verified source-tree assets;
- fresh wheel and sdist installs to run V2 without Node;
- a stock Python 3.7 environment to import V1 and render its smoke app without
  a Streamlit exception.

## Consequences

- Existing V1 users do not inherit the V2 runtime floor.
- V2 users must opt in to the new extra and namespace.
- The package has a real, checksum-pinned rollback artifact.
- V1 source is buildable again, but the historical bundle is not claimed to be
  reproducible from dependencies that were never recorded.

