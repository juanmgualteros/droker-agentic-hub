'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { PortalLayout } from '@/components/layout/PortalLayout';

export default function AdminLayout({
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
    // Check authentication and role
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userRole = localStorage.getItem("userRole");
    
    if (!isAuthenticated || (userRole !== "admin" && userRole !== "superadmin")) {
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
      title="Admin Portal"
      locale={locale}
      portalType="admin"
    >
      {children}
    </PortalLayout>
  );
}