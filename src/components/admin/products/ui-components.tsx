import React, { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// 1. Custom TabsTrigger with consistent styling
export const StyledTabsTrigger = ({ 
  value, 
  children, 
  className 
}: { 
  value: string; 
  children: ReactNode;
  className?: string;
}) => {
  return (
    <TabsTrigger 
      value={value} 
      className={cn(
        "inline-flex h-full items-center border-b-2 px-1 text-sm font-medium transition-colors",
        "hover:border-gray-300 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500",
        "border-transparent text-muted-foreground dark:text-white/70",
        className
      )}
    >
      {children}
    </TabsTrigger>
  );
};

// 2. Custom Card with consistent styling
export const StyledCard = ({ 
  children, 
  className 
}: { 
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Card className={cn(
      "p-6 bg-background dark:bg-card border border-border rounded-xl",
      className
    )}>
      {children}
    </Card>
  );
};

// 3. Text styling components
export const Heading = ({ 
  children, 
  className 
}: { 
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h3 className={cn(
      "text-lg font-comfortaa font-light text-foreground dark:text-white",
      className
    )}>
      {children}
    </h3>
  );
};

export const SubHeading = ({ 
  children, 
  className 
}: { 
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h4 className={cn(
      "text-sm font-comfortaa font-medium text-foreground dark:text-white",
      className
    )}>
      {children}
    </h4>
  );
};

export const BodyText = ({ 
  children, 
  className 
}: { 
  children: ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn(
      "text-sm font-comfortaa font-light text-foreground dark:text-white",
      className
    )}>
      {children}
    </p>
  );
};

export const MutedText = ({ 
  children, 
  className 
}: { 
  children: ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn(
      "text-sm font-comfortaa font-light text-muted-foreground dark:text-white/70",
      className
    )}>
      {children}
    </p>
  );
};

// 4. Badge/Pill component
export const CountBadge = ({ 
  count, 
  className 
}: { 
  count: number | string;
  className?: string;
}) => {
  return (
    <span className={cn(
      "text-xs font-comfortaa bg-accent/20 dark:bg-accent/10 text-foreground dark:text-white/80 px-2 py-1 rounded-full",
      className
    )}>
      {count}
    </span>
  );
};

// 5. Help Icon Tooltip
export const HelpTooltip = ({ 
  content,
  className
}: { 
  content: ReactNode;
  className?: string;
}) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            className={cn(
              "h-5 w-5 p-0 hover:bg-transparent hover:opacity-70 transition-opacity",
              className
            )}
          >
            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground dark:text-white/50" />
          </Button>
        </TooltipTrigger>
        <TooltipContent 
          side="right"
          className="max-w-xs"
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// 6. Configuration Section with heading and tooltip
export const ConfigSection = ({
  title,
  tooltip,
  children,
  className
}: {
  title: string;
  tooltip?: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2">
        <Heading>{title}</Heading>
        {tooltip && <HelpTooltip content={tooltip} />}
      </div>
      {children}
    </div>
  );
};

// 7. Stat Card for analytics
export const StatCard = ({
  title,
  value,
  change,
  isPositive = true,
  className
}: {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  className?: string;
}) => {
  return (
    <StyledCard className={cn("p-4", className)}>
      <div className="flex flex-col items-center">
        <SubHeading>{title}</SubHeading>
        <h4 className="text-3xl font-comfortaa font-light text-foreground dark:text-white mt-2">{value}</h4>
        {change && (
          <p className={cn(
            "text-xs font-comfortaa mt-1 flex items-center",
            isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          )}>
            <span>{change}</span>
          </p>
        )}
      </div>
    </StyledCard>
  );
};
