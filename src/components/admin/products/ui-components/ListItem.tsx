import React, { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ListItemProps {
  children: ReactNode;
  onRemove?: () => void;
  className?: string;
  removable?: boolean;
  removeLabel?: string;
}

/**
 * Reusable list item component with consistent styling and optional remove button
 * Can be used for websites, QA pairs, files, etc.
 */
export const ListItem: React.FC<ListItemProps> = ({
  children,
  onRemove,
  className,
  removable = true,
  removeLabel = "Remove"
}) => {
  return (
    <div className={cn(
      "flex items-center justify-between p-3 rounded-lg mb-2",
      "bg-background dark:bg-secondary",
      "border border-border dark:border-border",
      "font-comfortaa text-sm text-foreground dark:text-white",
      className
    )}>
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
      
      {removable && onRemove && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="ml-2 h-8 w-8 p-0 text-muted-foreground hover:text-destructive dark:text-white/70 dark:hover:text-destructive"
          aria-label={removeLabel}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
