import { BarChart3 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="ml-2 text-sm text-muted-foreground">
              © 2025 Finance Visualizer. Built with Next.js and shadcn/ui.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
