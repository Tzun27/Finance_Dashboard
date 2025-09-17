import { ScrollButton } from "@/components/ScrollButton";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 animate-fade-in-up animate-delay-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Every financial tool you need
            <span className="block text-primary">all in one place</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Say goodbye to outdated financial tools. Track, calculate, and visualize your financial goals
            with an interface that&apos;s simple, intuitive, and never boring.
          </p>
        </div>
        
        <div className="mt-24 flex flex-col items-center justify-center gap-4">
          <ScrollButton
            targetId="features"
            size="lg" 
            className="text-base"
          >
            Explore Tools
          </ScrollButton>
          <p className="text-sm text-muted-foreground">
            Compound Interest Calculator • Budget Planner • Investment Planner • Savings Visualizer • Debt Manager
          </p>
        </div>
      </div>
    </section>
  );
}
