"use client";

import Link from "next/link";
import { Shield, Users, UserCircle } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";
import { usePathname } from 'next/navigation';
import { PortalHeader } from "@/components/ui/portal-header";
import { Suspense } from 'react';
import { ThemeContainer } from "@/components/ui/theme-container";
import { cn } from "@/lib/utils";

function HomeContent() {
  const { t } = useTranslations('Index');
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';

  return (
    <div className="min-h-screen bg-background text-foreground font-light">
      <PortalHeader 
        title="Droker Agentic Hub" 
        locale={locale}
        isHome={true}
      />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-foreground mb-4">
            Welcome to Droker Agentic Hub Portal
          </h1>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            Choose your portal to get started
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Link
            href={`/${locale}/superadmin/organizations`}
            className="ds-card group flex flex-col items-center p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
          >
            <Shield className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors mb-4" />
            <h2 className="text-xl font-light text-foreground mb-2">
              Super Admin Portal
            </h2>
            <p className="text-muted-foreground font-light text-center">
              Manage organizations and system-wide settings
            </p>
          </Link>

          <Link
            href={`/${locale}/admin`}
            className="ds-card group flex flex-col items-center p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
          >
            <Users className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors mb-4" />
            <h2 className="text-xl font-light text-foreground mb-2">
              Admin Portal
            </h2>
            <p className="text-muted-foreground font-light text-center">
              Manage your organization's users and settings
            </p>
          </Link>

          <Link
            href={`/${locale}/customer`}
            className="ds-card group flex flex-col items-center p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
          >
            <UserCircle className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors mb-4" />
            <h2 className="text-xl font-light text-foreground mb-2">
              Customer Portal
            </h2>
            <p className="text-muted-foreground font-light text-center">
              Access your account and manage your services
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="py-8">
        <div className="animate-pulse max-w-5xl mx-auto">
          <div className="h-10 bg-muted rounded-md w-1/3 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-60 bg-muted rounded-lg"></div>
            <div className="h-60 bg-muted rounded-lg"></div>
            <div className="h-60 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomeClient() {
  return (
    <ThemeContainer>
      <Suspense fallback={<LoadingSkeleton />}>
        <HomeContent />
      </Suspense>
    </ThemeContainer>
  );
}