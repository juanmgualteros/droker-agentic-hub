import { prisma } from '@/lib/prisma';
import OrganizationsClient from '@/components/superadmin/organizations/OrganizationsClient';
import { ApiKeyType, SubStatus } from '@prisma/client';

async function getOrganizations() {
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
}

export default async function OrganizationsPage() {
  const organizations = await getOrganizations();

  return <OrganizationsClient organizations={organizations} />;
} 