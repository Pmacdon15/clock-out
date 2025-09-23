'use client'
import { Label } from "@radix-ui/react-label";
import { Input } from "../input";
import { useEffect, useState } from "react";

export default function TimeInput({ punchOut = false }: { punchOut?: boolean }) {
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
        const formattedTime = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
        setCurrentTime(formattedTime);
    }, []);

    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="time-picker" className="px-1">
                {punchOut ? "Punch Out Time" : "Punch In Time"}
            </Label>
            <Input
                type="text"
                id="time-picker"
                value={currentTime}
                readOnly
                className="bg-background appearance-none w-30"
            />
        </div>
    );
}