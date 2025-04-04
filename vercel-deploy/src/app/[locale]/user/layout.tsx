'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { PortalLayout } from '@/components/layout/PortalLayout';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <PortalLayout 
      title="User Portal"
      locale={locale}
      portalType="user"
    >
      {children}
    </PortalLayout>
  );
} 