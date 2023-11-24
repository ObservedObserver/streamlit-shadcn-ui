import { Badge, BadgeProps } from "@/components/ui/badge";
import { forwardRef } from "react";

interface StBadgesProps {
    badges: { text: string; variant: BadgeProps['variant'] }[];
    className?: string;
}
export const StBadges = forwardRef<HTMLDivElement, StBadgesProps>((props, ref) => {
    const { badges, className } = props;
    return <div className={className}  ref={ref}>
        {
            badges.map((badge, index) => {
                return <Badge key={`${badge}-${index}`} variant={badge.variant}>{badge.text}</Badge>
            })
        }
    </div>
})
