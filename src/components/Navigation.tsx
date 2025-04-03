'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const router = useRouter();
  const [userRole, setUserRole] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userRole') || '';
    }
    return '';
  });

  // Get locale from pathname
  const locale = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    document.cookie = 'isAuthenticated=false; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push(`/${locale}/login`);
  };

  const navigation = userRole === 'superadmin' ? [
    { name: 'Organizations', href: `/${locale}/superadmin/organizations` },
    { name: 'Settings', href: `/${locale}/superadmin/settings` },
  ] : [
    { name: 'Dashboard', href: `/${locale}/admin` },
    { name: 'Products', href: `/${locale}/admin/products` },
    { name: 'Organization', href: `/${locale}/admin/organization` },
    { name: 'Settings', href: `/${locale}/admin/settings` },
  ];

  return (
    <nav className={cn("flex flex-col w-64 bg-background border-r border-border", className)}>
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div className="flex-grow mt-5">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-2 text-sm font-light text-foreground hover:bg-muted"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="px-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-sm font-light text-foreground dark:text-white hover:bg-muted rounded-md"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
} 