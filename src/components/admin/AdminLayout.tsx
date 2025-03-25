"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Package,
  Settings,
  LayoutDashboard,
  Menu,
} from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";
import { PortalHeader } from "@/components/ui/portal-header";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
];

export default function AdminLayout({ children, title, description }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { translate } = useTranslations("navigation");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [organizationName, setOrganizationName] = useState('');

  // Extract locale from pathname
  const locale = pathname.split("/")[1];

  // Update navigation with locale
  const localizedNavigation = navigation.map(item => ({
    ...item,
    href: `/${locale}${item.href}`
  }));

  useEffect(() => {
    // Check authentication and role
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userRole = localStorage.getItem("userRole");
    const storedUserName = localStorage.getItem("userName") || '';
    const storedOrgName = localStorage.getItem("organizationName") || 'Your Organization';
    
    if (!isAuthenticated || userRole !== "admin") {
      router.replace(`/${locale}/login`);
    } else {
      setUserName(storedUserName);
      setOrganizationName(storedOrgName);
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
      <PortalHeader 
        title={title} 
        locale={locale}
        userName={userName}
        isAdmin={true}
        organizationName={organizationName}
      />
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:flex lg:flex-col lg:w-64">
          <div className="flex flex-col flex-grow bg-card border-r border-border pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Link href="/admin" className="text-2xl font-light text-foreground">
                Admin Portal
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
        <div className="flex-1">
          <div className="flex items-center justify-between bg-card border-b border-border py-2 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              className="h-12 w-12 inline-flex items-center justify-center rounded-md text-foreground-secondary hover:text-foreground"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-2xl font-comfortaa font-light text-foreground">{title}</h1>
              {description && (
                <p className="mt-1 text-base font-comfortaa font-light text-foreground-secondary">
                  {description}
                </p>
              )}
            </div>
          </div>

          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
} 