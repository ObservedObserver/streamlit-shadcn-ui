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
import { StTable } from "./components/streamlit/table";
import { StSlider } from "./components/streamlit/slider"
import { StRadioGroup } from "./components/streamlit/radioGroup"
import { StTextarea } from "./components/streamlit/textarea";
import { StInput } from "./components/streamlit/input";
import { StSwitch } from "./components/streamlit/switch";
import { StHoverCardContent } from "./components/streamlit/hoverCard/hoverCardContent";
import { StHoverCardTrigger } from "./components/streamlit/hoverCard/hoverCardTrigger";
import { StAlertDialog } from "./components/streamlit/alertDialog";
import { StLinkButton } from "./components/streamlit/linkButton";
import { StBadges } from "./components/streamlit/badge";
import { ElementRenderer } from "./components/streamlit/element";

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
crouter.declare("table", StTable);
crouter.declare("slider", StSlider);
crouter.declare("radio_group", StRadioGroup);
crouter.declare("textarea", StTextarea);
crouter.declare("input", StInput);
crouter.declare("switch", StSwitch);
crouter.declare("hover_card_content", StHoverCardContent);
crouter.declare("hover_card_trigger", StHoverCardTrigger);
crouter.declare("alert_dialog", StAlertDialog);
crouter.declare("link_button", StLinkButton);
crouter.declare("badges", StBadges);
crouter.declare("element_renderer", ElementRenderer);

function App(props: ComponentProps<{comp: string; props: any; [key: string]: any}>) {
    const { args, width, disabled, theme } = props;
    const container = useRef(null);
    if (import.meta.env.DEV) {
        console.log("DEV MODE", args.comp);
    }
    useEffect(() => {
        if (container.current) {
            Streamlit.setFrameHeight(container.current.offsetHeight + 10);
        }
    }, []);

    return crouter.render(args.comp, container, args.props);
}

export const StApp = withStreamlitConnection(App);
