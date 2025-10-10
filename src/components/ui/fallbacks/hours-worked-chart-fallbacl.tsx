"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "../chart";

const chartConfig = {
	hours: {
		label: "Hours",
	},
} satisfies ChartConfig;

export default function HoursWorkedChartFallback() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Hours Worked</CardTitle>
			</CardHeader>
			<CardContent>
				<div>
					<div className="mb-4">
						<label htmlFor="week-select" className="mr-2">
							Filter by week:
						</label>
						<select id="week-select" className="border p-1 rounded">
							<option value={""}>Select a Week</option>
						</select>
					</div>
					<div className="h-96">
						<ChartContainer
							config={chartConfig}
							id="hours-worked-chart"
							className="h-full aspect-auto"
						>
							<BarChart data={[]}>
								<XAxis
									dataKey="date"
									tickFormatter={(value) =>
										new Date(value).toLocaleDateString()
									}
								/>
								<YAxis domain={[0, "auto"]} />
								<Bar dataKey="hours" barSize={100}></Bar>
								<ChartTooltip
									cursor={false}
									content={<ChartTooltipContent />}
								/>
							</BarChart>
						</ChartContainer>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
