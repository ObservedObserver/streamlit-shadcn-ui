import { useEffect } from "react";
// "body { padding-right: 0.5em !important; }"
export function useBodyStyle(customStyle: string) {
    useEffect(() => {
        const styleElement = document.createElement("style");
        styleElement.textContent = customStyle;
        document.head.appendChild(styleElement);

        return () => {
            // Remove the style element when the component unmounts
            document.head.removeChild(styleElement);
        };
    }, [customStyle]);
}
