import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { forwardRef, useEffect } from "react";
import { Streamlit } from "streamlit-component-lib";
import { useBodyStyle } from "@/hooks/useBodyStyle";

interface StHoverCardContentProps {
    content?: string;
    contentType?: 'text' | 'html';
}

export const StHoverCardContent = forwardRef<HTMLDivElement, StHoverCardContentProps>((props, ref) => {
    const { content, contentType = 'text' } = props;
    useEffect(() => {
        if (ref && typeof ref !== "function") {
            Streamlit.setFrameHeight(ref.current.offsetHeight + 5);
        }
    });

    useBodyStyle("body { background-color: transparent !important; }");
    return (
        <HoverCard open={true}>
            <HoverCardTrigger className="hidden"></HoverCardTrigger>
            <HoverCardContent ref={ref} className="w-80">
                <div className="space-y-1">
                    {
                        contentType === 'html' && <div dangerouslySetInnerHTML={{ __html: content }}></div>
                    }
                    {
                        contentType === 'text' && <p className="text-sm">{content}</p>
                    }
                </div>
            </HoverCardContent>
        </HoverCard>
    );
});
