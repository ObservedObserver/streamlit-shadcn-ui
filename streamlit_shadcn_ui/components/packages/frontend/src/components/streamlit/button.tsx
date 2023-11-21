import { Button, ButtonProps } from "@/components/ui/button";
import { forwardRef } from "react";

interface StButtonProps {
    text?: string;
    variant?: ButtonProps['variant'];
    disabled?: boolean;
    onClick?: () => void;
}
export const StButton = forwardRef<HTMLButtonElement, StButtonProps>((props: StButtonProps, ref) => {
    const { text, disabled, onClick, variant } = props;
    return (
        <Button variant={variant} ref={ref} disabled={disabled} onClick={onClick}>
            {text}
        </Button>
    );
});
