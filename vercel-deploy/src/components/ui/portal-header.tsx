"use client";

import { Logo } from './logo';
import { Settings, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LanguageSelector } from '@/components/language-selector';
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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <Logo className="h-6 w-6" />
            <span className="text-lg font-light text-foreground">{title}</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSelector locale={locale} />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isAdmin && (
                <>
                  <DropdownMenuItem className="text-sm">
                    <span className="font-medium">{userName}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-sm text-muted-foreground">
                    {organizationName}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem asChild>
                <Link href={`/${locale}/admin/settings`} className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
} 