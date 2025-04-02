import { prisma } from '@/lib/prisma';
import { DataTable } from '@/components/common/DataTable';
import { UserPlus } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

async function getOrganizationUsers(organizationId: string) {
  const users = await prisma.user.findMany({
    where: {
      organizationId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return users;
}

export default async function OrganizationUsersPage({ params }: { params: { id: string } }) {
  const users = await getOrganizationUsers(params.id);

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (value: string) => (
        <span className="text-gray-900">{value}</span>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      render: (value: string) => (
        <span className="text-gray-600">{value}</span>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (value: string) => (
        <span className="text-gray-600">{value}</span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created At',
      render: (value: Date) => (
        <span className="text-gray-600">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const actions = [
    {
      label: 'Edit',
      onClick: (user: User) => {
        // Will be implemented later
        console.log('Edit user:', user);
      },
      type: 'edit' as const,
    },
    {
      label: 'Delete',
      onClick: async (user: User) => {
        if (!confirm('Are you sure you want to delete this user?')) {
          return;
        }

        await fetch(`/api/organizations/${params.id}/users/${user.id}`, {
          method: 'DELETE',
        });
      },
      type: 'delete' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        data={users}
        columns={columns}
        actions={actions}
        title="Organization Users"
        description="Manage users in this organization"
        newItemPath={`/superadmin/organizations/${params.id}/admins/new`}
        newItemLabel="Create Admin"
      />
    </div>
  );
} 