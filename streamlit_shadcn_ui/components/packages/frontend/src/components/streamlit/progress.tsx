"use client"

import { forwardRef, useEffect, useState } from "react";

import { Progress } from "@/components/ui/progress"

interface StProgresProps {
    data: number;
    className?: string;
}

export const StProgress = forwardRef<HTMLDivElement, StProgresProps>(
(props: StProgresProps, ref) => {
    const { data, className } = props;
    const [progress, setProgress] = useState(13)

    useEffect(() => {
        const timer = setTimeout(() => setProgress(data), 500)
        return () => clearTimeout(timer)
    }, [])

    return <Progress value={progress} className={`w-[60%] ${className}`} ref={ref}/>
    }
)