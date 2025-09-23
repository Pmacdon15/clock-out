import TimeInput from "@/components/ui/inputs/time-input";
import { OrganizationSwitcher, SignedIn, UserButton } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex justify-center p-4 mt-8">
            <div className="rounded-xl p-1 bg-gradient-to-r from-blue-500 to-cyan-500 w-5/6 mdw-4/6">
                <div className="flex flex-col gap-4 rounded-xl p-8  bg-black">
                    <SignedIn>
                        <div className="flex text-white justify-center">
                            <UserButton />
                            <OrganizationSwitcher />
                        </div>
                    </SignedIn>
                    <TimeInput disabled={false} />
                    <TimeInput punchOut disabled />
                </div>
            </div>
        </div>
    );
}