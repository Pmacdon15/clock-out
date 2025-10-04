import { usePunchClock } from "@/lib/mutations/punch-clock";
import { Button } from "../button";

export default function PunchClockButton({ punchOut = false, disabled = false }:
    { punchOut?: boolean, disabled?: boolean }) {
    const { mutate, isPending } = usePunchClock();

    return (
        <Button
            disabled={isPending}
            className={disabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''}
            onClick={() => mutate()}
        >
            {punchOut ? "Punch Out" : "Punch In"}
        </Button>
    )
}