'use client'

import { HoursWorked } from "@/lib/DB/punch-clock-db"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "../chart"
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";

const chartConfig = {
    hours: {
        label: "Hours",
    },
} satisfies ChartConfig;

export function HoursWorkedChart({ data, className }: { data: HoursWorked[], className?: string }) {
    return (
        <ChartContainer config={chartConfig} id="hours-worked-chart" className={className}>
            <BarChart data={data}>
                <XAxis
                    dataKey="date"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis domain={[0, 'auto']} />
                <Bar dataKey="hours" barSize={100}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Bar>
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            </BarChart>
        </ChartContainer>
    )
}