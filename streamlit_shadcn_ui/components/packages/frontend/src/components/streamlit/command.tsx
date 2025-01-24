import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import { forwardRef } from "react";

interface CommandItemProps {
  label: string; 
}

interface StCommandProps {
  className?: string; 
  items: CommandItemProps[]; 
  title: string;
}

export const StCommand = forwardRef<HTMLElement, StCommandProps>(
  (props: StCommandProps, ref) => {
    const { items, title, className } = props;

    return (
      <Command className={`rounded-lg border shadow-md md:min-w-[450px] ${className}`} ref={ref}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading={title}>
            {items.map((item, index) => (
              <CommandItem key={index}>
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    );
  }
);