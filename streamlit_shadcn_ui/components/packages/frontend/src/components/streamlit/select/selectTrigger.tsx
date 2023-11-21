import {
    Select,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Streamlit } from "streamlit-component-lib";

function getPositionRelativeToTopDocument(element) {
    let topPosition = 0;
    let leftPosition = 0;
    let currentElement = element;

    while (currentElement) {
        let rect = currentElement.getBoundingClientRect();
        topPosition += rect.top;
        leftPosition += rect.left;

        if (currentElement.ownerDocument.defaultView.frameElement) {
            // If the current document is inside an iframe, adjust for the iframe's position
            currentElement =
                currentElement.ownerDocument.defaultView.frameElement;
        } else {
            // If not, add the scroll offsets and break the loop
            topPosition += window.scrollY;
            leftPosition += window.scrollX;
            break;
        }
    }

    return { top: topPosition, left: leftPosition };
}

interface StSelectTriggerProps {}
export const StSelectTrigger = forwardRef<HTMLButtonElement, StSelectTriggerProps>((props, ref) => {
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

    console.log("open", open);
    return (
        <Select
            defaultOpen={false}
        >
            <SelectTrigger
                ref={container}
                onClick={() => {
                    setOpen(!open);
                }}
            >
                <SelectValue ref={ref} placeholder="Select a fruit" />
            </SelectTrigger>
        </Select>
    );
});
