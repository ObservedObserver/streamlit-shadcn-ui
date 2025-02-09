import { forwardRef, useState, useEffect } from "react";
import { Streamlit } from "streamlit-component-lib";
import { Input } from "@/components/ui/input";
import { useBodyStyle } from "@/hooks/useBodyStyle";

interface StInputProps {
    type?: React.HTMLInputTypeAttribute;
    defaultValue?: string;
    placeholder?: string;
    className?: string;
}

export const StInput = forwardRef<HTMLInputElement, StInputProps>(
    (props: StInputProps, ref) => {
        const { type, defaultValue, placeholder, className, ..._props } = props;
        const [inputValue, setInputValue] = useState<string>(defaultValue || '');

        // Update the state when defaultValue changes
        useEffect(() => {
            setInputValue(defaultValue || '');
        }, [defaultValue]);

        // Handle input change
        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(event.target.value);
            Streamlit.setComponentValue(event.target.value);
        };
        
        useBodyStyle("body { padding-right: 0.5em !important; }")

        return (
            <Input
                className={`m-1 ${className}`}
                ref={ref}
                type={type || 'text'}
                value={inputValue}
                placeholder={placeholder}
                onChange={handleInputChange}
                {..._props}
            />
        );
    }
);
