'use client'
import { Label } from "@radix-ui/react-label";
import { Input } from "../input";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";
import { Button } from "../button";
import { Clock } from "lucide-react";
import PunchClockButton from "../buttons/punch-clock";

export default function TimeInput({ punchOut = false, disabled }: { punchOut?: boolean, disabled: boolean }) {
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const updateTime = () => setCurrentTime(formatTime(new Date()));

        // set immediately
        updateTime();
        // update every second
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="time-picker" className={`px-1 ${disabled ? 'text-gray-400' : ''}`}>
                {punchOut ? "Punch Out Time:" : "Punch In Time:"}
            </Label>
            <div className="flex items-center gap-2">
                <Input
                    type="text"
                    id="time-picker"
                    value={currentTime}
                    readOnly
                    disabled={disabled}
                    className={`bg-background appearance-none w-30 ${disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''}`}
                />
                <Clock size={28} />
            </div>
            <Tooltip>
                <TooltipTrigger asChild>
                    <PunchClockButton disabled={disabled} punchOut={punchOut} />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Must Allow Location</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}

// helper at bottom
function formatTime(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    return `${formattedHours}:${minutes}:${seconds} ${ampm}`;
}
