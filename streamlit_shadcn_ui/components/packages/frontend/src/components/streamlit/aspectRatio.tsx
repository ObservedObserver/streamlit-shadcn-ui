import { forwardRef } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface StAspectRatioProps {
  src: string;
  alt: string;
  ratio: number;
  className?: string;
}

export const StAspectRatio = forwardRef<HTMLDivElement, StAspectRatioProps>(
  (props: StAspectRatioProps, ref) => {
    const { src, alt, ratio, className } = props;
    return (
      <AspectRatio ratio={ratio} className={`bg-muted ${className}`} ref={ref}>
        <img
          src={src}
          alt={alt}
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    );
  }
);