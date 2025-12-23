"use client";

import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

// Chart component for displaying exchange rate trends
export function ExchangeRateChart({
    data,
    fromCurrency,
    toCurrency,
    timeRange,
}: {
    data: { date: string; rate: number }[];
    fromCurrency: string;
    toCurrency: string;
    timeRange: string;
}) {
    if (data.length === 0) return null;

    const rates = data.map((d) => d.rate);
    const minRate = Math.min(...rates);
    const maxRate = Math.max(...rates);

    // Calculate trend
    const startRate = rates[0];
    const endRate = rates[rates.length - 1];
    const isPositiveTrend = endRate >= startRate;

    // Colors for positive (Green) and negative (Red) trends
    // Using explicit colors to match Google Finance style
    const color = isPositiveTrend ? "#137333" : "#d93025";

    // Calculate domain padding for Y-axis to make the chart look better
    const domainPadding = (maxRate - minRate) * 0.1;

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;

        switch (timeRange) {
            case '5D':
            case '1M':
                return date.toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                });
            case '1Y':
            case '5Y':
            case 'Max':
                return date.toLocaleDateString(undefined, {
                    month: 'short',
                    year: 'numeric',
                });
            default:
                return date.toLocaleDateString();
        }
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-popover border border-border px-3 py-2 rounded-lg shadow-md text-sm">
                    <p className="text-muted-foreground mb-1">{formatDate(label)}</p>
                    <p className="font-medium text-foreground">
                        1 {fromCurrency} = {payload[0].value.toFixed(4)} {toCurrency}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="date"
                        hide={false}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={formatDate}
                        minTickGap={30}
                        tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis
                        hide={false}
                        domain={[minRate - domainPadding, maxRate + domainPadding]}
                        axisLine={false}
                        tickLine={false}
                        tickCount={5}
                        tickFormatter={(value) => value.toFixed(2)}
                        width={40}
                        tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="rate"
                        stroke={color}
                        strokeWidth={2}
                        fill="url(#chartGradient)"
                        animationDuration={1000}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
