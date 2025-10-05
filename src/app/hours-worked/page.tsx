import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <Card>
          <CardHeader>
            <CardTitle>Hours Worked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <HoursWorkedChart data={hoursWorked} className="h-full aspect-auto" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
