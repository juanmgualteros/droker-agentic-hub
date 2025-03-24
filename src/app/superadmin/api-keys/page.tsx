import { PrismaClient } from '@prisma/client';
import ApiKeysClient from '@/components/superadmin/api-keys/ApiKeysClient';
import { ApiKey } from '@/types/api-key';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export default async function ApiKeysPage() {
  try {
    const apiKeys = await prisma.apiKey.findMany({
      include: {
        organization: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    }) as unknown as ApiKey[];

    return (
      <div className="p-6">
        <ApiKeysClient apiKeys={apiKeys} />
      </div>
    );
  } catch (error) {
    console.error('Error loading API keys:', error);
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h2 className="text-red-800 font-medium">Error loading API keys</h2>
          <p className="text-red-600 mt-1">Please try again later.</p>
          <p className="text-red-600 mt-2 text-sm">Error details: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  } finally {
    await prisma.$disconnect();
  }
} 