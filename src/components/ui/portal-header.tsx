"use client";

import { Logo } from './logo';
import { useRouter } from 'next/navigation';
import { SettingsMenu } from '@/components/settings-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PortalHeaderProps {
  title: string;
  locale: string;
  isHome?: boolean;
  userName?: string;
  isAdmin?: boolean;
  organizationName?: string;
}

export function PortalHeader({ title, locale, isHome = false, userName, isAdmin, organizationName }: PortalHeaderProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    document.cookie = "isAuthenticated=false; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.replace(`/${locale}/login`);
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className={cn("sticky", "top-0", "z-50", "w-full", "border-b", "border-border", "bg-background/95", "backdrop-blur", "supports-[backdrop-filter]:bg-background/60")}>
      <div className={cn("container", "flex", "h-16", "items-center", "justify-between")}>
        <div className={cn("flex", "items-center", "gap-4")}>
          <Link href={`/${locale}`} className={cn("flex", "items-center", "space-x-2")}>
            <Logo className={cn("h-6", "w-6")} />
            <span className={cn("text-lg", "font-light", "text-foreground")}>{title}</span>
          </Link>
        </div>

        <div className={cn("flex", "items-center", "gap-4")}>
          {/* Unified settings menu with language and theme options */}
          <SettingsMenu locale={locale} />
        </div>
      </div>
    </header>
  );
}