'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/common/DataTable';
import { ApiKey, ApiKeyType } from '@/types/api-key';

interface Organization {
  id: string;
  name: string;
}

interface ApiKeysClientProps {
  apiKeys: ApiKey[];
}

export default function ApiKeysClient({ apiKeys: initialApiKeys }: ApiKeysClientProps) {
  const [apiKeys, setApiKeys] = useState(initialApiKeys);
  const router = useRouter();

  async function deleteApiKey(id: string) {
    if (!confirm('Are you sure you want to delete this API key?')) {
      return;
    }

    const response = await fetch(`/api/api-keys/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setApiKeys(apiKeys.filter(key => key.id !== id));
    }
  }

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (value: string) => (
        <div className="text-sm font-medium text-gray-900">{value}</div>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      render: (value: ApiKeyType) => {
        let bgColor = 'bg-gray-100 text-gray-800';
        if (value === 'OPENAI') bgColor = 'bg-green-100 text-green-800';
        else if (value === 'SUPABASE') bgColor = 'bg-blue-100 text-blue-800';
        
        return (
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor}`}>
            {value}
          </span>
        );
      },
    },
    {
      key: 'value',
      header: 'Value',
      render: (value: string) => (
        <div className="text-sm text-gray-500">
          {value.slice(0, 8)}...{value.slice(-8)}
        </div>
      ),
    },
    {
      key: 'organization',
      header: 'Organization',
      render: (value: Organization | undefined) => (
        <div className="text-sm text-gray-500">
          {value?.name || 'No Organization'}
        </div>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created At',
      render: (value: Date) => (
        <div className="text-sm text-gray-500">
          {new Date(value).toLocaleDateString()}
        </div>
      ),
    },
  ];

  const actions = [
    {
      label: 'Edit',
      onClick: (key: ApiKey) => router.push(`/superadmin/api-keys/${key.id}/edit`),
      type: 'edit' as const,
    },
    {
      label: 'Delete',
      onClick: (key: ApiKey) => deleteApiKey(key.id),
      type: 'delete' as const,
    },
  ];

  const filters = [
    {
      key: 'type',
      label: 'Type',
      options: [
        { value: 'OPENAI', label: 'OpenAI' },
        { value: 'SUPABASE', label: 'Supabase' },
        { value: 'OTHER', label: 'Other' },
      ],
    },
  ];

  return (
    <DataTable
      data={apiKeys}
      columns={columns}
      actions={actions}
      filters={filters}
      title="API Keys Management"
      description="Create and manage API keys for organizations"
      newItemPath="/superadmin/api-keys/new"
      newItemLabel="New API Key"
    />
  );
} 