import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('isAuthenticated')?.value === 'true';
  const userRole = cookieStore.get('userRole')?.value;

  if (!isAuthenticated || !['admin', 'superadmin'].includes(userRole || '')) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  );
} 