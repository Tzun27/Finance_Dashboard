import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3 } from "lucide-react";

export function Navigation() {
  return (
    <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-semibold">Finance Visualizer</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
