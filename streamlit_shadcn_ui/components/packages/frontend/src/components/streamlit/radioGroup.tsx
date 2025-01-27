import { forwardRef, useState, useEffect } from "react";
import { Streamlit } from "streamlit-component-lib";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
interface StRadioGroupProps {
    defaultValue?: string | string[];
    options: { label: string; value: string; id: string }[];
    mode?: "single" | "multiple";
}

export const StRadioGroup = forwardRef<HTMLDivElement, StRadioGroupProps>(
    (props: StRadioGroupProps, ref) => {
        const { defaultValue, options, mode } = props;
        const [selectedValue, setSelectedValue] = useState<string | string[]>(
            mode === "single"
              ? (defaultValue as string) || "" 
              : (defaultValue as string[]) || [] 
          );

        useEffect(() => {
            setSelectedValue(defaultValue || '');
        }, [defaultValue]);

        const handleChange = (value: string) => {
            if (mode === "single") {
                setSelectedValue(value); 
                Streamlit.setComponentValue(value); 
            } else {
                setSelectedValue((prevSelected) => {
                    const updatedSelected = (prevSelected as string[]).includes(value)
                        ? (prevSelected as string[]).filter((v) => v !== value)
                        : [...(prevSelected as string[]), value]; 
                    Streamlit.setComponentValue(updatedSelected); 
                    return updatedSelected;
                });
            }
        };

        return (
            <div ref={ref}>
                {
                    mode === "single" && 
                    <RadioGroup defaultValue={defaultValue as string} onValueChange={handleChange} ref={ref}>
                        {options.map(option => (
                            <div key={option.id} className="flex items-center space-x-2 m-1">
                                <RadioGroupItem value={option.value} id={option.id} />
                                <Label htmlFor={option.id}>{option.label}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                }
                {
                    mode === 'multiple' && 
                    <div className="py-1">
                        {options.map((option) => (
                            <div
                                key={option.id}
                                className="flex items-center space-x-2 mx-1 my-3"
                            >
                                <Checkbox
                                    id={option.id}
                                    checked={(selectedValue as string[]).includes(
                                        option.value
                                    )}
                                    onCheckedChange={() => handleChange(option.value)}
                                />
                                <Label htmlFor={option.id}>{option.label}</Label>
                            </div>
                        ))}
                    </div>
                }
                
            </div>
            
        );
    }
);
