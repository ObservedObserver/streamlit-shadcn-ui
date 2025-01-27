import { forwardRef } from "react";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface StCarouselProps {
    content?: string[];
    className?: string;
    length?: number; //
}

export const StCarousel = forwardRef<HTMLDivElement, StCarouselProps>(
    (props: StCarouselProps, ref) => {
    const { content, className, length } = props;
    return (
        <div className={`w-full ml-12 max-w-xs ${className}`} ref={ref}>
            <Carousel >
                <CarouselContent>
                    {Array.from({ length }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    {content[index]}
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
        
    )
    }
);