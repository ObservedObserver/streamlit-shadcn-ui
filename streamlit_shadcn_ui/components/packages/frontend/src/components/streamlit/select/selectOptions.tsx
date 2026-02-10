import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger
} from "@/components/ui/select";
import { useBodyStyle } from "@/hooks/useBodyStyle";
import { forwardRef, useEffect, useState } from "react";
import { Streamlit } from "streamlit-component-lib";

interface StSelectOptionsProps {
    options: string[];
    value?: string;
    open?: boolean;
}
export const StSelectOptions = forwardRef<HTMLDivElement, StSelectOptionsProps>((props, ref) => {
    const { options, value, open } = props;
    const [selectedValue, setSelectedValue] = useState<string>(value ?? options?.[0] ?? "");
    // useEffect(() => {
    //     if (ref && typeof ref !== 'function') {
    //         Streamlit.setFrameHeight(ref.current.offsetHeight + 5);
    //     }
    // });

    useBodyStyle("body { background-color: transparent !important; }")

    useEffect(() => {
        if (value !== undefined) {
            setSelectedValue(value);
        }
    }, [value]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const frameElement = window.frameElement;
        const parentWindow = window.parent ?? window;
        const parentDocument = parentWindow.document;

        if (!parentDocument) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            if (frameElement && event.target === frameElement) {
                return;
            }

            const resolvedValue = selectedValue ?? value ?? options?.[0] ?? "";

            Streamlit.setComponentValue({
                value: resolvedValue,
                open: false,
            });
        };

        parentDocument.addEventListener("pointerdown", handlePointerDown, true);

        return () => {
            parentDocument.removeEventListener("pointerdown", handlePointerDown, true);
        };
    }, [open, options, selectedValue, value]);
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
