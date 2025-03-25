'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/common/DataTable';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';

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

interface Column {
  key: string;
  header: string;
  render?: (value: any) => React.ReactNode;
  sortable?: boolean;
  filterType?: 'text' | 'select';
  filterOptions?: { label: string; value: string }[];
}

interface OrganizationsClientProps {
  organizations: Organization[];
}

export default function OrganizationsClient({ organizations: initialOrganizations }: OrganizationsClientProps) {
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations);
  const router = useRouter();
  const { isSignedIn } = useAuth();

  // Get locale from pathname
  const locale = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en';

  const handleEditClick = (org: Organization) => {
    if (!isSignedIn) {
      router.push(`/${locale}/sign-in`);
      return;
    }
    router.push(`/${locale}/superadmin/organizations/${org.id}/edit`);
  };

  const columns: Column[] = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      filterType: 'text' as const,
      render: (value: string) => (
        <span className="font-medium text-gray-900">{value}</span>
      ),
    },
    {
      key: 'state',
      header: 'State',
      sortable: true,
      filterType: 'select' as const,
      filterOptions: [
        { value: 'ACTIVE', label: 'Active' },
        { value: 'PENDING', label: 'Pending' },
        { value: 'SUSPENDED', label: 'Suspended' },
      ],
      render: (value: string) => {
        const stateStyles = {
          ACTIVE: 'bg-green-50 text-green-700 border-green-100',
          PENDING: 'bg-yellow-50 text-yellow-700 border-yellow-100',
          SUSPENDED: 'bg-red-50 text-red-700 border-red-100',
        };
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stateStyles[value as keyof typeof stateStyles]}`}>
            {value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}
          </span>
        );
      },
    },
    {
      key: 'users',
      header: 'Users',
      sortable: true,
      filterType: 'text' as const,
      render: (value: User[]) => (
        <span className="text-sm text-gray-500">
          {value?.length || 0}
        </span>
      ),
    },
    {
      key: 'apiKeys',
      header: 'API Keys',
      sortable: true,
      filterType: 'text' as const,
      render: (value: ApiKey[]) => (
        <span className="text-sm text-gray-500">
          {value.filter(key => key.type === 'OPENAI').length + value.filter(key => key.type === 'SUPABASE').length}
        </span>
      ),
    }
  ];

  const actions = [
    {
      label: 'Configure',
      onClick: handleEditClick,
      type: 'edit' as const,
    }
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-gray-900">Organizations</h1>
          <p className="mt-1 text-sm text-gray-500">
            Configure and manage your customer organizations
          </p>
        </div>
        <Link
          href={`/${locale}/superadmin/organizations/new`}
          className="text-white bg-black hover:bg-gray-800 px-4 py-2 rounded-md text-sm font-medium"
        >
          New Organization
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <DataTable
          data={organizations}
          columns={columns}
          actions={actions}
          className="min-h-[480px]"
        />
      </div>
    </div>
  );
} 