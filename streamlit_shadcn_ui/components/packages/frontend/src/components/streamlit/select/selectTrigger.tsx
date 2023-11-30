import {
    Select,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useBodyStyle } from "@/hooks/useBodyStyle";
import { getPositionRelativeToTopDocument } from "@/lib/utils";
import { forwardRef, useEffect, useState } from "react";
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
    const [openStatus, setOpenStatus] = useState(open);

    useEffect(() => {
        setOpenStatus(open);
    }, [open]);
    useEffect(() => {
        if (ref && typeof ref !== "function") {
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
    useBodyStyle("body { padding-right: 0.5em !important; }")
    return (
        <Select defaultOpen={false}>
            <SelectTrigger
                className="m-1"
                ref={ref}
                onClick={() => {
                    setOpenStatus(v => !v);
                }}
            >
                <SelectValue placeholder={value} />
            </SelectTrigger>
        </Select>
    );
});
