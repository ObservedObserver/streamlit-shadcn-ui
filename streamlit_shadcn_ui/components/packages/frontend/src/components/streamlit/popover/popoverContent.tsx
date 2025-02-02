import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { forwardRef, useEffect} from "react";
import { Streamlit } from "streamlit-component-lib";
import { useBodyStyle } from "@/hooks/useBodyStyle";

interface StPopoverContentProps {
   content: string;
}
export const StPopoverContent = forwardRef<HTMLDivElement, StPopoverContentProps>((props, ref) => {
    const { content } = props;
    useEffect(() => {
        if (ref && typeof ref !== "function") {
            Streamlit.setFrameHeight(ref.current.offsetHeight + 5);
        }
    });
    useBodyStyle("body { background-color: transparent !important; }");
    return (
        <Popover open={true}>
            <PopoverTrigger className="hidden" />
            <PopoverContent ref={ref}>{content}</PopoverContent>
        </Popover>
    )
});
