# Archived pre-production V2 POC

This source is retained only as diagnostic evidence for the failed experiment
described in `docs/v2-migration-poc.md`. It is deliberately outside both Node
workspaces and is never part of the production build, package, imports, or
supported API.

The Wave 6 performance gate may compile this source into a temporary directory
with the current frozen V2 toolchain. That isolated build is used only to
measure the generated shadcn layer against the direct Base UI POC; it never
writes this directory, the production `dist`, or a release archive.

The production Wave 1 implementation lives in
`streamlit_shadcn_ui/frontend_v2`. In particular, do not copy this fixture's
single-root portal architecture or its ad-hoc component styling into that
implementation.
