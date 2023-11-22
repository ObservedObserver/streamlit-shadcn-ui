import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger
} from "@/components/ui/select";
import { forwardRef, useEffect, useState } from "react";
import { Streamlit } from "streamlit-component-lib";

interface StSelectOptionsProps {
    options: string[];
    value?: string;
}
export const StSelectOptions = forwardRef<HTMLDivElement, StSelectOptionsProps>((props, ref) => {
    const { options, value } = props;
    const [selectedValue, setSelectedValue] = useState<string>(value);
    useEffect(() => {
        if (ref && typeof ref !== 'function') {
            Streamlit.setFrameHeight(ref.current.offsetHeight + 20);
        }
    });

    useEffect(() => {
        window.addEventListener("load", function () {
            const styleElement = document.createElement("style");
            styleElement.textContent =
                "body { background-color: transparent !important; }";
            this.document.head.appendChild(styleElement);
            
        });
    }, []);

    useEffect(() => {
        setSelectedValue(value);
    }, [value]);
    return (
        <Select open={true} onValueChange={newValue => {
            setSelectedValue(newValue);
            Streamlit.setComponentValue({
                value: newValue,
                open: false
            })
        }}>
            <SelectTrigger className="hidden">
                {/* <SelectValue placeholder="Select a fruit" /> */}
            </SelectTrigger>
            <SelectContent ref={ref} 
            >
                <SelectGroup>
                    {
                        options.map((option, index) => {
                            return (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                            )
                        })
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    );
});
