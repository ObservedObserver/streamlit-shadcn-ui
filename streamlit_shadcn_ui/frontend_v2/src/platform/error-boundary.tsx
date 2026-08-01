import {
  Component,
  type ErrorInfo,
  type ReactNode,
} from "react"

type ErrorBoundaryProps = {
  children: ReactNode
  resetKey: string
}

type ErrorBoundaryState = {
  error: Error | null
}

const MAX_DIAGNOSTICS_PER_CODE = 3
const diagnosticCounts = new Map<string, number>()

function reportBoundedError(error: Error, info: ErrorInfo): void {
  const candidate = error.message.split(":")[0]?.slice(0, 64)
  const code =
    candidate && /^SSUI_V2_[A-Z0-9_]+$/.test(candidate)
      ? candidate
      : "SSUI_V2_RENDER_ERROR"
  const count = diagnosticCounts.get(code) ?? 0
  if (count >= MAX_DIAGNOSTICS_PER_CODE) {
    return
  }
  diagnosticCounts.set(code, count + 1)
  console.error("SSUI_V2_RENDER_ERROR", {
    code,
    componentStack: info.componentStack?.slice(0, 2_048),
  })
}

export class ComponentErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  override state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    reportBoundedError(error, info)
  }

  override componentDidUpdate(previousProps: ErrorBoundaryProps): void {
    if (
      previousProps.resetKey !== this.props.resetKey &&
      this.state.error
    ) {
      this.setState({ error: null })
    }
  }

  override render(): ReactNode {
    if (this.state.error) {
      return (
        <div data-ssui-v2-error role="alert">
          Component unavailable (SSUI_V2_RENDER_ERROR).
        </div>
      )
    }
    return this.props.children
  }
}
