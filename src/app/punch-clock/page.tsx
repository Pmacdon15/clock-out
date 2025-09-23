import { Button } from "@/components/ui/button";
import TimeInput from "@/components/ui/inputs/time-input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function Page() {
    return (
        <div className="flex justify-center p-4 mt-8">
            <div className="flex flex-col gap-4 border rounded-xl p-8">
                <TimeInput />
                <TimeInput punchOut />
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button>
                            Clock Out
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Must Alow Location</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
}