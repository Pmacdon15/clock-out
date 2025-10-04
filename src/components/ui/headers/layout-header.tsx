import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { ClockAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
    return (
        <div className="w-full flex flex-col">
            <div className="flex justify-end p-4">
                <div>
                    <SignedOut>
                        <div className="flex gap-2">
                            <SignInButton forceRedirectUrl={'punch-clock'} />
                            <SignUpButton forceRedirectUrl={'punch-clock'} />
                        </div>
                    </SignedOut>                    
                </div>
            </div>
            <div className="flex items-center justify-center w-5/6 md:w-3/6 p-4 mx-auto rounded-full border-[3px] border-dashed border-blue-400">
                <div className={'flex gap-2 text-4xl font-bold justify-center align-middle items-center'}>Punch Clock <ClockAlert size={34} /></div>
            </div>
        </div>
    );
}