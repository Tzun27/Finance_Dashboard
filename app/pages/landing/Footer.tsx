import { BarChart3, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30 animate-fade-in-up animate-delay-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="ml-2 text-sm text-muted-foreground">
              © 2025 Finance Visualizer
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              asChild
            >
              <a
                href="https://github.com/Tzun27"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              asChild
            >
              <a
                href="https://www.linkedin.com/in/hao-tzun-chai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
