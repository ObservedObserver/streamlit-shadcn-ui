import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { forwardRef, useEffect, useState} from "react";
import { useBodyStyle } from "@/hooks/useBodyStyle";
import { Streamlit } from "streamlit-component-lib";

interface StDropdownMenuContentProps {
    label: string;
    items: string[];
}

export const StDropdownMenuContent = forwardRef<HTMLDivElement, StDropdownMenuContentProps>(
(props, ref) => {
    const { label,items } = props;
    const [position, setPosition] = useState(items[0]);
    useEffect(() => {
        if (ref && typeof ref !== "function"&& ref.current) {
            Streamlit.setFrameHeight(ref.current.offsetHeight + 5);
        }
    });
    useBodyStyle("body { background-color: transparent !important; }");
    const handleValueChange = (value: string) => {
        setPosition(value); 
        Streamlit.setComponentValue({ value }); 
    };
    return (
    <DropdownMenu open={true}>
        <DropdownMenuTrigger className="hidden" />
        <DropdownMenuContent ref={ref}>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup 
                value={position} 
                onValueChange={
                    (value)=>handleValueChange(value)}>
                {items.map((item, index) => (
                    <DropdownMenuRadioItem value={item} key={index}>
                        {item}
                    </DropdownMenuRadioItem>
                ))}
            </DropdownMenuRadioGroup>
        </DropdownMenuContent>
    </DropdownMenu>
    );
}
);