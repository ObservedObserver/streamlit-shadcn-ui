import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { ChevronDownIcon } from "lucide-react";
import type {
  DropdownMenuData,
  PortalContainer,
  SetTriggerValue,
} from "../types";

type DropdownMenuViewProps = {
  data: DropdownMenuData;
  portalContainer: PortalContainer;
  setTriggerValue: SetTriggerValue;
};

export function DropdownMenuView({
  data,
  portalContainer,
  setTriggerValue,
}: DropdownMenuViewProps) {
  return (
    <div className="st-v2-inline-root" data-testid="v2-dropdown-menu">
      <MenuPrimitive.Root disabled={data.disabled} modal={false}>
        <MenuPrimitive.Trigger className="st-v2-button st-v2-button--outline">
          {data.label}
          <ChevronDownIcon aria-hidden="true" />
        </MenuPrimitive.Trigger>
        <MenuPrimitive.Portal container={portalContainer}>
          <MenuPrimitive.Positioner
            align="start"
            className="st-v2-positioner"
            side="bottom"
            sideOffset={4}
          >
            <MenuPrimitive.Popup
              aria-label={data.menuLabel ?? data.label}
              className="st-v2-popup st-v2-menu-popup"
            >
              <MenuPrimitive.Group>
                {data.menuLabel ? (
                  <MenuPrimitive.GroupLabel className="st-v2-menu-label">
                    {data.menuLabel}
                  </MenuPrimitive.GroupLabel>
                ) : null}
                {data.items.length > 0 ? (
                  data.items.map((item) => (
                    <MenuPrimitive.Item
                      className="st-v2-menu-item"
                      data-variant={item.variant ?? "default"}
                      disabled={item.disabled}
                      key={item.value}
                      onClick={() => {
                        setTriggerValue("selected", item.value);
                      }}
                    >
                      {item.label}
                    </MenuPrimitive.Item>
                  ))
                ) : (
                  <MenuPrimitive.Item
                    className="st-v2-menu-item"
                    disabled
                  >
                    No actions
                  </MenuPrimitive.Item>
                )}
              </MenuPrimitive.Group>
            </MenuPrimitive.Popup>
          </MenuPrimitive.Positioner>
        </MenuPrimitive.Portal>
      </MenuPrimitive.Root>
    </div>
  );
}
