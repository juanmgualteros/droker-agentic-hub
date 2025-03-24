"use client";

import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export function PageLayout({
  children,
  title,
  description,
  className,
}: PageLayoutProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {(title || description) && (
        <div>
          {title && (
            <h1 className="text-2xl font-light text-black">{title}</h1>
          )}
          {description && (
            <p className="text-gray-500 font-light">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
} 