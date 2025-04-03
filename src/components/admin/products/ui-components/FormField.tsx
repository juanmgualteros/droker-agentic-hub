import React, { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { HelpTooltip } from "./HelpTooltip";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id?: string;
  label: string;
  tooltip?: string;
  children: ReactNode;
  className?: string;
  required?: boolean;
  error?: string;
}

/**
 * Reusable form field component with consistent styling and layout
 * Includes label, optional tooltip, and error message support
 */
export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  tooltip,
  children,
  className,
  required = false,
  error,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <Label 
          htmlFor={id} 
          className="text-sm font-comfortaa font-medium text-foreground dark:text-white"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {tooltip && <HelpTooltip content={tooltip} />}
      </div>
      
      {children}
      
      {error && (
        <p className="text-xs font-comfortaa text-destructive">
          {error}
        </p>
      )}
    </div>
  );
};
