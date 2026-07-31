import { Select as SelectPrimitive } from "@base-ui/react/select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type {
  PortalContainer,
  SelectData,
  SetStateValue,
} from "../types";

type SelectViewProps = {
  data: SelectData;
  portalContainer: PortalContainer;
  setStateValue: SetStateValue;
};

export function SelectView({
  data,
  portalContainer,
  setStateValue,
}: SelectViewProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>(
    data.value,
  );

  useEffect(() => {
    setSelectedValue(data.value);
  }, [data.value]);

  const isDisabled = Boolean(data.disabled || data.options.length === 0);

  return (
    <div className="st-v2-field" data-testid="v2-select">
      <SelectPrimitive.Root
        disabled={isDisabled}
        items={data.options}
        modal={false}
        value={selectedValue}
        onValueChange={(nextValue) => {
          const normalizedValue =
            typeof nextValue === "string" ? nextValue : null;
          setSelectedValue(normalizedValue);
          setStateValue("value", normalizedValue);
        }}
      >
        <SelectPrimitive.Label className="st-v2-label">
          {data.label}
        </SelectPrimitive.Label>
        <SelectPrimitive.Trigger
          aria-label={data.label}
          className="st-v2-trigger"
        >
          <SelectPrimitive.Value
            className="st-v2-trigger-value"
            placeholder={
              data.options.length === 0 ? "No options" : data.placeholder
            }
          />
          <SelectPrimitive.Icon className="st-v2-trigger-icon">
            <ChevronDownIcon aria-hidden="true" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal container={portalContainer}>
          <SelectPrimitive.Positioner
            align="start"
            alignItemWithTrigger={false}
            className="st-v2-positioner"
            side="bottom"
            sideOffset={4}
          >
            <SelectPrimitive.Popup className="st-v2-popup st-v2-select-popup">
              <SelectPrimitive.ScrollUpArrow className="st-v2-scroll-arrow">
                <ChevronUpIcon aria-hidden="true" />
              </SelectPrimitive.ScrollUpArrow>
              <SelectPrimitive.List className="st-v2-list">
                {data.options.map((option) => (
                  <SelectPrimitive.Item
                    className="st-v2-item"
                    disabled={option.disabled}
                    key={option.value}
                    value={option.value}
                  >
                    <SelectPrimitive.ItemText className="st-v2-item-text">
                      {option.label}
                    </SelectPrimitive.ItemText>
                    <SelectPrimitive.ItemIndicator className="st-v2-item-indicator">
                      <CheckIcon aria-hidden="true" />
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.List>
              <SelectPrimitive.ScrollDownArrow className="st-v2-scroll-arrow">
                <ChevronDownIcon aria-hidden="true" />
              </SelectPrimitive.ScrollDownArrow>
            </SelectPrimitive.Popup>
          </SelectPrimitive.Positioner>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  );
}
