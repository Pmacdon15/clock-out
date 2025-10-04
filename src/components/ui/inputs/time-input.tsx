'use client'
import { Label } from "@radix-ui/react-label";
import { Input } from "../input";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";
import PunchClockButton from "../buttons/punch-clock";
import { Clock } from "lucide-react";

export default function TimeInput({ punchOut = false, disabled, clockInTime }: { punchOut?: boolean, disabled: boolean, clockInTime?: Date }) {
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const updateTime = () => setCurrentTime(formatTime(new Date()));
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const displayTime = punchOut ? currentTime : (clockInTime ? formatTime(new Date(clockInTime)) : currentTime);

    return (
        <div className="flex flex-col gap-3">
            {punchOut && clockInTime && (
                <div className="flex flex-col gap-3">
                    <Label className={`px-1 text-gray-400`}>
                        Punch In Time:
                    </Label>
                    <div className="flex items-center gap-2">
                        <Input
                            type="text"
                            value={formatTime(new Date(clockInTime))}
                            readOnly
                            disabled
                            className={`bg-background appearance-none w-30 bg-gray-200 text-gray-400 cursor-not-allowed`}
                        />
                        <Clock size={28} />
                    </div>
                </div>
            )}
            <Label htmlFor="time-picker" className={`px-1 ${disabled ? 'text-gray-400' : ''}`}>
                {punchOut ? "Punch Out Time:" : "Punch In Time:"}
            </Label>
            <div className="flex items-center gap-2">
                <Input
                    type="text"
                    id="time-picker"
                    value={displayTime}
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
