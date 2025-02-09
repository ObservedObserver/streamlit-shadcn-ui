import { Bold, Italic, Underline } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { forwardRef, useState } from "react"
import { Streamlit } from "streamlit-component-lib";

interface StToggleProps {
  defaultChecked?: boolean;
  icon?: "bold" | "italic" | "underline";
}

export const StToggle = forwardRef<HTMLDivElement, StToggleProps>(
  (props: StToggleProps, ref) => {
    const { defaultChecked, icon = "bold" } = props
    const [pressedStatus, setPressedStatus] = useState(!!defaultChecked)
    const iconsMap = {
      bold: Bold,
      italic: Italic,
      underline: Underline,
    }
    const IconComponent = iconsMap[icon]
    return (
      <div ref={ref}>
        <Toggle
          aria-label="Toggle italic"
          pressed={pressedStatus}
          onPressedChange={(value) => {
            setPressedStatus(value)
            Streamlit.setComponentValue(value)
          }}
        >
          <IconComponent className="h-4 w-4" />
        </Toggle>
      </div>
    )
  }
)