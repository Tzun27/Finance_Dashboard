"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Target, Calculator, PieChart, TrendingUp, Eye, BarChart3 } from "lucide-react";
import { scrollToElement } from "@/components/helper_functions/scrollUtils";

export function Features() {
  return (
    <section id="features" className="py-24 bg-muted/30 animate-fade-in-up animate-delay-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need.{" "}
            <span className="text-muted-foreground">Nothing you don&apos;t.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Financial management and visibility in one place. Experience a flexible toolkit
            that makes every task feel like a breeze.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 hover:bg-accent/50"
            onClick={() => scrollToElement('compound-interest-calculator', 80)}
          >
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">Compound Interest Calculator</CardTitle>
              <CardDescription>
                Visualize the power of compound interest and watch your investments grow. Click to explore our calculator.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 hover:bg-accent/50"
            onClick={() => scrollToElement('currency-converter', 80)}
          >
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">Currency Conversion</CardTitle>
              <CardDescription>
                Real-time currency conversion with live exchange rates for informed financial decisions.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Visual Insights</CardTitle>
              <CardDescription>
                Transform complex financial data into clear, actionable insights with interactive charts.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Progress Analytics</CardTitle>
              <CardDescription>
                Monitor your financial journey with detailed analytics and progress reports.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Real-time Updates</CardTitle>
              <CardDescription>
                See your financial progress update in real-time as you make changes to your goals.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Custom Dashboards</CardTitle>
              <CardDescription>
                Create personalized dashboards that focus on what matters most to your financial goals.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
