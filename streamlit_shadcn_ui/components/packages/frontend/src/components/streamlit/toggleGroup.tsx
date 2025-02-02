import { Bold, Italic, Underline } from "lucide-react"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { forwardRef, useState } from "react"
import { Streamlit } from "streamlit-component-lib";

interface StToggleGroupProps {
  defaultValues?: string[];
}

export const StToggleGroup = forwardRef<HTMLDivElement, StToggleGroupProps>(
  (props: StToggleGroupProps, ref) => {
    const { defaultValues = [] } = props
    const [selectedValues, setSelectedValues] = useState<string[]>(defaultValues)

    const handleValueChange = (newValues: string[]) => {
      setSelectedValues(newValues)
      Streamlit.setComponentValue(newValues)
    }

    return (
      <div ref={ref}>
        <ToggleGroup type="multiple" value={selectedValues} onValueChange={handleValueChange}>
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    )
  }
)