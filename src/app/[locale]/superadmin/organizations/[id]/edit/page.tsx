import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function EditOrganizationPage({
  params
}: {
  params: { id: string; locale: string }
}) {
  // Check if user is authenticated and has superadmin role
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('isAuthenticated')?.value === 'true';
  const userRole = cookieStore.get('userRole')?.value;

  if (!isAuthenticated || userRole !== 'superadmin') {
    redirect(`/${params.locale}/login`);
  }

  const organization = await prisma.organization.findUnique({
    where: { id: params.id },
    include: {
      users: true,
      apiKeys: true,
      subscription: true,
    },
  });

  if (!organization) {
    redirect(`/${params.locale}/superadmin/organizations`);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light text-gray-900">Edit Organization</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update organization details and manage its settings
        </p>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <pre>{JSON.stringify(organization, null, 2)}</pre>
      </div>
    </div>
  );
} 