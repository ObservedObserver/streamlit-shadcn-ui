import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { forwardRef, useEffect, useState } from "react";
import { useBodyStyle } from "@/hooks/useBodyStyle";
import { Streamlit } from "streamlit-component-lib";

interface Field {
    id: string;
    label: string;
    defaultValue?: string;
  }
  
interface StDialogProps {
    title?: string;
    description?: string;
    fields?: Field[];
}

export const StDialog = forwardRef<HTMLDivElement, StDialogProps>(
    (props, ref) => {
        const {
            title,
            description,
            fields
        } = props;
        useEffect(() => {
            if (ref && typeof ref !== "function") {
                Streamlit.setFrameHeight(ref.current.offsetHeight + 10);
            }
        });
        useBodyStyle(
            "body { background-color: transparent !important; padding-right: 0.5em !important; }"
        );
        const handleAction = (confirm: boolean) => {
            Streamlit.setComponentValue({
                confirm,
                open: false,
                values: inputs,
            });
        };
        const [inputs, setInputs] = useState(
            () =>
              fields.reduce((acc, field) => {
                acc[field.id] = field.defaultValue || "";
                return acc;
              }, {} as Record<string, string>)
          );
        const handleChange = (id: string, value: string) => {
            setInputs((prev) => ({ ...prev, [id]: value }));
        };
          
        return (
            <Dialog open={true}>
                <DialogTrigger asChild>
                    <Button variant="outline">{title}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]" ref={ref}>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogClose asChild>
                        <Button
                        variant="ghost"
                        className="absolute right-4 top-4 rounded-sm opacity-70 
                                    ring-offset-background transition-opacity 
                                    hover:opacity-100 focus:outline-none 
                                    focus:ring-2 focus:ring-ring focus:ring-offset-2 
                                    disabled:pointer-events-none"
                        onClick={() => {
                            handleAction(true);}}
                        >
                        ✕
                        <span className="sr-only">Close</span>
                        </Button>
                    </DialogClose>
                    <div className="grid gap-4 py-4">
                        {fields.map((field) => (
                        <div
                            key={field.id}
                            className="grid grid-cols-4 items-center gap-4"
                        >
                            <Label htmlFor={field.id} className="text-right">
                            {field.label}
                            </Label>
                            <Input
                            id={field.id}
                            value={inputs[field.id]}
                            onChange={(e) => handleChange(field.id, e.target.value)}
                            className="col-span-3"
                            />
                        </div>
                        ))}
                    </div>
                    <DialogFooter>
                    <Button 
                        type="submit" 
                        onClick={() => {
                            handleAction(true);}}>
                        Save changes
                    </Button>
                    </DialogFooter>
                </DialogContent>
                </Dialog>
        );
    }
);
