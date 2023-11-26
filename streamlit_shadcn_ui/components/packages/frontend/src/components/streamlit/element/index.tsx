import { createElement, forwardRef } from "react";
import { getComponent } from "./registerComponents";

interface ElementRendererProps {
    tree: IElementTree;
}
interface IElementTree {
    name: string;
    props: any;
    children?: (IElementTree | string)[];
}

function dfsRender (tree: IElementTree | string) {
    if (typeof tree === "string") {
        return tree;
    }
    const children = tree.children?.map(child => typeof child === "string" ? child : dfsRender(child)) ?? [];
    const ele = getComponent(tree.name) || tree.name
    console.log('ele', ele)
    return createElement(ele, tree.props, ...children)
}
export const ElementRenderer = forwardRef<HTMLDivElement, ElementRendererProps>((props, ref) => {
    const { tree } = props;
    return <div ref={ref}>
        <div className="bg-red-500"></div>
        {dfsRender(tree)}
    </div>
})