import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getPositionRelativeToTopDocument } from "@/lib/utils";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Streamlit } from "streamlit-component-lib";

interface StSelectTriggerProps {
    value?: string;
}
export const StSelectTrigger = forwardRef<
    HTMLButtonElement,
    StSelectTriggerProps
>((props, ref) => {
    const { value } = props;
    const container = useRef(null);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (ref) {
            Streamlit.setFrameHeight(container.current.offsetHeight);
        }
    });
    useEffect(() => {
        if (container.current) {
            const pos = getPositionRelativeToTopDocument(container.current);

            Streamlit.setComponentValue({
                x: pos.left,
                // consider the margin of the container
                y:
                    pos.top +
                    container.current.offsetHeight +
                    container.current.style.marginTop.replace("px", "") * 1,
                open,
            });
        }
    }, [open]);
    return (
        <Select defaultOpen={false}>
            <SelectTrigger
                ref={container}
                onClick={() => {
                    setOpen(!open);
                }}
            >
                <SelectValue ref={ref} placeholder={value} />
            </SelectTrigger>
        </Select>
    );
});
