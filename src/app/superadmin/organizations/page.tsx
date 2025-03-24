import { PrismaClient } from '@prisma/client';
import OrganizationsClient from '@/components/superadmin/organizations/OrganizationsClient';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

// Helper function to transform Prisma data to the expected format
function transformOrganization(org: any) {
  return {
    id: org.id,
    name: org.name,
    state: org.subscription?.status || 'PENDING',
    subscription_id: org.subscription?.id || '',
    created_at: org.createdAt.toISOString(),
    apiKeys: org.apiKeys?.map((key: any) => ({
      id: key.id,
      name: key.name,
      type: key.type,
      openai_key: key.type === 'OPENAI' ? key.value : undefined,
      supabase_key: key.type === 'SUPABASE' ? key.value : undefined,
      created_at: key.createdAt.toISOString()
    })) || []
  };
}

export default async function OrganizationsPage() {
  try {
    // Fetch organizations using Prisma
    const orgs = await prisma.organization.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        apiKeys: true,
        products: true,
        users: true,
        subscription: true
      }
    });

    if (!orgs || orgs.length === 0) {
      // Create a default organization if none exists
      const newOrg = await prisma.organization.create({
        data: {
          id: 'org_default',
          name: 'Default Organization',
          updatedAt: new Date(),
        },
        include: {
          apiKeys: true,
          products: true,
          users: true,
          subscription: true
        }
      });

      return (
        <div className="p-6">
          <OrganizationsClient organizations={[transformOrganization(newOrg)]} />
        </div>
      );
    }

    const organizations = orgs.map(transformOrganization);

    return (
      <div className="p-6">
        <OrganizationsClient organizations={organizations} />
      </div>
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h2 className="text-red-800 font-medium">Error loading organizations</h2>
          <p className="text-red-600 mt-1">Please try again later.</p>
          <p className="text-red-600 mt-2 text-sm">Error details: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  } finally {
    await prisma.$disconnect();
  }
} 