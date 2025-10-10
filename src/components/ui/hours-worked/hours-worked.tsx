"use client";

import { HoursWorkedChart } from "@/components/ui/charts/hours-worked-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeekSelector } from "../filters/week-selector";
import { HoursWorked, Week } from "@/lib/types/punch-clock-types";

interface HoursWorkedFilterProps {
	hoursPromise: Promise<HoursWorked[]>;
	// weeks: { label: string, value: string }[];
	weeksPromise: Promise<Week[]>;
}

export function HoursWorkedContainer({
	hoursPromise,
	weeksPromise,
}: HoursWorkedFilterProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Hours Worked</CardTitle>
			</CardHeader>
			<CardContent>
				<div>
					<WeekSelector weeksPromise={weeksPromise} />
					<div className="h-96">
						<HoursWorkedChart
							hoursPromise={hoursPromise}
							className="h-full aspect-auto"
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
