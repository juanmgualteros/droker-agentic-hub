import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function OrganizationPage({
  params
}: {
  params: { locale: string }
}) {
  // Check if user is authenticated and has admin role
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('isAuthenticated')?.value === 'true';
  const userRole = cookieStore.get('userRole')?.value;

  if (!isAuthenticated || !['admin', 'superadmin'].includes(userRole || '')) {
    redirect(`/${params.locale}/login`);
  }

  const organization = await prisma.organization.findFirst({
    include: {
      users: true,
      apiKeys: true,
      subscription: true,
    },
  });

  if (!organization) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-light text-gray-900">Organization</h1>
          <p className="mt-1 text-sm text-gray-500">
            No organization found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light text-gray-900">Organization</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage your organization details
        </p>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <pre>{JSON.stringify(organization, null, 2)}</pre>
      </div>
    </div>
  );
} 