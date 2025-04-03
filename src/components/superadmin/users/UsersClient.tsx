'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/common/DataTable';

interface Organization {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  state?: string;
  subscriptionId?: string | null;
}

interface AdminUser {
  id: string;
  name: string | null;
  email: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  organization?: Organization;
}

interface UsersClientProps {
  users: AdminUser[];
}

export default function UsersClient({ users: initialUsers }: UsersClientProps) {
  const [users, setUsers] = useState(initialUsers);
  const router = useRouter();

  async function deleteUser(id: string) {
    if (!confirm('Are you sure you want to delete this admin user?')) {
      return;
    }

    const response = await fetch(`/api/admin-users/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setUsers(users.filter(user => user.id !== id));
    }
  }

  const columns = [
    {
      key: 'name',
      header: 'Name/Email',
      render: (value: string | null, user: AdminUser) => (
        <div>
          <div className="text-sm font-medium text-foreground dark:text-white">{value || 'No Name'}</div>
          <div className="text-sm text-muted-foreground dark:text-white/70">{user.email}</div>
        </div>
      ),
    },
    {
      key: 'organization',
      header: 'Organization',
      render: (value: Organization | undefined) => (
        <div className="text-sm text-muted-foreground dark:text-white/70">
          {value?.name || 'No Organization'}
        </div>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created At',
      render: (value: Date) => (
        <div className="text-sm text-muted-foreground dark:text-white/70">
          {new Date(value).toLocaleDateString()}
        </div>
      ),
    },
  ];

  const actions = [
    {
      label: 'Edit',
      onClick: (user: AdminUser) => router.push(`/superadmin/users/${user.id}/edit`),
      type: 'edit' as const,
    },
    {
      label: 'Delete',
      onClick: (user: AdminUser) => deleteUser(user.id),
      type: 'delete' as const,
    },
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      actions={actions}
      title="Admin Users Management"
      description="Create and manage admin users for organizations"
      newItemPath="/superadmin/users/new"
      newItemLabel="New Admin User"
    />
  );
} 