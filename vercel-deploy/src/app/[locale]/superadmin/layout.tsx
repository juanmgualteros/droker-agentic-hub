'use client';

// Force clean deployment - v1
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { PortalLayout } from '@/components/layout/PortalLayout';

export default function SuperAdminLayout({
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
    try {
      const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
      const userRole = localStorage.getItem("userRole");
      
      if (!isAuthenticated || userRole !== "superadmin") {
        console.log('Not authenticated or not superadmin, redirecting to login');
        router.replace(`/${locale}/login`);
        return;
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error checking authentication:', error);
      router.replace(`/${locale}/login`);
    }
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
      title="Super Admin Portal"
      locale={locale}
      portalType="superadmin"
    >
      {children}
    </PortalLayout>
  );
} 