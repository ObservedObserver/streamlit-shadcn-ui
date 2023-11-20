import { useEffect, useRef } from "react";
import "./App.css";
import {
    ComponentProps,
    Streamlit,
    withStreamlitConnection,
} from "streamlit-component-lib";
import { StButton } from "./components/streamlit/button";
import { StCheckbox } from "./components/streamlit/checkbox";

function App(props: ComponentProps<{comp: string; props: any; [key: string]: any}>) {
    const { args, width, disabled, theme } = props;
    const container = useRef(null);

    useEffect(() => {
        if (container.current) {
            // @ts-ignore
            Streamlit.setFrameHeight(container.current.offsetHeight);
        }
    }, []);

    switch (args.comp) {
        case "button":
            return <StButton ref={container} {...args.props} />;
        case "checkbox":
            return <StCheckbox ref={container} {...args.props} />;
        default:
            return <div ref={container}>Unknown component</div>;
    }
}

const WP = withStreamlitConnection(App);
export default WP;
