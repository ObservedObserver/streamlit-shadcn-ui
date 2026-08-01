import { useId } from "react"

import type { V2RendererArgs } from "@/app"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRevisionedDraftState } from "@/protocol/reconciliation"
import type { InputOtpEnvelope } from "@/protocol/schema"

type InputOtpViewProps = {
  envelope: InputOtpEnvelope
  setStateValue: V2RendererArgs["setStateValue"]
}

export function InputOtpView({
  envelope,
  setStateValue,
}: InputOtpViewProps) {
  const labelId = useId()
  const { commit, commitDraft, draft, setDraft } =
    useRevisionedDraftState(envelope.state, setStateValue)
  const inputPattern =
    envelope.props.pattern === "digits"
      ? "^[0-9]*$"
      : "^[a-zA-Z0-9]*$"

  return (
    <div
      className="grid min-w-0 gap-1.5 p-px"
      data-ssui-component="input_otp"
      data-testid="ssui-v2-input-otp"
    >
      <span
        className="text-sm font-medium leading-none"
        id={labelId}
      >
        {envelope.props.label}
      </span>
      <InputOTP
        aria-labelledby={labelId}
        disabled={envelope.props.disabled}
        maxLength={envelope.props.maxLength}
        onBlur={commitDraft}
        onChange={setDraft}
        onComplete={(value) => {
          setDraft(value)
          commit(value)
        }}
        pattern={inputPattern}
        value={draft}
      >
        <InputOTPGroup>
          {Array.from(
            { length: envelope.props.maxLength },
            (_, index) => (
              <InputOTPSlot index={index} key={index} />
            )
          )}
        </InputOTPGroup>
      </InputOTP>
    </div>
  )
}
