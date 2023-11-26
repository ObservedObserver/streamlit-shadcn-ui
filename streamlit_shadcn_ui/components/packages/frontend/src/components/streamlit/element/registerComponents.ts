
import { StCard } from "../card"

const ComponentCollection = {
    card: StCard
} as const;

export function getComponent (componentName: string) {
    console.log(componentName, ComponentCollection)
    if (componentName in ComponentCollection) {
        return ComponentCollection[componentName]
    }
    return false
}