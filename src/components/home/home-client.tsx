"use client";

import Link from "next/link";
import { Shield, Users, UserCircle } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";
import { useLocale } from "next-intl";
import { PortalHeader } from "@/components/ui/portal-header";

export default function HomeClient() {
  const t = useTranslations('Index');
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <PortalHeader title="Agentic Hub" locale={locale} showLogout={false} />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-black mb-4">
            Welcome to Agentic Hub
          </h1>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
            Choose your portal to get started
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Link
            href={`/${locale}/superadmin`}
            className="flex flex-col items-center p-8 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <Shield className="w-12 h-12 text-gray-800 mb-4" />
            <h2 className="text-xl font-light text-black mb-2">Super Admin Portal</h2>
            <p className="text-gray-500 font-light text-center">
              Manage organizations and system-wide settings
            </p>
          </Link>

          <Link
            href={`/${locale}/admin`}
            className="flex flex-col items-center p-8 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <Users className="w-12 h-12 text-gray-800 mb-4" />
            <h2 className="text-xl font-light text-black mb-2">Admin Portal</h2>
            <p className="text-gray-500 font-light text-center">
              Manage your organization's users and settings
            </p>
          </Link>

          <Link
            href={`/${locale}/customer`}
            className="flex flex-col items-center p-8 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <UserCircle className="w-12 h-12 text-gray-800 mb-4" />
            <h2 className="text-xl font-light text-black mb-2">Customer Portal</h2>
            <p className="text-gray-500 font-light text-center">
              Access your account and manage your services
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
} 