import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { forwardRef, useEffect, useState } from "react";
import { Streamlit } from "streamlit-component-lib";

function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

interface StDatePickerContentProps {
    value?: string;
}
export const StDatePickerContent = forwardRef<
    HTMLDivElement,
    StDatePickerContentProps
>((props, ref) => {
    const { value } = props;
    const [date, setDate] = useState<Date>(new Date(value));

    useEffect(() => {
        setDate(new Date(value));
    }, [value]);

    useEffect(() => {
        if (ref && typeof ref !== "function") {
            Streamlit.setFrameHeight(ref.current.offsetHeight + 20);
        }
    });

    return (
        <Popover open={true}>
            <PopoverTrigger className="hidden"></PopoverTrigger>
            <PopoverContent ref={ref} className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
                <div className="mb-4 mx-4 flex gap-2">
                    <Button
                        onClick={() => {
                            Streamlit.setComponentValue({
                                value: formatDate(date),
                                open: false,
                            });
                        }}
                    >
                        Pick
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            Streamlit.setComponentValue({
                                value: value ? formatDate(new Date(value)) : value,
                                open: false,
                            });
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
});
