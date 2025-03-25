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
            "relative bg-card transition-all duration-300 ease-in-out border-r border-gray-200 shadow-[2px_0_8px_-2px_rgba(0,0,0,0.1)] rounded-tr-md rounded-br-md",
            isSidebarOpen ? "w-56" : "w-16"
          )}
        >
          {/* Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="h-4 w-4 text-gray-400" />
            ) : (
              <PanelLeftOpen className="h-4 w-4 text-gray-400" />
            )}
          </Button>

          <div className="p-3">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname.includes(item.href);
                return (
                  <Link
                    key={item.name}
                    href={`/${locale}${item.href}`}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    title={!isSidebarOpen ? item.name : undefined}
                  >
                    <item.icon 
                      className={cn(
                        "h-5 w-5 flex-shrink-0",
                        isActive 
                          ? "text-[hsl(215_100%_50%)]" 
                          : "text-muted-foreground group-hover:text-foreground"
                      )} 
                    />
                    {isSidebarOpen && (
                      <span className={cn(
                        "ml-3 truncate",
                        isActive 
                          ? "text-[hsl(215_100%_50%)]" 
                          : "text-muted-foreground"
                      )}>{item.name}</span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-muted/10">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 