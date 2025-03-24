"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Package,
  Settings,
  LayoutDashboard,
  Menu,
} from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";
import { PortalHeader } from "@/components/ui/portal-header";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminLayoutClientProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function AdminLayoutClient({ children, title, description }: AdminLayoutClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { translate } = useTranslations("navigation");

  // Extract locale from pathname
  const locale = pathname.split("/")[1];

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      router.replace(`/${locale}/login`);
    }
    setIsLoading(false);
  }, [router, locale]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PortalHeader title={translate("adminPortal")} locale={locale} />
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow bg-gray-800 pt-5 pb-4 overflow-y-auto">
              <nav className="flex-1 px-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        isActive
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'group flex items-center px-2 py-2 text-base font-comfortaa font-light rounded-md'
                      )}
                    >
                      <item.icon
                        className={cn(
                          isActive ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                          'mr-3 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between bg-gray-800 py-2 px-4 sm:px-6 lg:px-8">
              <button
                type="button"
                className="h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>

          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-comfortaa font-light text-gray-900">{title}</h1>
                {description && (
                  <p className="mt-1 text-base font-comfortaa font-light text-gray-500">{description}</p>
                )}
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
} 