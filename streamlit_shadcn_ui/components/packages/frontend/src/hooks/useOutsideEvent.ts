import { useEffect } from "react";

export function useOutsideEvent(
    eventName: keyof DocumentEventMap,
    handler: (event: Event) => void,
    enabled = true
) {
    useEffect(() => {
        if (!enabled) return;
        const parentDoc = (() => {
            try {
                return window.parent.document;
            } catch (e) {
                return null;
            }
        })();

        document.addEventListener(eventName, handler);
        if (parentDoc && parentDoc !== document) {
            parentDoc.addEventListener(eventName, handler);
        }

        return () => {
            document.removeEventListener(eventName, handler);
            if (parentDoc && parentDoc !== document) {
                parentDoc.removeEventListener(eventName, handler);
            }
        };
    }, [eventName, handler, enabled]);
}
