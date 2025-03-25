"use client";

import Link from "next/link";
import { Shield, Users, UserCircle } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";
import { usePathname } from 'next/navigation';
import { PortalHeader } from "@/components/ui/portal-header";
import { Suspense } from 'react';

function HomeContent() {
  const { t } = useTranslations('Index');
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <PortalHeader 
        title="Droker Agentic Hub" 
        locale={locale}
        isHome={true}
      />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-[hsl(var(--foreground))] mb-4">
            Welcome to Droker Agentic Hub Portal
          </h1>
          <p className="text-lg text-[hsl(var(--muted-foreground))] font-light max-w-2xl mx-auto">
            Choose your portal to get started
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Link
            href={`/${locale}/superadmin/organizations`}
            className="group flex flex-col items-center p-8 bg-white rounded-2xl shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.12)] transition-all"
          >
            <Shield className="w-12 h-12 text-gray-300 group-hover:text-[hsl(215_100%_50%)] transition-colors mb-4" />
            <h2 className="text-xl font-light text-[hsl(var(--foreground))] mb-2">
              Super Admin Portal
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] font-light text-center">
              Manage organizations and system-wide settings
            </p>
          </Link>

          <Link
            href={`/${locale}/admin`}
            className="group flex flex-col items-center p-8 bg-white rounded-2xl shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.12)] transition-all"
          >
            <Users className="w-12 h-12 text-gray-300 group-hover:text-[hsl(215_100%_50%)] transition-colors mb-4" />
            <h2 className="text-xl font-light text-[hsl(var(--foreground))] mb-2">
              Admin Portal
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] font-light text-center">
              Manage your organization's users and settings
            </p>
          </Link>

          <Link
            href={`/${locale}/customer`}
            className="group flex flex-col items-center p-8 bg-white rounded-2xl shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.12)] transition-all"
          >
            <UserCircle className="w-12 h-12 text-gray-300 group-hover:text-[hsl(215_100%_50%)] transition-colors mb-4" />
            <h2 className="text-xl font-light text-[hsl(var(--foreground))] mb-2">
              Customer Portal
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] font-light text-center">
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
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <div className="py-8">
        <div className="animate-pulse max-w-5xl mx-auto">
          <div className="h-10 bg-[hsl(var(--muted))] rounded-md w-1/3 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-60 bg-[hsl(var(--muted))] rounded-lg"></div>
            <div className="h-60 bg-[hsl(var(--muted))] rounded-lg"></div>
            <div className="h-60 bg-[hsl(var(--muted))] rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomeClient() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <HomeContent />
    </Suspense>
  );
} 