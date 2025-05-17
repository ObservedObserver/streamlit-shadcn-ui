import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { forwardRef } from "react";

interface AccordionData {
    trigger: string;
    content: string;
}

interface StAccordionProps {
    data: AccordionData[];
    className?: string;
}

export const StAccordion = forwardRef<HTMLDivElement, StAccordionProps>(
(props: StAccordionProps, ref) => {
    const { data, className } = props;

    return (
        <Accordion type="single" collapsible className={`w-full ${className}`} ref={ref}>
            {data.map((item, index) => (
            <AccordionItem key={`item-${index}`} value={`item-${index}`}>
                <AccordionTrigger>{item.trigger}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
            ))}
        </Accordion>
    );
}
);