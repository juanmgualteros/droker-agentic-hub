"use client";

import { ReactNode, useState } from "react";
import { PortalHeader } from "@/components/ui/portal-header";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Building2, 
  Users, 
  Settings, 
  BarChart, 
  FileText, 
  Home, 
  CreditCard,
  Menu,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PortalLayoutProps {
  children: ReactNode;
  title: string;
  locale: string;
  portalType: 'superadmin' | 'admin' | 'user';
}

const navigationConfig = {
  superadmin: [
    {
      name: "Dashboard",
      href: "/superadmin/dashboard",
      icon: BarChart,
    },
    {
      name: "Organizations",
      href: "/superadmin/organizations",
      icon: Building2,
    },
    {
      name: "Settings",
      href: "/superadmin/settings",
      icon: Settings,
    },
  ],
  admin: [
    {
      name: "Dashboard",
      href: "/admin",
      icon: BarChart,
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: FileText,
    },
  ],
  user: [
    {
      name: "Overview",
      href: "/user/overview",
      icon: Home,
    },
    {
      name: "Documents",
      href: "/user/documents",
      icon: FileText,
    },
    {
      name: "Billing",
      href: "/user/billing",
      icon: CreditCard,
    },
    {
      name: "Settings",
      href: "/user/settings",
      icon: Settings,
    },
  ],
};

export function PortalLayout({ children, title, locale, portalType }: PortalLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const navigation = navigationConfig[portalType];

  return (
    <div className="min-h-screen bg-background text-foreground font-light">
      {/* Header */}
      <PortalHeader 
        title={title}
        locale={locale}
      />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside
          className={cn(
            "relative bg-background dark:bg-card border-r border-border transition-all duration-300 ease-in-out rounded-r-xl shadow-sm",
            isSidebarOpen ? "w-64" : "w-16"
          )}
        >
          {/* Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-border bg-background shadow-sm hover:bg-muted hover:text-foreground"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="h-4 w-4 text-muted-foreground" />
            ) : (
              <PanelLeftOpen className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>

          {/* Navigation */}
          <nav className="space-y-2 p-4 font-light">
            {navigation.map((item) => {
              const isActive = pathname === `/${locale}${item.href}` || 
                (item.href === '/admin' && pathname === `/${locale}/admin`);
              return (
                <Link
                  key={item.name}
                  href={`/${locale}${item.href}`}
                  className={cn(
                    "ds-nav-item rounded-lg transition-colors relative",
                    isActive
                      ? "ds-nav-item-active"
                      : "hover:bg-muted dark:hover:bg-muted"
                  )}
                >
                  <item.icon 
                    className={cn(
                      "flex-shrink-0 h-5 w-5",
                      !isSidebarOpen && "mx-auto",
                      isActive 
                        ? "text-primary" 
                        : "text-muted-foreground"
                    )} 
                  />
                  {isSidebarOpen && (
                    <span className={cn(
                      "ml-3",
                      isActive 
                        ? "text-foreground" 
                        : "text-muted-foreground"
                    )}>
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background p-6 font-light">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 