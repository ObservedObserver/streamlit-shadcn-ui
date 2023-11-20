import { Checkbox } from "@/components/ui/checkbox";
import { forwardRef } from "react";

interface StCheckboxProps {
    label?: string;
    checked?: boolean;
    disabled?: boolean;
    onCheckedChange?: (value: boolean) => void;
}
export const StCheckbox = forwardRef<HTMLDivElement>((props: StCheckboxProps, ref) => {
    const { label, checked, disabled, onCheckedChange } = props;
    return (
        <div className="flex items-center space-x-2" ref={ref}>
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
});

