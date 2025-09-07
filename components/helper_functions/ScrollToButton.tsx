"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ComponentProps } from "react";

interface ScrollToButtonProps extends ComponentProps<typeof Button> {
  targetId: string;
  children: React.ReactNode;
}

export function ScrollToButton({ targetId, children, ...props }: ScrollToButtonProps) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <Button onClick={handleClick} {...props}>
      {children}
      <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  );
}
