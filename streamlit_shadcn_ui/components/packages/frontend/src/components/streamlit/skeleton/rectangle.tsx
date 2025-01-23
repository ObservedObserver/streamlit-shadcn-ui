import { forwardRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface StSkeletonRectangleProps {
    className?: string; 
}

export const StSkeletonRectangle = forwardRef<HTMLDivElement, StSkeletonRectangleProps>(
    (props: StSkeletonRectangleProps, ref) => {
        const { className, ..._props } = props;
        return (
            <Skeleton className={`${className}`} />
        );
    }
);
