import { CSPProvider } from "@base-ui/react/csp-provider"
import type { ReactNode } from "react"

import { ComponentErrorBoundary } from "@/platform/error-boundary"
import { OverlayContainerProvider } from "@/platform/overlay-container"

type ComponentShellProps = {
  children: ReactNode
  overlayRoot: HTMLElement
  parentElement: HTMLElement | ShadowRoot
  resetKey: string
}

export function ComponentShell({
  children,
  overlayRoot,
  parentElement,
  resetKey,
}: ComponentShellProps) {
  return (
    <ComponentErrorBoundary resetKey={resetKey}>
      <CSPProvider disableStyleElements>
        <OverlayContainerProvider
          container={overlayRoot}
          expectedRoot={parentElement}
        >
          {children}
        </OverlayContainerProvider>
      </CSPProvider>
    </ComponentErrorBoundary>
  )
}
