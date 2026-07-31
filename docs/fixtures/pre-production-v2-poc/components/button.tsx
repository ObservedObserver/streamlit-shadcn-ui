import { Button as ButtonPrimitive } from "@base-ui/react/button";
import type { ButtonData, SetTriggerValue } from "../types";

type ButtonViewProps = {
  data: ButtonData;
  setTriggerValue: SetTriggerValue;
};

export function ButtonView({
  data,
  setTriggerValue,
}: ButtonViewProps) {
  return (
    <div className="st-v2-inline-root" data-testid="v2-button">
      <ButtonPrimitive
        className="st-v2-button"
        data-variant={data.variant ?? "default"}
        disabled={data.disabled}
        onClick={() => {
          setTriggerValue("click", true);
        }}
      >
        {data.text}
      </ButtonPrimitive>
    </div>
  );
}
