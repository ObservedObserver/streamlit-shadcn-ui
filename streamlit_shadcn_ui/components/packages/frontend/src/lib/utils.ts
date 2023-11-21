import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getPositionRelativeToTopDocument(element: Element): { top: number; left: number } {
    let topPosition = 0;
    let leftPosition = 0;
    let currentElement: Element | null = element;

    while (currentElement) {
        const rect = currentElement.getBoundingClientRect();
        topPosition += rect.top;
        leftPosition += rect.left;

        const ownerDocument = currentElement.ownerDocument;
        const defaultView = ownerDocument?.defaultView;

        if (defaultView && defaultView.frameElement instanceof Element) {
            // If the current document is inside an iframe, adjust for the iframe's position
            currentElement = defaultView.frameElement;
        } else {
            // If not, add the scroll offsets and break the loop
            topPosition += window.scrollY;
            leftPosition += window.scrollX;
            break;
        }
    }

    return { top: topPosition, left: leftPosition };
}
