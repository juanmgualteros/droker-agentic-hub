"use client";

import { PortalHeader } from "@/components/ui/portal-header";
import { Navigation } from "@/components/Navigation";

interface PageLayoutProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function PageLayout({
  title,
  description,
  children,
  className,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <PortalHeader />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Navigation />
        <main className="flex-1 px-8 py-6">
          <div className="mb-6">
            <h1 className="text-3xl font-light text-black">{title}</h1>
            {description && (
              <p className="mt-2 text-sm text-gray-600">{description}</p>
            )}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
} 