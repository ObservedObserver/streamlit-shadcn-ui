import { ButtonView } from "./components/button";
import { CheckboxView } from "./components/checkbox";
import { DropdownMenuView } from "./components/dropdown-menu";
import { InputView } from "./components/input";
import { SelectView } from "./components/select";
import type { RendererArgs } from "./types";

export function V2App({
  data,
  parentElement,
  setStateValue,
  setTriggerValue,
}: RendererArgs) {
  switch (data.component) {
    case "select":
      return (
        <SelectView
          data={data}
          portalContainer={parentElement}
          setStateValue={setStateValue}
        />
      );
    case "dropdown_menu":
      return (
        <DropdownMenuView
          data={data}
          portalContainer={parentElement}
          setTriggerValue={setTriggerValue}
        />
      );
    case "input":
      return <InputView data={data} setStateValue={setStateValue} />;
    case "checkbox":
      return <CheckboxView data={data} setStateValue={setStateValue} />;
    case "button":
      return <ButtonView data={data} setTriggerValue={setTriggerValue} />;
    default:
      return (
        <div className="st-v2-error" role="alert">
          Unsupported V2 component.
        </div>
      );
  }
}
