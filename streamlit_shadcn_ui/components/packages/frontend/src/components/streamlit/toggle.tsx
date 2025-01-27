import { Bold } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { forwardRef, useState } from "react"
import { Streamlit } from "streamlit-component-lib";

interface StToggleProps {
  defaultChecked?: boolean;
}

export const StToggle = forwardRef<HTMLDivElement, StToggleProps>(
  (props: StToggleProps, ref) => {
    const { defaultChecked } = props
    const [pressedStatus, setPressedStatus] = useState(!!defaultChecked)

    return (
      <div ref={ref}>
        <Toggle
          aria-label="Toggle italic"
          pressed={pressedStatus}
          onPressedChange={(value) => {
            console.log("Toggle value:", value)
            setPressedStatus(value)
            Streamlit.setComponentValue(value)
          }}
        >
          <Bold className="h-4 w-4" />
        </Toggle>
      </div>
    )
  }
)