import {
  type RefObject,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

type ModalOwner = symbol
type ActivationListener = (active: boolean) => void

type Participant = {
  active: boolean
  boundary: () => HTMLElement | null
  listener: ActivationListener
  owner: ModalOwner
}

export type ModalLayerCoordinator = {
  acquire: (
    owner: ModalOwner,
    listener: ActivationListener,
    boundary?: () => HTMLElement | null
  ) => () => void
  ownerCount: () => number
}

type InertSnapshot = {
  element: HTMLElement
  hadAttribute: boolean
  value: string | null
}

type DocumentStyleSnapshot = {
  body: string | null
  html: string | null
}

let interactionTrackerOwners = 0
let lastInteractionElement: HTMLElement | null = null
let lastInteractionTime = 0
let removeInteractionTracker = () => {}

const FOCUS_RETURN_SELECTOR = [
  "a[href]",
  "button",
  "input",
  "select",
  "textarea",
  "[tabindex]",
].join(",")

function focusReturnCandidate(
  element: HTMLElement | null
): HTMLElement | null {
  if (
    !element ||
    !element.isConnected ||
    element.hasAttribute("disabled") ||
    element.closest("[inert]")
  ) {
    return null
  }
  if (
    element.matches(FOCUS_RETURN_SELECTOR) &&
    element.tabIndex >= 0
  ) {
    return element
  }
  const closest = element.closest<HTMLElement>(
    FOCUS_RETURN_SELECTOR
  )
  return closest && closest.tabIndex >= 0 ? closest : null
}

function eventInteractionElement(event: Event): HTMLElement | null {
  for (const target of event.composedPath()) {
    if (target instanceof HTMLElement) {
      return focusReturnCandidate(target)
    }
  }
  return null
}

function acquireInteractionTracker(
  documentNode: Document
): () => void {
  interactionTrackerOwners += 1
  if (interactionTrackerOwners === 1) {
    const recordPointer = (event: PointerEvent) => {
      if (sharedCoordinator().ownerCount() === 0) {
        lastInteractionElement = eventInteractionElement(event)
        lastInteractionTime = Date.now()
      }
    }
    const recordKeyboard = (event: KeyboardEvent) => {
      if (
        sharedCoordinator().ownerCount() === 0 &&
        (event.key === "Enter" || event.key === " ")
      ) {
        lastInteractionElement = eventInteractionElement(event)
        lastInteractionTime = Date.now()
      }
    }
    documentNode.addEventListener("pointerdown", recordPointer, true)
    documentNode.addEventListener("keydown", recordKeyboard, true)
    removeInteractionTracker = () => {
      documentNode.removeEventListener(
        "pointerdown",
        recordPointer,
        true
      )
      documentNode.removeEventListener(
        "keydown",
        recordKeyboard,
        true
      )
    }
  }

  let released = false
  return () => {
    if (released) {
      return
    }
    released = true
    interactionTrackerOwners -= 1
    if (interactionTrackerOwners === 0) {
      removeInteractionTracker()
      removeInteractionTracker = () => {}
      lastInteractionElement = null
      lastInteractionTime = 0
    }
  }
}

function restoreAttribute(
  element: HTMLElement,
  name: string,
  value: string | null
): void {
  if (value === null) {
    element.removeAttribute(name)
  } else {
    element.setAttribute(name, value)
  }
}

function inertOutside(boundary: HTMLElement | null): () => void {
  if (!boundary) {
    return () => {}
  }
  const root = boundary.getRootNode()
  let branch: HTMLElement | null =
    root instanceof ShadowRoot && root.host instanceof HTMLElement
      ? root.host
      : boundary
  const snapshots: InertSnapshot[] = []
  const visited = new Set<HTMLElement>()

  while (branch) {
    const parentElement: HTMLElement | null = branch.parentElement
    if (parentElement) {
      for (const sibling of parentElement.children) {
        if (
          sibling === branch ||
          !(sibling instanceof HTMLElement) ||
          sibling.tagName === "SCRIPT" ||
          sibling.tagName === "STYLE" ||
          visited.has(sibling)
        ) {
          continue
        }
        visited.add(sibling)
        const hadAttribute = sibling.hasAttribute("inert")
        snapshots.push({
          element: sibling,
          hadAttribute,
          value: sibling.getAttribute("inert"),
        })
        if (!hadAttribute) {
          sibling.setAttribute("inert", "")
        }
      }
      if (parentElement === document.body) {
        break
      }
      branch = parentElement
      continue
    }

    const branchRoot = branch.getRootNode()
    branch =
      branchRoot instanceof ShadowRoot &&
      branchRoot.host instanceof HTMLElement
        ? branchRoot.host
        : null
  }

  return () => {
    for (const snapshot of snapshots) {
      if (snapshot.hadAttribute) {
        snapshot.element.setAttribute(
          "inert",
          snapshot.value ?? ""
        )
      } else {
        snapshot.element.removeAttribute("inert")
      }
    }
  }
}

export function createModalLayerCoordinator(): ModalLayerCoordinator {
  const stack: Participant[] = []
  let activeOwner: ModalOwner | undefined
  let documentStyleSnapshot: DocumentStyleSnapshot | null = null
  let restoreGeneration = 0
  let restoreInert = () => {}

  const scheduleDocumentStyleRestore = () => {
    const snapshot = documentStyleSnapshot
    const generation = ++restoreGeneration
    if (!snapshot) {
      return
    }
    setTimeout(() => {
      setTimeout(() => {
        if (
          stack.length !== 0 ||
          generation !== restoreGeneration ||
          documentStyleSnapshot !== snapshot
        ) {
          return
        }
        restoreAttribute(
          document.documentElement,
          "style",
          snapshot.html
        )
        restoreAttribute(document.body, "style", snapshot.body)
        documentStyleSnapshot = null
      }, 0)
    }, 0)
  }

  const synchronize = () => {
    const nextParticipant = stack.at(-1)
    const nextOwner = nextParticipant?.owner
    const ownerChanged = nextOwner !== activeOwner
    if (ownerChanged) {
      restoreInert()
      restoreInert = () => {}
      activeOwner = nextOwner
    }
    for (const participant of stack) {
      const active = participant.owner === nextOwner
      if (participant.active !== active) {
        participant.active = active
        participant.listener(active)
      }
    }
    if (nextParticipant && ownerChanged) {
      restoreInert = inertOutside(nextParticipant.boundary())
    }
  }

  return {
    acquire(owner, listener, boundary = () => null) {
      if (stack.length === 0 && documentStyleSnapshot === null) {
        documentStyleSnapshot = {
          body: document.body.getAttribute("style"),
          html: document.documentElement.getAttribute("style"),
        }
      }
      restoreGeneration += 1
      const existingIndex = stack.findIndex(
        (participant) => participant.owner === owner
      )
      if (existingIndex >= 0) {
        stack.splice(existingIndex, 1)
      }
      stack.push({
        active: false,
        boundary,
        listener,
        owner,
      })
      synchronize()

      let released = false
      return () => {
        if (released) {
          return
        }
        released = true
        const index = stack.findIndex(
          (participant) => participant.owner === owner
        )
        if (index >= 0) {
          stack.splice(index, 1)
          synchronize()
          if (stack.length === 0) {
            scheduleDocumentStyleRestore()
          }
        }
      }
    },
    ownerCount() {
      return stack.length
    },
  }
}

const GLOBAL_COORDINATOR_KEY =
  "__streamlit_shadcn_ui_v2_modal_layer_v1__"

type ModalCoordinatorGlobal = typeof globalThis & {
  [GLOBAL_COORDINATOR_KEY]?: ModalLayerCoordinator
}

function sharedCoordinator(): ModalLayerCoordinator {
  const scope = globalThis as ModalCoordinatorGlobal
  if (!scope[GLOBAL_COORDINATOR_KEY]) {
    Object.defineProperty(scope, GLOBAL_COORDINATOR_KEY, {
      configurable: false,
      enumerable: false,
      value: createModalLayerCoordinator(),
      writable: false,
    })
  }
  return scope[GLOBAL_COORDINATOR_KEY]!
}

export function useExclusiveModalLayer(
  requested: boolean,
  boundary: RefObject<HTMLElement | null>
): boolean {
  const owner = useRef<ModalOwner>(Symbol("ssui-v2-modal-owner"))
  const [active, setActive] = useState(false)

  useLayoutEffect(
    () =>
      acquireInteractionTracker(
        boundary.current?.ownerDocument ?? document
      ),
    [boundary]
  )

  useLayoutEffect(() => {
    if (!requested) {
      setActive(false)
      return
    }
    return sharedCoordinator().acquire(
      owner.current,
      setActive,
      () => boundary.current
    )
  }, [boundary, requested])

  return requested && active
}

export function deepActiveElement(
  documentNode: Document = document
): HTMLElement | null {
  let active: Element | null = documentNode.activeElement
  while (
    active instanceof HTMLElement &&
    active.shadowRoot?.activeElement
  ) {
    active = active.shadowRoot.activeElement
  }
  return active instanceof HTMLElement ? active : null
}

export function preferredReturnFocusElement(): HTMLElement | null {
  const active = focusReturnCandidate(deepActiveElement())
  const activeRoot = active?.getRootNode()
  const activeIsModal =
    activeRoot instanceof ShadowRoot &&
    activeRoot.querySelector(
      "[data-ssui-component='alert-dialog'][data-modal-active='true']"
    ) !== null
  if (active && activeIsModal) {
    return active
  }
  const recentInteraction =
    Date.now() - lastInteractionTime <= 5_000
      ? focusReturnCandidate(lastInteractionElement)
      : null
  return recentInteraction ?? active
}
