import { Suspense } from "react";
import { PrismaClient } from '@prisma/client';
import UsersClient from '@/components/superadmin/users/UsersClient';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  try {
    // Fetch users using Prisma
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        organization: true
      }
    });

    return (
      <div className="p-6">
        <UsersClient users={users} />
      </div>
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h2 className="text-red-800 font-medium">Error loading users</h2>
          <p className="text-red-600 mt-1">Please try again later.</p>
          <p className="text-red-600 mt-2 text-sm">Error details: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  } finally {
    await prisma.$disconnect();
  }
} 