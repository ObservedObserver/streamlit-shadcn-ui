import {
    Select,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getPositionRelativeToTopDocument } from "@/lib/utils";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Streamlit } from "streamlit-component-lib";

interface StSelectTriggerProps {
    value?: string;
    open: boolean;
}
export const StSelectTrigger = forwardRef<
    HTMLButtonElement,
    StSelectTriggerProps
>((props, ref) => {
    const { value, open } = props;
    const container = useRef(null);
    const [openStatus, setOpenStatus] = useState(open);
    useEffect(() => {
        if (ref) {
            Streamlit.setFrameHeight(container.current.offsetHeight);
        }
    });
    useEffect(() => {
        setOpenStatus(open);
    }, [open]);
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
                open: openStatus,
            });
        }
    }, [openStatus]);
    return (
        <Select defaultOpen={false}>
            <SelectTrigger
                ref={container}
                onClick={() => {
                    setOpenStatus(v => !v);
                }}
            >
                <SelectValue ref={ref} placeholder={value} />
            </SelectTrigger>
        </Select>
    );
});
