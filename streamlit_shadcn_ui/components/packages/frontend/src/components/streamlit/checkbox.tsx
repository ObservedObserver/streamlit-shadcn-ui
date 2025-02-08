import { forwardRef, useState, useCallback, useEffect } from "react";
import { Streamlit } from "streamlit-component-lib";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface StCheckboxProps {
    options?: { label: string; id: string; default_checked: boolean }[];
    mode?: "single" | "multiple";
}

export const StCheckbox = forwardRef<HTMLDivElement, StCheckboxProps>(
    (props: StCheckboxProps, ref) => {
        const { options, mode, ..._props } = props;
        console.log("options",options)
        const initialValues =
            options?.reduce((acc, option) => {
                acc[option.id] = option.default_checked;
                return acc;
            }, {} as Record<string, boolean>) || {};
        console.log("initialValues",initialValues)
        const [selectedValues, setSelectedValues] = useState<Record<string, boolean>>(initialValues);

        useEffect(() => {
            Streamlit.setComponentValue(initialValues);
        }, []);

        const handleChange = (id: string) => {
            setSelectedValues((prevSelected) => {
                const updatedSelected = { ...prevSelected, [id]: !prevSelected[id] };
                Streamlit.setComponentValue(updatedSelected);
                return updatedSelected;
            });
        };

        return (
            <div className="flex flex-col space-y-2" ref={ref} {..._props}>
                {options && (
                    <div>
                        {options.map((option) => (
                            <div key={option.id} className="flex items-center space-x-2 py-1">
                                <Checkbox
                                    id={option.id}
                                    checked={selectedValues[option.id]}
                                    onCheckedChange={() => handleChange(option.id)}
                                />
                                <Label htmlFor={option.id}>{option.label}</Label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
);
