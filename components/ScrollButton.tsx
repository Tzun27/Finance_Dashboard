"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ComponentProps } from "react";
import { scrollToElementSimple } from "@/components/helper_functions/scrollUtils";

interface ScrollButtonProps extends ComponentProps<typeof Button> {
  targetId: string;
  children: React.ReactNode;
}

export function ScrollButton({ targetId, children, ...props }: ScrollButtonProps) {
  return (
    <Button onClick={() => scrollToElementSimple(targetId)} {...props}>
      {children}
      <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  );
}
