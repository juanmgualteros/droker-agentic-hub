'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/common/DataTable';
import { Users } from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  type: 'OPENAI' | 'SUPABASE';
  openai_key?: string;
  supabase_key?: string;
  created_at: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface Organization {
  id: string;
  name: string;
  state: 'ACTIVE' | 'PENDING' | 'SUSPENDED';
  subscription_id: string;
  created_at: string;
  apiKeys: ApiKey[];
  users: User[];
}

interface OrganizationsClientProps {
  organizations: Organization[];
}

export default function OrganizationsClient({ organizations: initialOrganizations }: OrganizationsClientProps) {
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations);
  const router = useRouter();

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (value: string) => (
        <span className="font-comfortaa font-light text-gray-900">{value}</span>
      ),
    },
    {
      key: 'state',
      header: 'State',
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-comfortaa font-light ${
          value === 'ACTIVE'
            ? 'bg-green-100 text-green-800'
            : value === 'PENDING'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'users',
      header: 'Users',
      render: (value: User[]) => (
        <div className="flex items-center font-comfortaa font-light text-gray-500">
          <Users className="h-4 w-4 mr-1.5" />
          {value?.length || 0} users
        </div>
      ),
    },
    {
      key: 'apiKeys',
      header: 'API Keys',
      render: (value: ApiKey[]) => (
        <div className="font-comfortaa font-light text-gray-500">
          {value.filter(key => key.type === 'OPENAI').length} OpenAI,{' '}
          {value.filter(key => key.type === 'SUPABASE').length} Supabase
        </div>
      ),
    },
    {
      key: 'created_at',
      header: 'Created At',
      render: (value: string) => (
        <span className="font-comfortaa font-light text-gray-500">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const actions = [
    {
      label: 'Edit',
      onClick: (org: Organization) => router.push(`/organizations/${org.id}/edit`),
      type: 'edit' as const,
    },
    {
      label: 'Manage Users',
      onClick: (org: Organization) => router.push(`/organizations/${org.id}/users`),
      type: 'edit' as const,
    },
    {
      label: (org: Organization) => org.state === 'ACTIVE' ? 'Deactivate' : 'Activate',
      onClick: toggleOrganizationState,
      type: 'activate' as const,
    },
    {
      label: 'Delete',
      onClick: (org: Organization) => deleteOrganization(org.id),
      type: 'delete' as const,
    },
  ];

  const filters = [
    {
      key: 'state',
      label: 'State',
      options: [
        { value: 'ACTIVE', label: 'Active' },
        { value: 'PENDING', label: 'Pending' },
        { value: 'SUSPENDED', label: 'Suspended' },
      ],
    },
  ];

  async function deleteOrganization(id: string) {
    if (!confirm('Are you sure you want to delete this organization? This action cannot be undone.')) {
      return;
    }

    const response = await fetch(`/api/organizations/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setOrganizations(organizations.filter(org => org.id !== id));
    }
  }

  async function toggleOrganizationState(org: Organization) {
    const newState = org.state === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    
    const response = await fetch(`/api/organizations/${org.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state: newState }),
    });

    if (response.ok) {
      setOrganizations(organizations.map(o => 
        o.id === org.id ? { ...o, state: newState } : o
      ));
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <DataTable
        data={organizations}
        columns={columns}
        actions={actions}
        filters={filters}
        title="Organizations"
        description="Manage your customer organizations and their configurations"
        newItemPath="/organizations/new"
        newItemLabel="New Organization"
      />
    </div>
  );
} 