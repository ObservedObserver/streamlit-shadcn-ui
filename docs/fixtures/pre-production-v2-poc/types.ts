import type { FrontendRendererArgs } from "@streamlit/component-v2-lib";

export type V2State = {
  click?: boolean;
  selected?: string;
  value?: boolean | string | null;
};

export type Option = {
  disabled?: boolean;
  label: string;
  value: string;
};

export type SelectData = {
  component: "select";
  disabled?: boolean;
  label: string;
  options: Option[];
  placeholder?: string;
  value: string | null;
};

export type DropdownMenuData = {
  component: "dropdown_menu";
  disabled?: boolean;
  items: Array<
    Option & {
      variant?: "default" | "destructive";
    }
  >;
  label: string;
  menuLabel?: string | null;
};

export type InputData = {
  component: "input";
  disabled?: boolean;
  label: string;
  placeholder?: string | null;
  type?: string;
  value: string;
};

export type CheckboxData = {
  component: "checkbox";
  disabled?: boolean;
  label: string;
  value: boolean;
};

export type ButtonData = {
  component: "button";
  disabled?: boolean;
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
};

export type V2Data =
  | ButtonData
  | CheckboxData
  | DropdownMenuData
  | InputData
  | SelectData;

export type RendererArgs = FrontendRendererArgs<V2State, V2Data>;
export type PortalContainer = RendererArgs["parentElement"];
export type SetStateValue = RendererArgs["setStateValue"];
export type SetTriggerValue = RendererArgs["setTriggerValue"];
