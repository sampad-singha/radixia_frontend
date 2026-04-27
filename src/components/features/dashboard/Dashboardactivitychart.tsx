"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// --- MOCK DATA GENERATOR (Simulating Backend) ---
const generateDailyData = () => {
    const data = []
    const now = new Date()
    for (let i = 30; i >= 0; i--) {
        const date = new Date(now)
        date.setDate(now.getDate() - i)
        data.push({
            // Format: "2024-04-15"
            date: date.toISOString().split("T")[0],
            // Just the day/month for the axis: "15 Apr"
            label: date.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
            hours: Math.floor(Math.random() * 8) + 1,
        })
    }
    return data
}

const fullData = generateDailyData()

const chartConfig = {
    hours: {
        label: "Hours",
        color: "var(--primary)",
    },
} satisfies ChartConfig

export default function DashboardActivityChart() {
    const [daysToShow, setDaysToShow] = React.useState(20)

    // Filter data based on the selected duration
    const filteredData = React.useMemo(() => {
        return fullData.slice(-daysToShow)
    }, [daysToShow])

    return (
        <div className="border rounded-xl p-6 bg-card shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-base font-semibold text-card-foreground leading-none mb-1">
                        Learning Activity
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Showing total hours for the last {daysToShow} days
                    </p>
                </div>

                {/* Duration Picker */}
                <Select
                    value={daysToShow.toString()}
                    onValueChange={(v) => setDaysToShow(Number(v))}
                >
                    <SelectTrigger className="w-[120px] h-8 text-xs">
                        <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="7">Last 7 days</SelectItem>
                        <SelectItem value="14">Last 14 days</SelectItem>
                        <SelectItem value="20">Last 20 days</SelectItem>
                        <SelectItem value="30">Last 30 days</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <BarChart accessibilityLayer data={filteredData}>
                    <CartesianGrid
                        vertical={false}
                        strokeDasharray="4"
                        className="stroke-muted"
                    />
                    <XAxis
                        dataKey="label"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        interval={daysToShow > 14 ? 2 : 0} // Avoid cluttering the axis
                        tick={{
                            fontSize: 11,
                            fill: "var(--muted-foreground)",
                        }}
                    />

                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                    />

                    <Bar
                        dataKey="hours"
                        fill="var(--color-hours)"
                        radius={[4, 4, 0, 0]}
                        // Adjust bar size based on how many bars are visible
                        barSize={daysToShow > 20 ? 15 : 25}
                    />
                </BarChart>
            </ChartContainer>
        </div>
    )
}