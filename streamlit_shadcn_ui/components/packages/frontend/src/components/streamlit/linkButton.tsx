import { Button, ButtonProps } from "@/components/ui/button";
import { forwardRef, useCallback } from "react";

interface StLinkButtonProps {
    text?: string;
    variant?: ButtonProps['variant'];
    disabled?: boolean;
    url?: string;
    className?: string;
}
export const StLinkButton = forwardRef<HTMLButtonElement, StLinkButtonProps>((props: StLinkButtonProps, ref) => {
    const { text, disabled, variant, url, className } = props;

    const clickHandler = useCallback(() => {
        window.open(url, '_blank');
    }, [url])
    return (
        <Button className={className} variant={variant} ref={ref} disabled={disabled} onClick={clickHandler} title={url}>
            {text}
        </Button>
    );
});
