import { useEffect, RefObject } from "react";
import { Streamlit } from "streamlit-component-lib";

export function useAutoHeight(elementRef: RefObject<any>, safeSize = 10) {
    useEffect(() => {
        if (!elementRef.current) return;
        const resizeObserver = new ResizeObserver(() => {
            Streamlit.setFrameHeight((elementRef.current.offsetHeight ?? 0) + safeSize)
            // Do what you want to do when the size of the element changes
        });
        resizeObserver.observe(elementRef.current);
        return () => resizeObserver.disconnect();
    }, [safeSize]);
}
