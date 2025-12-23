"use client";

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, BarChart3 } from 'lucide-react';

// Chart component for displaying exchange rate trends
export function ExchangeRateChart({
    data,
    fromCurrency,
    toCurrency
}: {
    data: { date: string; rate: number }[];
    fromCurrency: string;
    toCurrency: string;
}) {
    if (data.length === 0) return null;

    const rates = data.map(d => d.rate);
    const minRate = Math.min(...rates);
    const maxRate = Math.max(...rates);
    const avgRate = rates.reduce((a, b) => a + b, 0) / rates.length;

    // Chart dimensions with space for labels
    const width = 800;
    const height = 180;
    const paddingLeft = 60;
    const paddingRight = 20;
    const paddingTop = 20;
    const paddingBottom = 40;

    // Calculate points for the line
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * (width - paddingLeft - paddingRight) + paddingLeft;
        const y = paddingTop + ((maxRate - d.rate) / (maxRate - minRate)) * (height - paddingTop - paddingBottom);
        return `${x},${y}`;
    }).join(' ');

    // Create polygon points for filled area
    const chartBottom = height - paddingBottom;
    const areaPoints = `${paddingLeft},${chartBottom} ${points} ${width - paddingRight},${chartBottom}`;

    // Date labels (first, middle, last)
    const firstDate = new Date(data[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const midDate = new Date(data[Math.floor(data.length / 2)].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const lastDate = new Date(data[data.length - 1].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return (
        <div className="h-full flex flex-col gap-3">
            <div className="flex-1 min-h-0">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                    {/* Gradient for fill */}
                    <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                        </linearGradient>
                    </defs>

                    {/* Y-axis labels */}
                    <text x={paddingLeft - 10} y={paddingTop + 5} textAnchor="end" fontSize="10" fill="hsl(var(--muted-foreground))">
                        {maxRate.toFixed(4)}
                    </text>
                    <text x={paddingLeft - 10} y={(height - paddingBottom + paddingTop) / 2 + 4} textAnchor="end" fontSize="10" fill="hsl(var(--muted-foreground))">
                        {avgRate.toFixed(4)}
                    </text>
                    <text x={paddingLeft - 10} y={height - paddingBottom + 4} textAnchor="end" fontSize="10" fill="hsl(var(--muted-foreground))">
                        {minRate.toFixed(4)}
                    </text>

                    {/* Grid lines */}
                    <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft} y2={height - paddingBottom} stroke="hsl(var(--muted-foreground))" strokeOpacity="0.3" strokeWidth="1" />
                    <line x1={paddingLeft} y1={height - paddingBottom} x2={width - paddingRight} y2={height - paddingBottom} stroke="hsl(var(--muted-foreground))" strokeOpacity="0.3" strokeWidth="1" />

                    {/* Horizontal grid line */}
                    <line x1={paddingLeft} y1={(height - paddingBottom + paddingTop) / 2} x2={width - paddingRight} y2={(height - paddingBottom + paddingTop) / 2} stroke="hsl(var(--muted-foreground))" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="4 4" />

                    {/* Filled area */}
                    <polygon points={areaPoints} fill="url(#chartGradient)" />

                    {/* Line */}
                    <polyline points={points} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

                    {/* X-axis labels */}
                    <text x={paddingLeft} y={height - paddingBottom + 20} textAnchor="start" fontSize="10" fill="hsl(var(--muted-foreground))">
                        {firstDate}
                    </text>
                    <text x={(width - paddingRight + paddingLeft) / 2} y={height - paddingBottom + 20} textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">
                        {midDate}
                    </text>
                    <text x={width - paddingRight} y={height - paddingBottom + 20} textAnchor="end" fontSize="10" fill="hsl(var(--muted-foreground))">
                        {lastDate}
                    </text>
                </svg>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t border-border">
                <div className="text-center">
                    <p className="text-muted-foreground">Min</p>
                    <p className="font-medium text-foreground">{minRate.toFixed(4)}</p>
                </div>
                <div className="text-center">
                    <p className="text-muted-foreground">Avg</p>
                    <p className="font-medium text-foreground">{avgRate.toFixed(4)}</p>
                </div>
                <div className="text-center">
                    <p className="text-muted-foreground">Max</p>
                    <p className="font-medium text-foreground">{maxRate.toFixed(4)}</p>
                </div>
            </div>
        </div>
    );
}

