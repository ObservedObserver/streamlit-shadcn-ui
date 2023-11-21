import { useEffect, useRef } from "react";
import "./App.css";
import {
    ComponentProps,
    Streamlit,
    withStreamlitConnection,
} from "streamlit-component-lib";
import { ComponentRouter } from "./componentRouter";

import { StButton } from "./components/streamlit/button";
import { StCheckbox } from "./components/streamlit/checkbox";
import { StPopover } from "./components/streamlit/popover";
import { StSelectOptions } from "./components/streamlit/select";
import { StSelectTrigger } from "./components/streamlit/select";
import { StTab } from "./components/streamlit/tabs";
import { StCard } from "./components/streamlit/card";
import { StAvatar } from "./components/streamlit/avatar";
import { StDatePickerContent } from "./components/streamlit/datePicker/datePickerContent";
import { StDatePickerTrigger } from "./components/streamlit/datePicker/datePickerTrigger";

const crouter = new ComponentRouter();
crouter.declare("button", StButton);
crouter.declare("checkbox", StCheckbox);
crouter.declare("popover", StPopover);
crouter.declare("select_options", StSelectOptions);
crouter.declare("select_trigger", StSelectTrigger);
crouter.declare("tabs", StTab);
crouter.declare("card", StCard);
crouter.declare("avatar", StAvatar);
crouter.declare("date_picker_content", StDatePickerContent);
crouter.declare("date_picker_trigger", StDatePickerTrigger);

function App(props: ComponentProps<{comp: string; props: any; [key: string]: any}>) {
    const { args, width, disabled, theme } = props;
    const container = useRef(null);

    useEffect(() => {
        if (container.current) {
            // @ts-ignore
            Streamlit.setFrameHeight(container.current.offsetHeight);
        }
    }, []);

    return crouter.render(args.comp, container, args.props);
}

const WP = withStreamlitConnection(App);
export default WP;
