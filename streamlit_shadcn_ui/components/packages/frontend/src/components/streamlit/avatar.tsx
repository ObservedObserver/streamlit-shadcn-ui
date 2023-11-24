import { forwardRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StAvatarProps {
    src?: string;
    fallback?: string;
}
export const StAvatar = forwardRef<HTMLDivElement, StAvatarProps>(
    (props: StAvatarProps, ref) => {
        const { src, fallback } = props;

        return (
            <Avatar ref={ref}>
                <AvatarImage src={src} />
                <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
        );
    }
);
