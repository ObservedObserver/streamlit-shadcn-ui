import type {
  FrontendRenderer,
  FrontendRendererArgs,
} from "@streamlit/component-v2-lib"
import { createRoot, type Root } from "react-dom/client"

import {
  V2App,
  type V2FrontendState,
} from "@/app"
import { ComponentShell } from "@/platform/component-shell"
import {
  applyHostTheme,
  clearHostTheme,
} from "@/platform/theme"
import {
  parseEnvelope,
  type ProtocolFailure,
} from "@/protocol/schema"

import "@/platform/shadow.css"

type RendererArgs = FrontendRendererArgs<
  V2FrontendState,
  unknown
>

type Instance = {
  appRoot: HTMLElement
  overlayRoot: HTMLElement
  reactRoot: Root
}

const instances = new WeakMap<
  HTMLElement | ShadowRoot,
  Instance
>()

function requireRoot(
  parentElement: HTMLElement | ShadowRoot,
  selector: string,
  code: string
): HTMLElement {
  const element = parentElement.querySelector(selector)
  if (!(element instanceof HTMLElement)) {
    throw new Error(`${code}: required component root is missing.`)
  }
  return element
}

function createInstance(
  parentElement: HTMLElement | ShadowRoot,
  frontendKey: string
): Instance {
  const appRoot = requireRoot(
    parentElement,
    "[data-ssui-v2-app-root]",
    "SSUI_V2_APP_ROOT_MISSING"
  )
  const overlayRoot = requireRoot(
    parentElement,
    "[data-ssui-v2-overlay-root]",
    "SSUI_V2_OVERLAY_ROOT_MISSING"
  )
  if (
    appRoot.getRootNode() !== parentElement ||
    overlayRoot.getRootNode() !== parentElement
  ) {
    throw new Error(
      "SSUI_V2_ROOT_OWNERSHIP: component roots escaped parentElement."
    )
  }

  const identifierPrefix = `ssui-${frontendKey.replace(
    /[^a-zA-Z0-9_-]/g,
    "-"
  )}-`
  return {
    appRoot,
    overlayRoot,
    reactRoot: createRoot(appRoot, { identifierPrefix }),
  }
}

function ProtocolErrorView({
  failure,
}: {
  failure: ProtocolFailure
}) {
  return (
    <div data-ssui-v2-error role="alert">
      Component unavailable ({failure.code}; kind=
      {failure.kind}; protocol={failure.protocolVersion}).
    </div>
  )
}

const renderer: FrontendRenderer<
  V2FrontendState,
  unknown
> = (args: RendererArgs) => {
  const { parentElement } = args
  let instance = instances.get(parentElement)
  if (!instance) {
    instance = createInstance(parentElement, args.key)
    instances.set(parentElement, instance)
  }

  applyHostTheme(parentElement)
  const parsed = parseEnvelope(args.data)
  const resetKey = parsed.ok
    ? `${parsed.envelope.kind}:${parsed.envelope.protocolVersion}`
    : `${parsed.failure.code}:${parsed.failure.kind}:${parsed.failure.protocolVersion}`

  instance.reactRoot.render(
    <ComponentShell
      overlayRoot={instance.overlayRoot}
      parentElement={parentElement}
      resetKey={resetKey}
    >
      {parsed.ok ? (
        <V2App
          envelope={parsed.envelope}
          setStateValue={args.setStateValue}
          setTriggerValue={args.setTriggerValue}
        />
      ) : (
        <ProtocolErrorView failure={parsed.failure} />
      )}
    </ComponentShell>
  )

  return () => {
    const mounted = instances.get(parentElement)
    if (!mounted) {
      return
    }
    mounted.reactRoot.unmount()
    mounted.overlayRoot.replaceChildren()
    clearHostTheme(parentElement)
    instances.delete(parentElement)
  }
}

export default renderer
