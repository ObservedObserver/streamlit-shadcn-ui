import { forwardRef} from "react";

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface StScrollAreaProps {
    title?: string;
    tags?: string[];
    className?: string;
}

export const StScrollArea = forwardRef<HTMLDivElement, StScrollAreaProps>(
    (props: StScrollAreaProps, ref) => {
    const { title, tags, className } = props
    return (
        <ScrollArea className={`h-72 w-48 rounded-md border ${className}`} ref = {ref}>
        <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">{title}</h4>
            {tags.map((tag) => (
            <>
                <div key={tag} className="text-sm">
                {tag}
                </div>
                <Separator className="my-2" />
            </>
            ))}
        </div>
        </ScrollArea>
    )
    }
)
