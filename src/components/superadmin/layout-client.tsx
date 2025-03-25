"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Settings,
  Building2,
} from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";
import { PortalHeader } from "@/components/ui/portal-header";

interface SuperAdminLayoutClientProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function SuperAdminLayoutClient({ children, title, description }: SuperAdminLayoutClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { translate } = useTranslations("navigation");

  // Extract locale from pathname
  const locale = pathname.split("/")[1];

  const navigation = [
    { name: "Organizations", href: `/${locale}/superadmin/organizations`, icon: Building2 },
    { name: "Settings", href: `/${locale}/superadmin/settings`, icon: Settings },
  ];

  useEffect(() => {
    // Check authentication and role
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userRole = localStorage.getItem("userRole");
    if (!isAuthenticated || userRole !== "superadmin") {
      router.replace(`/${locale}/login`);
    }
    setIsLoading(false);
  }, [router, locale]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    document.cookie = "isAuthenticated=false; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.replace(`/${locale}/login`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader title="Super Admin Portal" locale={locale} />
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:flex lg:flex-col lg:w-64">
          <div className="flex flex-col flex-grow bg-card border-r border-border pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Link href={`/${locale}/superadmin/organizations`} className="text-2xl font-light text-foreground">
                Super Admin
              </Link>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    pathname.startsWith(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground-secondary hover:bg-muted'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <item.icon
                    className={`${
                      pathname.startsWith(item.href)
                        ? 'text-primary-foreground'
                        : 'text-foreground-secondary'
                    } mr-3 h-5 w-5`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {title && (
                <h1 className="text-2xl font-light text-foreground mb-2">
                  {title}
                </h1>
              )}
              {description && (
                <p className="text-sm text-muted-foreground mb-4">
                  {description}
                </p>
              )}
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 