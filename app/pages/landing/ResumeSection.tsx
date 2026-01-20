import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function ResumeSection() {
  return (
    <section className="min-h-screen flex items-center animate-fade-in-up animate-delay-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Meet the creator
          </h2>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="text-base">
              About Me
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
