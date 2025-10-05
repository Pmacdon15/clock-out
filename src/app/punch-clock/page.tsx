import { Button } from "@/components/ui/button";
import TimeInput from "@/components/ui/inputs/time-input";
import { getTimeCard } from "@/lib/DAL/punch-clock";
import { OrganizationSwitcher, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function Page() {
    const timeCard = await getTimeCard()
    return (
        <>
            <div className="flex justify-center p-4 mt-8">
                <div className="rounded-xl p-1 bg-gradient-to-r from-blue-500 to-cyan-500 w-full md:w-3/6 ">
                    <div className="flex flex-col gap-4 rounded-xl p-8 bg-black">
                        <SignedIn>
                            <div className="flex text-white justify-center">
                                <UserButton />
                                <OrganizationSwitcher />
                            </div>
                            <div className="flex justify-end ">
                                <Link href="/hours-worked">
                                    <Button>Hours Worked</Button>
                                </Link>
                            </div>
                        </SignedIn>
                        <TimeInput disabled={!!timeCard} clockInTime={timeCard?.time_in} />
                        <TimeInput punchOut disabled={!timeCard} clockInTime={timeCard?.time_in} />
                    </div>
                </div>
            </div>
        </>
    );
}