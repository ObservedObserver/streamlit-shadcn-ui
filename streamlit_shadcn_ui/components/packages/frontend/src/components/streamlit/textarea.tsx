import { forwardRef, useState, useEffect } from "react";
import { Streamlit } from "streamlit-component-lib";
import { Textarea } from "@/components/ui/textarea";
import { useBodyStyle } from "@/hooks/useBodyStyle";

interface StTextareaProps {
    defaultValue?: string;
    placeholder?: string;
    className?: string;
}

export const StTextarea = forwardRef<HTMLTextAreaElement, StTextareaProps>(
    (props: StTextareaProps, ref) => {
        const { defaultValue, placeholder, className } = props;
        const [textareaValue, setTextareaValue] = useState<string>(defaultValue || '');

        // Update the state when defaultValue changes
        useEffect(() => {
            setTextareaValue(defaultValue || '');
        }, [defaultValue]);

        // Handle textarea value change
        const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setTextareaValue(event.target.value);
            Streamlit.setComponentValue(event.target.value);
        };

        useBodyStyle("body { padding-right: 0.5em !important; }")

        return (
            <Textarea
                className={`m-1 ${className}`}
                ref={ref}
                value={textareaValue}
                placeholder={placeholder}
                onChange={handleTextareaChange}
            />
        );
    }
);
