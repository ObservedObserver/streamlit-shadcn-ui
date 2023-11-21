import { forwardRef } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Streamlit } from "streamlit-component-lib";

interface StTabProps {
    defaultValue?: string;
    options?: string[];
}
export const StTab = forwardRef<HTMLDivElement, StTabProps>(
    (props: StTabProps, ref) => {
        const { options = [], defaultValue } = props;

        return (
            <Tabs
                ref={ref}
                defaultValue={defaultValue}
                className="w-[400px]"
                onValueChange={(v) => {
                    Streamlit.setComponentValue(v);
                }}
            >
                <TabsList>
                    {options.map((option, index) => {
                        return (
                            <TabsTrigger key={option} value={option}>
                                {option}
                            </TabsTrigger>
                        );
                    })}
                </TabsList>
            </Tabs>
        );
    }
);
