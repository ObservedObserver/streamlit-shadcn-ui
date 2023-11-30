import { Checkbox } from "@/components/ui/checkbox";
import { forwardRef, useCallback, useState } from "react";
import { Streamlit } from "streamlit-component-lib";

interface StCheckboxProps {
    label?: string;
    defaultChecked?: boolean;
    disabled?: boolean;
}
export const StCheckbox = forwardRef<HTMLDivElement>(
    (props: StCheckboxProps, ref) => {
        const { label, defaultChecked, disabled, ..._props } = props;
        const [checked, setChecked] = useState(defaultChecked ?? false);
        const onCheckedChange = useCallback((checked: boolean) => {
            setChecked(checked);
            Streamlit.setComponentValue(checked);
        }, []);
        return (
            <div className="flex items-center space-x-2" ref={ref} {..._props}>
                <Checkbox
                    checked={checked}
                    disabled={disabled}
                    onCheckedChange={onCheckedChange}
                />
                {label && (
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {label}
                    </label>
                )}
            </div>
        );
    }
);
