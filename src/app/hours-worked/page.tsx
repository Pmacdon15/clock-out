import { Button } from "@/components/ui/button";
import { HoursWorkedChart } from "@/components/ui/charts/hours-worked-chart";
import { getHoursWorked } from "@/lib/DAL/punch-clock";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";

export default async function HoursWorkedPage() {
  const hoursWorked = await getHoursWorked();
  return (
    <>
      <div className="flex justify-end p-6">
        <SignedIn>
          <Link href="/punch-clock">
            <Button>Punch Clock</Button>
          </Link>
        </SignedIn>
      </div>
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">Hours Worked</h1>
        <HoursWorkedChart data={hoursWorked} />
      </div>
    </>
  );
}
