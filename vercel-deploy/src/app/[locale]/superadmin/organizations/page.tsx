import { prisma } from '@/lib/prisma';
import OrganizationsClient from '@/components/superadmin/organizations/OrganizationsClient';
import { ApiKeyType, SubStatus } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function getOrganizations() {
  try {
    const organizations = await prisma.organization.findMany({
      include: {
        users: true,
        apiKeys: true,
        subscription: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return organizations.map(org => ({
      id: org.id,
      name: org.name,
      state: (org.subscription?.status === 'ACTIVE' ? 'ACTIVE' : 'SUSPENDED') as 'ACTIVE' | 'SUSPENDED' | 'PENDING',
      subscription_id: org.subscription?.id || '',
      created_at: org.createdAt.toISOString(),
      apiKeys: org.apiKeys
        .filter(key => key.type === 'OPENAI' || key.type === 'SUPABASE')
        .map(key => ({
          id: key.id,
          name: key.name,
          type: key.type as 'OPENAI' | 'SUPABASE',
          openai_key: key.type === 'OPENAI' ? key.value : undefined,
          supabase_key: key.type === 'SUPABASE' ? key.value : undefined,
          created_at: key.createdAt.toISOString(),
        })),
      users: org.users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      })),
    }));
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return [];
  }
}

export default async function OrganizationsPage({
  params
}: {
  params: { locale: string }
}) {
  // Check if user is authenticated and has superadmin role
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('isAuthenticated')?.value === 'true';
  const userRole = cookieStore.get('userRole')?.value;

  if (!isAuthenticated || userRole !== 'superadmin') {
    redirect(`/${params.locale}/login`);
  }

  try {
    const organizations = await getOrganizations();
    return <OrganizationsClient organizations={organizations} />;
  } catch (error) {
    console.error('Error in OrganizationsPage:', error);
    redirect(`/${params.locale}/error`);
  }
}

// Disable static page generation
export const dynamic = 'force-dynamic'; 