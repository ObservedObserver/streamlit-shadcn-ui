import { StAvatar } from "../avatar";
import { StBadges } from "../badge";
import { StButton } from "../button";
import { StCard } from "../card"
import { StCheckbox } from "../checkbox";
import { StInput } from "../input";
import { StLinkButton } from "../linkButton";
import { StSelectTrigger } from "../select";
import { StSlider } from "../slider";
import { StSwitch } from "../switch";
import { StTable } from "../table";
import { StTab } from "../tabs";
import { StTextarea } from "../textarea";

const ComponentCollection = {
    card: StCard,
    button: StButton,
    input: StInput,
    tabs: StTab,
    slider: StSlider,
    textarea: StTextarea,
    table: StTable,
    checkbox: StCheckbox,
    avatar: StAvatar,
    link_button: StLinkButton,
    badges: StBadges,
    switch: StSwitch,
    __select: StSelectTrigger
} as const;

export function getComponent(componentName: string) {
    if (componentName in ComponentCollection) {
        return ComponentCollection[componentName as keyof typeof ComponentCollection];
    }
    
    // Check if the componentName is a valid HTML element
    if (typeof document.createElement(componentName).tagName === 'string') {
        return componentName;
    }
    
    return false;
}