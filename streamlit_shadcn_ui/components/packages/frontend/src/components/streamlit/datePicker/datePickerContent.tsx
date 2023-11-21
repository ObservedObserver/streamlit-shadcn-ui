import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { forwardRef, useEffect } from "react";
import { Streamlit } from "streamlit-component-lib";


export const StDatePickerContent = forwardRef<HTMLDivElement>((props, ref) => {
    const [date, setDate] = React.useState<Date>();

    useEffect(() => {
        if (ref && typeof ref !== 'function') {
            Streamlit.setFrameHeight(ref.current.offsetHeight + 20);
        }
    });

    return (
        <Popover open={true}>
            <PopoverTrigger className="hidden">
                x
            </PopoverTrigger>
            <PopoverContent ref={ref} className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
})
