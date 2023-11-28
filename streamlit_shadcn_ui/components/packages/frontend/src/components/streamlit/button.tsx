import { Button, ButtonProps } from "@/components/ui/button";
import { StComponentValue } from "@/interfaces";
import { forwardRef, useCallback, useEffect, useRef } from "react";
import { Streamlit } from "streamlit-component-lib";
import { nanoid } from 'nanoid'


interface StButtonProps {
    text?: string;
    variant?: ButtonProps['variant'];
    disabled?: boolean;
    className?: string;
}

type StButtonValue = StComponentValue<boolean, undefined>;


export const StButton = forwardRef<HTMLButtonElement, StButtonProps>((props: StButtonProps, ref) => {
    const { text, disabled, variant, className } = props;
    
    const queue = useRef<(() => void)[]>([]);

    const clickHandler = useCallback(() => {
        queue.current = [];
        Streamlit.setComponentValue({ value: true, event_id: nanoid() } as StButtonValue);

    }, [])

    return (
        <Button className={className} variant={variant} ref={ref} disabled={disabled} onClick={clickHandler}>
            {text}
        </Button>
    );
});
