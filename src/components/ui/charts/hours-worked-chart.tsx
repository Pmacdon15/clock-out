'use client'

import { HoursWorked } from "@/lib/DB/punch-clock-db"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "../chart"
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";
import { use } from "react";

const chartConfig = {
    hours: {
        label: "Hours",
    },
} satisfies ChartConfig;

export function HoursWorkedChart({ initialHoursPromise, className }: { initialHoursPromise: Promise<HoursWorked[]>, className?: string }) {
    const hours = use(initialHoursPromise);
    return (
        <ChartContainer config={chartConfig} id="hours-worked-chart" className={className}>
            <BarChart data={hours}>
                <XAxis
                    dataKey="date"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis domain={[0, 'auto']} />
                <Bar dataKey="hours" barSize={100}>
                    {hours.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Bar>
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            </BarChart>
        </ChartContainer>
    )
}