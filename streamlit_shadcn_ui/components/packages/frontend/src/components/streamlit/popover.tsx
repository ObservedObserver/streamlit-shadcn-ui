import { forwardRef, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Streamlit } from "streamlit-component-lib";

interface StPopoverProps {
    text?: string;
    disabled?: boolean;
    onClick?: () => void;
}
export const StPopover = forwardRef<HTMLDivElement>(
    (props: StPopoverProps, ref) => {
        const { text, disabled, onClick } = props;
        useEffect(() => {
            Streamlit.setFrameHeight();
        })
        return (
            <Popover>
                <PopoverTrigger>Open</PopoverTrigger>
                <div ref={ref}>TTT</div>
                <PopoverContent>
                    Place content for the popover here.
                </PopoverContent>
            </Popover>
        );
    }
);
