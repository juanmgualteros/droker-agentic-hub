import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StyledCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Standard styled card component with consistent styling
 */
export const StyledCard: React.FC<StyledCardProps> = ({
  children,
  className,
}) => {
  return (
    <div 
      className={cn(
        "rounded-lg border border-border bg-background dark:bg-secondary p-4",
        "shadow-sm transition-all",
        className
      )}
    >
      {children}
    </div>
  );
};
