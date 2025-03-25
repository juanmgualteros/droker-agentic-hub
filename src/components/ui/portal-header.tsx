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
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserRole(localStorage.getItem('userRole') || '');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    document.cookie = 'isAuthenticated=false; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.replace(`/${locale}/login`);
  };

  const getPortalHomeUrl = () => {
    return `/${locale}/${userRole}`;
  };

  // If it's the home page, show only language selection
  if (isHome) {
    return (
      <header className="h-16 bg-white flex items-center justify-end px-8">
        <LanguageSelector locale={locale} />
      </header>
    );
  }

  return (
    <header className="h-16 bg-white flex items-center px-8">
      <div className="flex-1 flex items-center gap-4">
        <Link href={getPortalHomeUrl()} className="flex items-center gap-2">
          <Logo src="/images/droker-logo.svg" size="md" className="text-black" />
          <span className="text-xl font-light text-black">{title}</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">
              <LanguageSelector locale={locale} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
} 