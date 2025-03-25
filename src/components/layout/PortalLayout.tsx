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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PortalHeader 
        title={title}
        locale={locale}
      />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside
          className={cn(
            "relative bg-card transition-all duration-300 ease-in-out border-r border-border shadow-sm",
            isSidebarOpen ? "w-64" : "w-16"
          )}
        >
          {/* Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-3 top-4 h-6 w-6 rounded-full border border-border bg-background shadow-sm hover:bg-muted"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="h-4 w-4 text-muted-foreground" />
            ) : (
              <PanelLeftOpen className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>

          {/* Navigation */}
          <nav className="space-y-1 p-4">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(`/${locale}${item.href}`);
              return (
                <Link
                  key={item.name}
                  href={`/${locale}${item.href}`}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-muted/50"
                      : "hover:bg-muted"
                  )}
                >
                  <item.icon 
                    className={cn(
                      "mr-3 h-5 w-5",
                      isActive 
                        ? "text-[#0066FF]" 
                        : "text-muted-foreground"
                    )} 
                  />
                  <span className={cn(
                    isActive 
                      ? "text-foreground" 
                      : "text-muted-foreground"
                  )}>
                    {isSidebarOpen && item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 