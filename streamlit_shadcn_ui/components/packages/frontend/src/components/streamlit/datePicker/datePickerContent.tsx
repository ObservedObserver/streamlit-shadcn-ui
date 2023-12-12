import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useBodyStyle } from "@/hooks/useBodyStyle";
import { format, parse } from "date-fns";
import { forwardRef, useEffect, useState } from "react";
import { Streamlit } from "streamlit-component-lib";

type DateRange = {
    from: Date;
    to?: Date;
};

function formatDate(date: Date | DateRange | string | string[]): string | [string, string] {
    const formatSingleDate = (date: Date) => {
        return format(date, "yyyy-MM-dd");
    }
    if (date instanceof Date) {
        return formatSingleDate(date);
    } else if (typeof date === "string") {
        const d = parse(date, 'yyyy-MM-dd', new Date());
        return formatSingleDate(d);
    } else if (Array.isArray(date)) {
        return [formatDate(date[0]), formatDate(date[1])] as [string, string];
    } else {
        return [formatDate(date.from), formatDate(date.to)] as [string, string];
    }
}

type StDatePickerContentProps =
    | {
          value?: string;
          mode: "single";
      }
    | {
          value?: [string, string];
          mode: "range";
      };

function initDateValue(props: StDatePickerContentProps): Date | DateRange {
    const { value, mode } = props;
    if (mode === "single") {
        return parse(value, 'yyyy-MM-dd', new Date());
    } else {
        if (!value) {
            return {
                from: new Date(),
            };
        }
        return {
            from: parse(value[0], 'yyyy-MM-dd', new Date()),
            to: parse(value[1], 'yyyy-MM-dd', new Date()),
        };
    }
}

export const StDatePickerContent = forwardRef<
    HTMLDivElement,
    StDatePickerContentProps
>((props, ref) => {
    const { value, mode } = props;
    const [date, setDate] = useState<Date | DateRange>(initDateValue(props));

    useEffect(() => {
        setDate(
            initDateValue({
                value,
                mode,
            } as StDatePickerContentProps)
        );
    }, [value, mode]);

    useBodyStyle("body, document { background-color: transparent !important; }");

    return (
        <Popover open={true}>
            <PopoverTrigger className="hidden"></PopoverTrigger>
            <PopoverContent ref={ref} className="w-auto p-0">
                {
                    mode === 'single' && <Calendar
                        mode="single"
                        selected={date as Date}
                        onSelect={setDate as (date: Date) => void}
                        initialFocus
                    />
                }
                {
                    mode === 'range' && <Calendar
                        mode="range"
                        selected={date as DateRange}
                        onSelect={setDate as (date: DateRange) => void}
                        initialFocus
                    />
                }
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
                                value: value
                                    ? formatDate(value)
                                    : value,
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
