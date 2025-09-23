import { ClockAlert } from "lucide-react";

export default function Header() {
    return (
        <div className="flex items-center justify-center w-3/6 p-4 mt-8 mx-auto rounded-full border-[3px] border-dashed border-spacing-8 border-blue-400">
            <div className={'flex gap-2 text-4xl font-bold justify-center align-middle items-center'}>Clock Out App<ClockAlert size={34}/></div>
        </div>
    );
}