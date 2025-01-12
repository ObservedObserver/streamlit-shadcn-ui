import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { forwardRef, useEffect} from "react";
import { useBodyStyle } from "@/hooks/useBodyStyle";
import { Streamlit } from "streamlit-component-lib";

interface StDropdownMenuContentProps {
    items: string[];
}

export const StDropdownMenuContent = forwardRef<HTMLDivElement, StDropdownMenuContentProps>(
(props, ref) => {
    const { items } = props;
    
    useEffect(() => {
    if (ref && typeof ref !== "function"&& ref.current) {
        Streamlit.setFrameHeight(ref.current.offsetHeight + 5);
    }
});
    useBodyStyle("body { background-color: transparent !important; }");
    return (
    <DropdownMenu open={true}>
        <DropdownMenuTrigger className="hidden" />

        <DropdownMenuContent ref={ref}>
            {items.map((item, index) => (
                <DropdownMenuItem key={index}>
                {item}
                </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
    );
}
);