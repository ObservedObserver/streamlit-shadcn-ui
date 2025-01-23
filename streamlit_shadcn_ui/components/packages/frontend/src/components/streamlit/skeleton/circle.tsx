import { forwardRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface StSeletonCircleProps {
    className?: string; 
}

export const StSeletonCircle = forwardRef<HTMLDivElement, StSeletonCircleProps>(
    (props: StSeletonCircleProps, ref) => {
        const { className, ..._props } = props;
        return (
            <Skeleton className={`rounded-full h-12 w-12 ${className}`} />
            
        );
    }
);
