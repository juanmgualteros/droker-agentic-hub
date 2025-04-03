import React from "react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface HelpTooltipProps {
  content: string;
  className?: string;
}

/**
 * Standard help tooltip with consistent styling
 */
export const HelpTooltip: React.FC<HelpTooltipProps> = ({
  content,
  className = "",
}) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className={`h-4 w-4 text-muted-foreground dark:text-white/50 cursor-help ${className}`} />
        </TooltipTrigger>
        <TooltipContent className="p-3 max-w-sm font-comfortaa text-xs bg-popover dark:bg-background text-foreground dark:text-white">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
