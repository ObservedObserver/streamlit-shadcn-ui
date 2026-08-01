import { Input as InputPrimitive } from "@base-ui/react/input";
import { useEffect, useId, useState } from "react";
import type { InputData, SetStateValue } from "../types";

type InputViewProps = {
  data: InputData;
  setStateValue: SetStateValue;
};

export function InputView({ data, setStateValue }: InputViewProps) {
  const inputId = useId();
  const [value, setValue] = useState(data.value);

  useEffect(() => {
    setValue(data.value);
  }, [data.value]);

  return (
    <div className="st-v2-field" data-testid="v2-input">
      <label className="st-v2-label" htmlFor={inputId}>
        {data.label}
      </label>
      <InputPrimitive
        className="st-v2-input"
        disabled={data.disabled}
        id={inputId}
        placeholder={data.placeholder ?? undefined}
        type={data.type ?? "text"}
        value={value}
        onChange={(event) => {
          const nextValue = event.currentTarget.value;
          setValue(nextValue);
          setStateValue("value", nextValue);
        }}
      />
    </div>
  );
}
