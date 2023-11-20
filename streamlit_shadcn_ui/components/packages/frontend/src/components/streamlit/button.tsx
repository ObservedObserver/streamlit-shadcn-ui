import { Button } from "@/components/ui/button";
import { forwardRef } from "react";

interface StButtonProps {
    text?: string;
    disabled?: boolean;
    onClick?: () => void;
}
export const StButton = forwardRef<HTMLButtonElement>((props: StButtonProps, ref) => {
    const { text, disabled, onClick } = props;
    return (
        <Button ref={ref} disabled={disabled} onClick={onClick}>
            {text}
        </Button>
    );
});
