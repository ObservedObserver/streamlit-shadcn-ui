import { forwardRef, useState, useEffect } from "react";
import { Streamlit } from "streamlit-component-lib";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface StRadioGroupProps {
    defaultValue?: string;
    options: { label: string; value: string; id: string }[];
}

export const StRadioGroup = forwardRef<HTMLDivElement, StRadioGroupProps>(
    (props: StRadioGroupProps, ref) => {
        const { defaultValue, options } = props;
        const [selectedValue, setSelectedValue] = useState<string>(defaultValue || '');

        // Update the state when defaultValue changes
        useEffect(() => {
            setSelectedValue(defaultValue || '');
        }, [defaultValue]);

        // Handle radio value change
        const handleRadioChange = (value: string) => {
            setSelectedValue(value);
            Streamlit.setComponentValue(value);
        };

        return (
            <RadioGroup defaultValue={defaultValue} onValueChange={handleRadioChange} ref={ref}>
                {options.map(option => (
                    <div key={option.id} className="flex items-center space-x-2 m-1">
                        <RadioGroupItem value={option.value} id={option.id} />
                        <Label htmlFor={option.id}>{option.label}</Label>
                    </div>
                ))}
            </RadioGroup>
        );
    }
);