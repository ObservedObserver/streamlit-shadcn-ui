import { Separator } from "@/components/ui/separator";
import { forwardRef } from "react";

interface StSeparatorProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export const StSeparator = forwardRef<HTMLDivElement, StSeparatorProps>(
  (props, ref) => {
    const { className, orientation } = props;
    return (
        <div className={className}>
            <Separator orientation={orientation} />
        </div>
        
    );
  }
);
