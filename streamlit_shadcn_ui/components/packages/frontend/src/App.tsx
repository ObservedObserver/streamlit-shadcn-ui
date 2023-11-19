import { useEffect, useRef, useState } from "react";
import "./App.css";
import {
    ComponentProps,
    Streamlit,
    withStreamlitConnection,
} from "streamlit-component-lib";
import { Button } from "./components/ui/button";

function App(props: ComponentProps<{id: string; props: any; [key: string]: any}>) {
    const { args, width, disabled, theme } = props;
    const container = useRef(null);

    useEffect(() => {
        if (container.current) {
            // @ts-ignore
            Streamlit.setFrameHeight(container.current.offsetHeight);
        }
    }, []);

    return (
        <div ref={container}>
            <Button {...args.props}>{args.text}</Button>
        </div>
    );
}

const WP = withStreamlitConnection(App);
export default WP;
