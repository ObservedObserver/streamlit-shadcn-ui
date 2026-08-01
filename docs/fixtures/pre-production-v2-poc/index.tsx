import type {
  FrontendRenderer,
  FrontendRendererArgs,
} from "@streamlit/component-v2-lib";
import { createRoot, type Root } from "react-dom/client";
import { V2App } from "./app";
import type { V2Data, V2State } from "./types";
import "./styles.css";

type RendererArgs = FrontendRendererArgs<V2State, V2Data>;

const reactRoots = new WeakMap<RendererArgs["parentElement"], Root>();

const renderer: FrontendRenderer<V2State, V2Data> = (args) => {
  const { parentElement } = args;
  const rootElement = parentElement.querySelector(
    "[data-st-shadcn-v2-root]",
  );

  if (!rootElement) {
    throw new Error("Streamlit Shadcn V2 root element was not found.");
  }

  let reactRoot = reactRoots.get(parentElement);
  if (!reactRoot) {
    reactRoot = createRoot(rootElement);
    reactRoots.set(parentElement, reactRoot);
  }

  reactRoot.render(<V2App {...args} />);

  return () => {
    const mountedRoot = reactRoots.get(parentElement);
    if (mountedRoot) {
      mountedRoot.unmount();
      reactRoots.delete(parentElement);
    }
  };
};

export default renderer;
