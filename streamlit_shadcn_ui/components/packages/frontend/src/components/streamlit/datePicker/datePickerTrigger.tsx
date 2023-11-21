import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
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

export const StDatePickerTrigger = forwardRef<HTMLButtonElement>((props, ref) => {
    const [date, setDate] = useState<Date>();
    const container = useRef(null);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (ref) {
            Streamlit.setFrameHeight(container.current.offsetHeight + 20);
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
        <Popover>
            <PopoverTrigger ref={container} asChild>
                <Button
                    ref={ref}
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                    onClick={() => {
                        setOpen(!open);
                    }}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
        </Popover>
    );
});
