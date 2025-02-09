import { createElement, forwardRef } from "react";
import { getComponent } from "./registerComponents";

interface ElementRendererProps {
    tree: IElementTree;
}
export interface IElementTree {
    name: string;
    props: any;
    children?: (IElementTree | string)[];
}

function dfsRender(tree: IElementTree | string) {
    console.log("tree", tree)
    if (typeof tree === "string") {
        console.log("string", tree)
        return tree;
    }
    const children = tree.children?.map(child => typeof child === "string" ? child : dfsRender(child)) ?? [];
    const ele = getComponent(tree.name);
    console.log(tree.name, ele)
    if (ele === false) {
        // If getComponent returns false, treat it as an unknown element
        console.warn(`Unknown element: ${tree.name}`);
        return null;
    }
    return createElement(ele as React.ComponentType<any>, tree.props, ...children);
}

export const ElementRenderer = forwardRef<HTMLDivElement, ElementRendererProps>((props, ref) => {
    const { tree } = props;
    return <div ref={ref}>
        {dfsRender(tree)}
    </div>
});