import { forwardRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface StSkeletonProps {
    className?: string; 
}

export const StSkeleton = forwardRef<HTMLDivElement, StSkeletonProps>(
    (props: StSkeletonProps, ref) => {
        const { className, ..._props } = props;
        return (
            <div className={`flex items-center space-x-4 ${className}`} ref={ref} {..._props}>
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
            
        );
    }
);
