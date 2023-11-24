import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useBodyStyle } from "@/hooks/useBodyStyle";
import { forwardRef, useEffect } from "react";
import { Streamlit } from "streamlit-component-lib";

interface StAlertDialogProps {
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
}
export const StAlertDialog = forwardRef<HTMLDivElement, StAlertDialogProps>(
    (props, ref) => {
        const {
            title,
            description,
            confirmLabel = "Confirm",
            cancelLabel = "Cancel",
        } = props;
        useEffect(() => {
            if (ref && typeof ref !== "function") {
                Streamlit.setFrameHeight(ref.current.offsetHeight + 10);
            }
        });
        useBodyStyle(
            "body { background-color: transparent !important; padding-right: 0.5em !important; }"
        );
        const handleAction = (confirm: boolean) => {
            Streamlit.setComponentValue({
                confirm,
                open: false,
            });
        };
        return (
            <AlertDialog open={true}>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">Show Dialog</Button>
                </AlertDialogTrigger>
                <AlertDialogContent ref={ref} className="m-1">
                    <AlertDialogHeader>
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => {
                                handleAction(false);
                            }}
                        >
                            {cancelLabel}
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                handleAction(true);
                            }}
                        >
                            {confirmLabel}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );
    }
);
