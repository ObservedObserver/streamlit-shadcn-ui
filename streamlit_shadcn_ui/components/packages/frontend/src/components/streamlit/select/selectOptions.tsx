import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger
} from "@/components/ui/select";
import { useBodyStyle } from "@/hooks/useBodyStyle";
import { useOutsideEvent } from "@/hooks/useOutsideEvent";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Streamlit } from "streamlit-component-lib";

interface StSelectOptionsProps {
    options: string[];
    value?: string;
}
export const StSelectOptions = forwardRef<HTMLDivElement, StSelectOptionsProps>((props, ref) => {
    const { options, value } = props;
    const [selectedValue, setSelectedValue] = useState<string>(value);
    const contentRef = useRef<HTMLDivElement>(null);

    // expose internal ref
    useEffect(() => {
        if (!ref) return;
        if (typeof ref === "function") {
            ref(contentRef.current);
        } else {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = contentRef.current;
        }
    }, [ref]);
    // useEffect(() => {
    //     if (ref && typeof ref !== 'function') {
    //         Streamlit.setFrameHeight(ref.current.offsetHeight + 5);
    //     }
    // });

    useBodyStyle("body { background-color: transparent !important; }")

    useOutsideEvent(
        "mousedown",
        e => {
            const el = contentRef.current;
            if (!el) return;
            if (el.offsetParent === null) {
                return;
            }
            if (!el.contains(e.target as Node)) {
                Streamlit.setComponentValue({
                    value: selectedValue,
                    open: false,
                });
            }
        },
        true
    );

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
            <SelectContent ref={contentRef}
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
