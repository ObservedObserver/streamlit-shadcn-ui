import { Button, ButtonProps } from "@/components/ui/button";
import { forwardRef, useCallback, useEffect, useRef } from "react";
import { Streamlit } from "streamlit-component-lib";

interface StButtonProps {
    text?: string;
    variant?: ButtonProps['variant'];
    disabled?: boolean;
    className?: string;
}
export const StButton = forwardRef<HTMLButtonElement, StButtonProps>((props: StButtonProps, ref) => {
    const { text, disabled, variant, className } = props;
    
    const queue = useRef<(() => void)[]>([]);

    const clickHandler = useCallback(() => {
        queue.current = [];
        Streamlit.setComponentValue(true);
        queue.current.push(() => {})
        queue.current.push(() => {
            Streamlit.setComponentValue(false);
        })
    }, [])

    useEffect(() => {
        if (queue.current.length > 0) {
            const fn = queue.current.shift();
            fn?.();
        }
    })

    return (
        <Button className={className} variant={variant} ref={ref} disabled={disabled} onClick={clickHandler}>
            {text}
        </Button>
    );
});
