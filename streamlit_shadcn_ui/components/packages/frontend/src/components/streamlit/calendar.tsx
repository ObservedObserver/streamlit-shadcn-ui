"use client"

import { Calendar } from "@/components/ui/calendar"
import { forwardRef, useState, useEffect } from "react";
import { Streamlit } from "streamlit-component-lib";

interface StCalendarProps {
    className?: string;
}

export const StCalendar = forwardRef<HTMLDivElement,StCalendarProps>(
(props: StCalendarProps, ref) => {
    const { className } = props;
    const [date, setDate] = useState<Date | undefined>(new Date())
    useEffect(() => {
        if (date) {
          const formattedDate = date.toISOString().split("T")[0];
          Streamlit.setComponentValue(formattedDate);
        }
      }, [date]);
  

    return (
        <div className={`max-w-xs flex items-center justify-center ${className}`} ref = {ref}>
            <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow"
            />
        </div>
        
    )
    }
)
