import React, { ReactNode } from "react";
import { HelpTooltip } from "./HelpTooltip";

interface ConfigSectionProps {
  title: string;
  tooltip?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Standard section for configuration components with a title and optional tooltip
 */
export const ConfigSection: React.FC<ConfigSectionProps> = ({
  title,
  tooltip,
  children,
  className = "",
}) => {
  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-comfortaa font-medium text-foreground dark:text-white">
          {title}
        </h3>
        {tooltip && <HelpTooltip content={tooltip} />}
      </div>
      
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};
