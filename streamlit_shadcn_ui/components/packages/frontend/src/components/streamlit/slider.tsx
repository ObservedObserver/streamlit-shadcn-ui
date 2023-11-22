import { forwardRef, useEffect, useState } from "react";
import { Streamlit } from "streamlit-component-lib";
import { Slider } from "@/components/ui/slider";

interface StSliderProps {
    defaultValue?: number[];
    max?: number;
    min?: number;
    step?: number;
    label?: string;
}

export const StSlider = forwardRef<HTMLDivElement, StSliderProps>(
    (props: StSliderProps, ref) => {
        const { defaultValue, max, min, step, label } = props;
        const [sliderValue, setSliderValue] = useState<number[]>(defaultValue || [0]);

        // Update the state when props change
        useEffect(() => {
            setSliderValue(defaultValue || [0]);
        }, [defaultValue]);

        // Handle slider value change
        const handleSliderChange = (value: number[]) => {
            setSliderValue(value);
            Streamlit.setComponentValue(value);
        };

        return (
            <div ref={ref} className="flex flex-col space-y-2 m-1">
                {label && <label>{label}</label>}
                <Slider
                    value={sliderValue}
                    max={max || 100}
                    min={min || 0}
                    step={step || 1}
                    onValueChange={handleSliderChange}
                    className="w-full"
                />
            </div>
        );
    }
);
