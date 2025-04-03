'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SupabaseKey {
  id: string;
  name: string;
  value: string;
  type: 'OPENAI' | 'SUPABASE';
  projectUrl: string;
  secret: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export default function SupabaseKeysList() {
  const router = useRouter();
  const [keys, setKeys] = useState<SupabaseKey[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    projectUrl: '',
    secret: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchKeys() {
      try {
        const response = await fetch('/api/api-keys');
        if (response.ok) {
          const data = await response.json();
          setKeys(data.filter((key: SupabaseKey) => key.type === 'SUPABASE'));
        } else {
          throw new Error('Failed to fetch API keys');
        }
      } catch (error) {
        console.error('Error fetching API keys:', error);
        alert('Failed to fetch API keys. Please try again.');
      }
    }

    fetchKeys();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'SUPABASE',
        }),
      });

      if (response.ok) {
        setShowCreateForm(false);
        setFormData({ name: '', value: '', projectUrl: '', secret: '' });
        router.refresh();
      } else {
        throw new Error('Failed to create API key');
      }
    } catch (error) {
      console.error('Error creating API key:', error);
      alert('Failed to create API key. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: string, newStatus: 'ACTIVE' | 'INACTIVE') {
    try {
      const response = await fetch(`/api/api-keys/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        throw new Error('Failed to update API key status');
      }
    } catch (error) {
      console.error('Error updating API key status:', error);
      alert('Failed to update API key status. Please try again.');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this API key?')) {
      return;
    }

    try {
      const response = await fetch(`/api/api-keys/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
      } else {
        throw new Error('Failed to delete API key');
      }
    } catch (error) {
      console.error('Error deleting API key:', error);
      alert('Failed to delete API key. Please try again.');
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-foreground dark:text-white">Supabase API Keys</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90"
        >
          Add New Key
        </button>
      </div>

      {showCreateForm && (
        <div className="mb-6 p-4 border border-border rounded-md bg-muted dark:bg-muted/50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground dark:text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-background dark:bg-card text-foreground dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="projectUrl" className="block text-sm font-medium text-foreground dark:text-white">
                Project URL
              </label>
              <input
                type="url"
                id="projectUrl"
                value={formData.projectUrl}
                onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                className="mt-1 block w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-background dark:bg-card text-foreground dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="value" className="block text-sm font-medium text-foreground dark:text-white">
                API Key
              </label>
              <input
                type="text"
                id="value"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="mt-1 block w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-background dark:bg-card text-foreground dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="secret" className="block text-sm font-medium text-foreground dark:text-white">
                Secret
              </label>
              <input
                type="password"
                id="secret"
                value={formData.secret}
                onChange={(e) => setFormData({ ...formData, secret: e.target.value })}
                className="mt-1 block w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-background dark:bg-card text-foreground dark:text-white"
                required
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 text-sm font-medium text-foreground dark:text-white bg-background dark:bg-card border border-border rounded-md hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Key'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-background dark:bg-card rounded-lg border border-border overflow-hidden">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted dark:bg-muted/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground dark:text-white/70 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground dark:text-white/70 uppercase tracking-wider">
                Project URL
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground dark:text-white/70 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-background dark:bg-card divide-y divide-border">
            {keys.map((key) => (
              <tr key={key.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground dark:text-white">
                  {key.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground dark:text-white/70">
                  {key.projectUrl}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      key.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {key.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleStatusChange(key.id, key.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE')}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                  >
                    {key.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDelete(key.id)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 