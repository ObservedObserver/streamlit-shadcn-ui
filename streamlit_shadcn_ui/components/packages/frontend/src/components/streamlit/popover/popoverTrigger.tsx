import {
    Popover,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Streamlit } from "streamlit-component-lib";
import { getPositionRelativeToTopDocument } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { forwardRef, useEffect, useState} from "react";

interface StPopoverTriggerProps {
    value: string;
}
export const StPopoverTrigger = forwardRef<HTMLButtonElement, StPopoverTriggerProps>(
    (props, ref) => {

    const [openStatus, setOpenStatus] = useState(false);
    useEffect(() => {
        if (ref && typeof ref !== 'function' && ref.current) {
            const pos = getPositionRelativeToTopDocument(ref.current);
            Streamlit.setComponentValue({
                x: pos.left,
                y: pos.top+ref.current.offsetHeight+30,
                open: openStatus,
            });
        }
    }, [openStatus]);
    return (
        <Popover onOpenChange={setOpenStatus}>
            <PopoverTrigger asChild>
                <Button ref={ref}  variant="outline">
                    {props.value}
                </Button>
            </PopoverTrigger>
        </Popover>
    )
});