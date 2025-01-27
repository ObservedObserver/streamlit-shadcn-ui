"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"
import { forwardRef} from "react";
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface StCollapsibleProps {
    title?: string;
    fistItem?: string;
    items?: string[];
    className?: string;
}

export const StCollapsible = forwardRef<HTMLDivElement, StCollapsibleProps>(
    (props: StCollapsibleProps, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const { title, fistItem, items, className } = props

    return (
        <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className={`w-[350px] space-y-2 ${className}`}
        ref = {ref}
        >
            <div className="flex items-center justify-between space-x-4 px-4">
                <h4 className="text-sm font-semibold">
                {title}
                </h4>
                <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                </Button>
                </CollapsibleTrigger>
            </div>
            <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                {fistItem}
            </div>
            <CollapsibleContent className="space-y-2">
            {items.map((item, index) => (
                <div
                key={index}
                className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm"
                >
                {item}
                </div>
            ))}
            </CollapsibleContent>
        </Collapsible>
    )
    }
)