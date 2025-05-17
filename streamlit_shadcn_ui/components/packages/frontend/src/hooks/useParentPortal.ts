import { useEffect, useState } from "react";

export function useParentPortal(): HTMLElement | null {
    const [container, setContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const parentDoc = window.parent?.document;
        if (!parentDoc) return;
        const el = parentDoc.createElement("div");
        parentDoc.body.appendChild(el);
        setContainer(el);
        return () => {
            parentDoc.body.removeChild(el);
        };
    }, []);

    return container;
}

