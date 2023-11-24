
import { Button } from "@/components/ui/button";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { forwardRef, useEffect } from "react";
import { useState } from "react";
import { getPositionRelativeToTopDocument } from "@/lib/utils";
import { Streamlit } from "streamlit-component-lib";

interface StHoverCardTriggerProps {
    label: string;
}
export const StHoverCardTrigger = forwardRef<HTMLButtonElement, StHoverCardTriggerProps>((props, ref) => {
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
        <HoverCard onOpenChange={setOpenStatus}>
            <HoverCardTrigger asChild>
                <Button ref={ref} variant="link">{props.label}</Button>
            </HoverCardTrigger>
        </HoverCard>
    );
})
