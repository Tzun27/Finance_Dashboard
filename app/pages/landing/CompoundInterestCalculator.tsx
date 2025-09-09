"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for the placeholder chart
const sampleData = [
  { month: 'Jan', value: 2400 },
  { month: 'Feb', value: 1398 },
  { month: 'Mar', value: 9800 },
  { month: 'Apr', value: 3908 },
  { month: 'May', value: 4800 },
  { month: 'Jun', value: 3800 },
  { month: 'Jul', value: 4300 },
  { month: 'Aug', value: 2400 },
  { month: 'Sep', value: 2400 },
  { month: 'Oct', value: 1398 },
  { month: 'Nov', value: 9800 },
  { month: 'Dec', value: 3908 },
];

export function CompoundInterestCalculator() {
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">
              Interactive Investment Growth
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Our compound interest calculator provides real-time visualization of your 
              investment growth. Input different scenarios and watch how compound interest 
              can dramatically impact your financial future.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-primary mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Real-time growth projections
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-primary mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Multiple interest rate scenarios
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-primary mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Adjustable time horizons
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-primary mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Export and share results
              </li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="mb-4">
              <h4 className="text-lg font-medium text-foreground mb-2">
                Sample Investment Growth
              </h4>
              <p className="text-sm text-muted-foreground">
                Monthly compound interest visualization
              </p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sampleData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="month" 
                    className="text-muted-foreground"
                    fontSize={12}
                  />
                  <YAxis 
                    className="text-muted-foreground"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
