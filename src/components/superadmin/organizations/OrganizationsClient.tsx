'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/common/DataTable';
import Link from 'next/link';
import dynamic from 'next/dynamic';

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
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations || []);
  const router = useRouter();

  // Get locale from pathname
  const locale = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en';

  const handleEditClick = (org: Organization) => {
    router.push(`/${locale}/superadmin/organizations/${org.id}/edit`);
  };

  const columns: Column[] = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      filterType: 'text' as const,
      render: (value: string) => (
        <span className="font-medium text-foreground dark:text-white">{value}</span>
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
          ACTIVE: 'bg-green-50 text-green-700 border-green-100 dark:bg-green-950 dark:text-green-400 dark:border-green-900',
          PENDING: 'bg-yellow-50 text-yellow-700 border-yellow-100 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-900',
          SUSPENDED: 'bg-red-50 text-red-700 border-red-100 dark:bg-red-950 dark:text-red-400 dark:border-red-900',
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
        <span className="text-sm text-muted-foreground dark:text-white/70">
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
        <span className="text-sm text-muted-foreground dark:text-white/70">
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

  // Load diagnostics component client-side only
  const OrganizationDiagnostics = dynamic(
    () => import('@/components/superadmin/organization-diagnostics'),
    { ssr: false }
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-foreground dark:text-white">Organizations</h1>
          <p className="mt-1 text-sm text-muted-foreground dark:text-white/70">
            Configure and manage your customer organizations
          </p>
        </div>
        <Link
          href={`/${locale}/superadmin/organizations/new`}
          className="text-primary-foreground bg-primary hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
        >
          New Organization
        </Link>
      </div>
      
      <div className="bg-background dark:bg-card rounded-lg shadow-sm border border-border">
        {organizations.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8">
            <p className="text-muted-foreground dark:text-white/70 mb-4">No organizations found</p>
            <Link
              href={`/${locale}/superadmin/organizations/new`}
              className="text-primary-foreground bg-primary hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
            >
              Create your first organization
            </Link>
          </div>
        ) : (
          <DataTable
            data={organizations}
            columns={columns}
            actions={actions}
            className="min-h-[480px]"
          />
        )}
      </div>

      {/* Diagnostic component to help debug production issues */}
      <OrganizationDiagnostics />
    </div>
  );
} 