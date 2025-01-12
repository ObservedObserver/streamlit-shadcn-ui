import { forwardRef, useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Streamlit } from "streamlit-component-lib";
import { getPositionRelativeToTopDocument } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface StDropdownMenuTriggerProps {
  value: string; // The label for the button
}

export const StDropdownMenuTrigger = forwardRef<HTMLButtonElement, StDropdownMenuTriggerProps>(
  (props, ref) => {
    const [openStatus, setOpenStatus] = useState(false);
    useEffect(() => {
        if (ref && typeof ref !== 'function') {
            const pos = getPositionRelativeToTopDocument(ref.current);
            Streamlit.setComponentValue({
                x: pos.left,
                y:
                    pos.top +
                    ref.current.offsetHeight +
                    Number(ref.current.style.marginTop.replace("px", "")),
                open: openStatus,
            });
        }
    }, [openStatus]);

    return (
      <DropdownMenu onOpenChange={setOpenStatus}>
        <DropdownMenuTrigger asChild>
            <Button ref={ref} variant="outline">{props.value}</Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    );
  }
);