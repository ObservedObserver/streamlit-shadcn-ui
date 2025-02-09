import { Terminal } from "lucide-react"
import { forwardRef } from "react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface StAlertProps {
    title: string;
    description: string;
    className?: string;
}

export const StAlert = forwardRef<HTMLDivElement,StAlertProps>(
(props: StAlertProps, ref) => {
    const { title, description, className } = props;
    return (
        <Alert className={`${className}`} ref={ref}>
            <Terminal className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                {description}
            </AlertDescription>
        </Alert>
    ) 
    }   
)
