import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger
} from "@/components/ui/select";
import { forwardRef, useEffect } from "react";
import { Streamlit } from "streamlit-component-lib";

interface StSelectOptionsProps {
    options: string[];
}
export const StSelectOptions = forwardRef<HTMLDivElement, StSelectOptionsProps>((props, ref) => {
    const { options } = props;
    useEffect(() => {
        if (ref && typeof ref !== 'function') {
            Streamlit.setFrameHeight(ref.current.offsetHeight + 20);
        }
    });

    useEffect(() => {
        window.addEventListener("load", function () {
            var styleElement = document.createElement("style");
            styleElement.textContent =
                "body { background-color: transparent !important; }";
            this.document.head.appendChild(styleElement);
            
        });
    }, []);
    return (
        <Select open={true} onValueChange={value => {
            Streamlit.setComponentValue(value)
        }}>
            <SelectTrigger className="hidden">
                {/* <SelectValue placeholder="Select a fruit" /> */}
            </SelectTrigger>
            <SelectContent ref={ref}>
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
