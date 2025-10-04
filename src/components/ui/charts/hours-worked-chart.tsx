'use client'

import { HoursWorked } from "@/lib/DB/punch-clock-db"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "../chart"
import { Bar, BarChart, XAxis, YAxis } from "recharts";

const chartConfig = {
    hours: {
        label: "Hours",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig;

export function HoursWorkedChart({ data }: { data: HoursWorked[] }) {
    return (
        <ChartContainer config={chartConfig} id="hours-worked-chart">
            <BarChart data={data}>
                <XAxis
                    dataKey="date"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis domain={[0, 'auto']} />
                <Bar dataKey="hours" fill={chartConfig.hours.color} />
                <ChartTooltip content={<ChartTooltipContent />} />
            </BarChart>
        </ChartContainer>
    )
}
