import { Button } from "@/components/ui/button";
import HoursWorkedChartFallback from "@/components/ui/fallbacks/hours-worked-chart-fallbacl";
import YearlyHoursWorkedFallback from "@/components/ui/fallbacks/yesr-hours-worked-chart-fallback";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Loading() {
    return (
      <>
            <div className="rounded-xl p-1 bg-gradient-to-r from-blue-500 to-cyan-500 w-full md:w-4/6">
                <div className="flex flex-col gap-4 rounded-xl p-4 bg-black">
                    <div className="flex text-white justify-center">
                        <UserButton />
                        <OrganizationSwitcher />
                        <Link href="/punch-clock">
                            <Button variant={"outline"}>Punch Clock</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="p-2 w-full md:w-5/6">
                <HoursWorkedChartFallback />
            </div>
            <div className="p-2 w-full md:w-5/6">
                <YearlyHoursWorkedFallback />
            </div>
      </>
    )
}




