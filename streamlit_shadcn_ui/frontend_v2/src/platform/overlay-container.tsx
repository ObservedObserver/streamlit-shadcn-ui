import {
  createContext,
  type ReactNode,
  useContext,
  useLayoutEffect,
  useMemo,
} from "react"

export type OverlayContainer = HTMLElement | ShadowRoot

type OverlayContextValue = {
  container: OverlayContainer
  expectedRoot: HTMLElement | ShadowRoot
}

const OverlayContext = createContext<OverlayContextValue | null>(null)

type OverlayContainerProviderProps = {
  children: ReactNode
  container: OverlayContainer
  expectedRoot: HTMLElement | ShadowRoot
}

function isConnected(container: OverlayContainer): boolean {
  return container instanceof ShadowRoot
    ? container.host.isConnected
    : container.isConnected
}

function assertContainer(value: OverlayContextValue): void {
  if (!isConnected(value.container)) {
    throw new Error(
      "SSUI_V2_OVERLAY_DISCONNECTED: the overlay container is not connected."
    )
  }
  if (value.container.getRootNode() !== value.expectedRoot) {
    throw new Error(
      "SSUI_V2_OVERLAY_WRONG_ROOT: the overlay container escaped its component root."
    )
  }
}

function useNamedWebKitFocusGuards(
  expectedRoot: HTMLElement | ShadowRoot
): void {
  useLayoutEffect(() => {
    const nameFocusGuards = () => {
      expectedRoot
        .querySelectorAll<HTMLElement>(
          '[data-base-ui-focus-guard][role="button"]:not([aria-label])'
        )
        .forEach((guard) => {
          guard.setAttribute("aria-label", "Focus boundary")
        })
    }
    const observer = new MutationObserver(nameFocusGuards)
    observer.observe(expectedRoot, {
      attributeFilter: ["role"],
      attributes: true,
      childList: true,
      subtree: true,
    })
    nameFocusGuards()

    return () => {
      observer.disconnect()
    }
  }, [expectedRoot])
}

function useTopLayerOverlay(container: OverlayContainer): void {
  useLayoutEffect(() => {
    if (
      !(container instanceof HTMLElement) ||
      container.getAttribute("popover") !== "manual"
    ) {
      return
    }

    if (
      typeof container.showPopover !== "function" ||
      typeof container.hidePopover !== "function"
    ) {
      throw new Error(
        "SSUI_V2_POPOVER_API_MISSING: anchored overlays require the native Popover API."
      )
    }

    const syncTopLayer = () => {
      const isOpen = container.matches(":popover-open")
      const hasOpenOverlay =
        container.querySelector("[data-open]:not([hidden])") !== null
      if (hasOpenOverlay && !isOpen) {
        container.showPopover()
      } else if (!hasOpenOverlay && isOpen) {
        container.hidePopover()
      }
    }
    const observer = new MutationObserver(syncTopLayer)
    observer.observe(container, {
      attributeFilter: ["data-closed", "data-open", "hidden"],
      attributes: true,
      childList: true,
      subtree: true,
    })
    syncTopLayer()

    return () => {
      observer.disconnect()
      if (container.matches(":popover-open")) {
        container.hidePopover()
      }
    }
  }, [container])
}

export function OverlayContainerProvider({
  children,
  container,
  expectedRoot,
}: OverlayContainerProviderProps) {
  const value = useMemo(
    () => ({ container, expectedRoot }),
    [container, expectedRoot]
  )
  assertContainer(value)
  useNamedWebKitFocusGuards(expectedRoot)
  useTopLayerOverlay(container)

  return (
    <OverlayContext.Provider value={value}>
      {children}
    </OverlayContext.Provider>
  )
}

export function useOverlayContainer(): OverlayContainer {
  const value = useContext(OverlayContext)
  if (!value) {
    throw new Error(
      "SSUI_V2_OVERLAY_PROVIDER_MISSING: generated shadcn overlays require an OverlayContainerProvider."
    )
  }
  assertContainer(value)
  return value.container
}
