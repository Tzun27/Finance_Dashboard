"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Target, Calculator } from "lucide-react";
import { scrollToElement } from "@/components/helper_functions/scrollUtils";

export function Features() {
  return (
    <section id="features" className="min-h-screen flex items-center animate-fade-in-up animate-delay-200">
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

          <Card
            className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 hover:bg-accent/50"
            onClick={() => scrollToElement('mortgage-calculator', 80)}
          >
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">Mortgage Calculator</CardTitle>
              <CardDescription>
                Calculate your mortgage payments and see how different scenarios affect your loan.
              </CardDescription>
            </CardHeader>
          </Card>


        </div>
      </div>
    </section>
  );
}
