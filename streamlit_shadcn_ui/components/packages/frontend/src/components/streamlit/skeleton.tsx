import { forwardRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface StSkeletonProps {
    className?: string; 
}

export const StSkeleton = forwardRef<HTMLDivElement, StSkeletonProps>(
    (props: StSkeletonProps, ref) => {
        const { className, ..._props } = props;
        return (
            <div ref={ref} {..._props}>
                <Skeleton className={`rounded-full ${className}`}/>
            </div>
            
        );
    }
);
