import { forwardRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface StSkeletonProps {
    className?: string; 
}

export const StSkeleton = forwardRef<HTMLDivElement, StSkeletonProps>(
    (props: StSkeletonProps, ref) => {
        const { className, ..._props } = props;
        return (
            <Skeleton
                className={`m-1 ${className}`}
                {..._props}
            />
        );
    }
);
