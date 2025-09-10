"use client";

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function CompoundInterestCalculator() {
  const [initialAmount, setInitialAmount] = useState('10000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [annualInterestRate, setAnnualInterestRate] = useState('7');
  const [timeHorizon, setTimeHorizon] = useState('10');
  const [compoundingFrequency, setCompoundingFrequency] = useState('annually');
  const [rateVariance, setRateVariance] = useState('0');

  // Calculate compound interest data
  const chartData = useMemo(() => {
    const initial = parseFloat(initialAmount) || 0;
    const monthlyContrib = parseFloat(monthlyContribution) || 0;
    const annualRate = parseFloat(annualInterestRate) / 100 || 0;
    const years = parseInt(timeHorizon) || 1;
    const variance = parseFloat(rateVariance) / 100 || 0;

    const data = [];

    // Calculate for each year
    for (let year = 0; year <= years; year++) {
      // Baseline calculation (no interest)
      const baseline = initial + (monthlyContrib * 12 * year);

      // Main compound interest calculation
      // Only money present at beginning of year receives interest
      let compoundValue = initial;
      let highVarianceValue = initial;
      let lowVarianceValue = initial;

      for (let y = 1; y <= year; y++) {
        // Apply interest to money from beginning of year
        compoundValue = compoundValue * (1 + annualRate);
        highVarianceValue = highVarianceValue * (1 + annualRate + variance);
        lowVarianceValue = lowVarianceValue * (1 + annualRate - variance);

        // Add annual contributions (12 months * monthly contribution)
        const annualContribution = monthlyContrib * 12;
        compoundValue += annualContribution;
        highVarianceValue += annualContribution;
        lowVarianceValue += annualContribution;
      }

      data.push({
        year: year,
        baseline: Math.round(baseline),
        compound: Math.round(compoundValue),
        highVariance: variance > 0 ? Math.round(highVarianceValue) : null,
        lowVariance: variance > 0 ? Math.round(lowVarianceValue) : null,
      });
    }

    return data;
  }, [initialAmount, monthlyContribution, annualInterestRate, timeHorizon, rateVariance]);

  return (
    <section id="compound-interest-calculator" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Compound Interest Calculator
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Visualize the power of compound interest with our interactive calculator. 
            See how your investments can grow over time with different scenarios.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">
              Calculator Settings
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Adjust the parameters below to see how different scenarios affect your investment growth.
              The chart will update in real-time as you change the values.
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="initial-amount">Initial Investment</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="initial-amount"
                      type="number"
                      value={initialAmount}
                      onChange={(e) => setInitialAmount(e.target.value)}
                      className="pl-8"
                      placeholder="10000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthly-contribution">Monthly Contribution</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="monthly-contribution"
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(e.target.value)}
                      className="pl-8"
                      placeholder="500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="interest-rate">Annual Interest Rate</Label>
                  <div className="relative">
                    <Input
                      id="interest-rate"
                      type="number"
                      step="0.1"
                      value={annualInterestRate}
                      onChange={(e) => setAnnualInterestRate(e.target.value)}
                      className="pr-8"
                      placeholder="7"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time-horizon">Time Horizon</Label>
                  <div className="relative">
                    <Input
                      id="time-horizon"
                      type="number"
                      value={timeHorizon}
                      onChange={(e) => setTimeHorizon(e.target.value)}
                      className="pr-16"
                      placeholder="10"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">years</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="compounding">Compounding Frequency</Label>
                  <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annually">Annually</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rate-variance">Rate Variance (±)</Label>
                  <div className="relative">
                    <Input
                      id="rate-variance"
                      type="number"
                      step="0.1"
                      value={rateVariance}
                      onChange={(e) => setRateVariance(e.target.value)}
                      className="pr-8"
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="mb-4">
              <h4 className="text-lg font-medium text-foreground mb-2">
                Investment Growth Projection
              </h4>
              <p className="text-sm text-muted-foreground">
                Compound interest vs baseline savings over {timeHorizon} years
              </p>
              <div className="flex flex-wrap gap-4 mt-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-primary rounded-sm"></div>
                  <span className="font-medium">Compound Interest</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-muted-foreground"></div>
                  <span>Baseline (No Interest)</span>
                </div>
                {parseFloat(rateVariance) > 0 && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 bg-green-500"></div>
                      <span>High Scenario (+{rateVariance}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 bg-red-500"></div>
                      <span>Low Scenario (-{rateVariance}%)</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="year" 
                    className="text-muted-foreground"
                    fontSize={12}
                    label={{
                      value: 'Years',
                      position: 'insideBottom',
                      offset: -10,
                      style: { textAnchor: 'middle' }
                    }}
                    height={30}
                  />
                  <YAxis 
                    className="text-muted-foreground"
                    fontSize={12}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    label={{
                      value: 'Portfolio Value',
                      angle: -90,
                      position: 'insideLeft',
                      style: { textAnchor: 'middle' }
                    }}
                    width={60}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      borderRadius: '8px',
                      color: '#1f2937',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                      backdropFilter: 'blur(4px)',
                      padding: '12px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                    labelStyle={{
                      color: '#374151',
                      fontWeight: '600',
                      marginBottom: '4px'
                    }}
                    formatter={(value, name) => [
                      `$${Number(value).toLocaleString()}`,
                      name === 'compound' ? 'Compound Interest' :
                        name === 'baseline' ? 'Baseline Savings' :
                          name === 'highVariance' ? 'High Scenario' :
                            name === 'lowVariance' ? 'Low Scenario' : name
                    ]}
                    labelFormatter={(year) => `Year ${year}`}
                  />

                  {/* Main compound interest line */}
                  <Line
                    type="monotone"
                    dataKey="compound"
                    stroke="#0f172a"
                    strokeWidth={3.5}
                    dot={{ fill: '#0f172a', stroke: '#0f172a', strokeWidth: 1.5, r: 3.5 }}
                    activeDot={{ r: 7, stroke: '#0f172a', strokeWidth: 3, fill: '#0f172a' }}
                    name="compound"
                  />

                  {/* Baseline line (no interest) */}
                  <Line
                    type="monotone"
                    dataKey="baseline"
                    stroke="#6b7280"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="baseline"
                  />

                  {/* Variance lines (if variance > 0) */}
                  {parseFloat(rateVariance) > 0 && (
                    <>
                      <Line
                        type="monotone"
                        dataKey="highVariance"
                        stroke="#22c55e"
                        strokeWidth={2}
                        strokeDasharray="3 3"
                        dot={false}
                        name="highVariance"
                      />
                      <Line
                        type="monotone"
                        dataKey="lowVariance"
                        stroke="#ef4444"
                        strokeWidth={2}
                        strokeDasharray="3 3"
                        dot={false}
                        name="lowVariance"
                      />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
