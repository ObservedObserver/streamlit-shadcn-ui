import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import { forwardRef } from "react"
  
interface PanelConfig {
  content: string
  defaultSize: number
}

interface StResizableProps {
  panels: PanelConfig[]
  direction?: string
}

export const StResizable = forwardRef<HTMLDivElement, StResizableProps>(
  (props:StResizableProps, ref) => {
    const { panels,direction } = props
    return (
      <div ref={ref}>
        <ResizablePanelGroup
          direction={direction}
          className="max-w-md rounded-lg border md:min-w-[450px]"
        >
          {panels.map((panel, index) => (
            <>
              <ResizablePanel
                key={`panel-${index}`}
                defaultSize={panel.defaultSize}
              >
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-semibold">{panel.content}</span>
                </div>
              </ResizablePanel>

              {index < panels.length - 1 && (
                <ResizableHandle key={`handle-${index}`} />
              )}
            </>
          ))}
        </ResizablePanelGroup>
      </div>
    )
  }
)