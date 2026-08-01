import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon } from "lucide-react";
import { useEffect, useId, useState } from "react";
import type { CheckboxData, SetStateValue } from "../types";

type CheckboxViewProps = {
  data: CheckboxData;
  setStateValue: SetStateValue;
};

export function CheckboxView({
  data,
  setStateValue,
}: CheckboxViewProps) {
  const checkboxId = useId();
  const [checked, setChecked] = useState(data.value);

  useEffect(() => {
    setChecked(data.value);
  }, [data.value]);

  return (
    <div className="st-v2-checkbox-row" data-testid="v2-checkbox">
      <CheckboxPrimitive.Root
        checked={checked}
        className="st-v2-checkbox"
        disabled={data.disabled}
        id={checkboxId}
        onCheckedChange={(nextChecked) => {
          const normalizedValue = nextChecked === true;
          setChecked(normalizedValue);
          setStateValue("value", normalizedValue);
        }}
      >
        <CheckboxPrimitive.Indicator className="st-v2-checkbox-indicator">
          <CheckIcon aria-hidden="true" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <label className="st-v2-checkbox-label" htmlFor={checkboxId}>
        {data.label}
      </label>
    </div>
  );
}
