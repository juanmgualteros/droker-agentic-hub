"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ThemeContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * A container component that adapts to the current theme.
 * Use this instead of hardcoded bg-white for components that need theme-aware backgrounds.
 */
export function ThemeContainer({
  children,
  className,
}: ThemeContainerProps) {
  return (
    <div
      className={cn(
        "bg-background text-foreground border-border rounded-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
