import { PrismaClient } from '@prisma/client';
import UsersClient from '@/components/superadmin/users/UsersClient';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export default async function AdminUsersPage() {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: 'ADMIN',
      },
      include: {
        organization: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return (
      <div className="p-6">
        <UsersClient users={users} />
      </div>
    );
  } catch (error) {
    console.error('Error loading admin users:', error);
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h2 className="text-red-800 font-medium">Error loading admin users</h2>
          <p className="text-red-600 mt-1">Please try again later.</p>
          <p className="text-red-600 mt-2 text-sm">Error details: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  } finally {
    await prisma.$disconnect();
  }
} 