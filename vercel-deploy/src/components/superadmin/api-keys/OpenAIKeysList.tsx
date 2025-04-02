'use client';

import { useState, useEffect } from 'react';

interface OpenAIKey {
  id: string;
  name: string;
  value: string;
  type: 'OPENAI' | 'SUPABASE';
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export default function OpenAIKeysList() {
  const [keys, setKeys] = useState<OpenAIKey[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingKey, setEditingKey] = useState<OpenAIKey | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    value: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchKeys() {
      try {
        const response = await fetch('/api/api-keys');
        if (!response.ok) throw new Error('Failed to fetch API keys');
        const data = await response.json();
        setKeys(data.filter((key: OpenAIKey) => key.type === 'OPENAI'));
      } catch (error) {
        console.error('Error fetching API keys:', error);
      }
    }

    fetchKeys();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/api-keys', {
        method: editingKey ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          id: editingKey?.id,
          type: 'OPENAI',
        }),
      });
      
      if (!response.ok) throw new Error('Failed to save API key');
      
      const newKey = await response.json();
      if (editingKey) {
        setKeys(keys.map(key => key.id === editingKey.id ? newKey : key));
      } else {
        setKeys([...keys, newKey]);
      }
      
      setShowForm(false);
      setEditingKey(null);
      setFormData({ name: '', value: '' });
    } catch (error) {
      console.error('Error saving API key:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (key: OpenAIKey) => {
    setEditingKey(key);
    setFormData({
      name: key.name,
      value: key.value,
    });
    setShowForm(true);
  };

  const handleStatusChange = async (id: string, newStatus: 'ACTIVE' | 'INACTIVE') => {
    try {
      const response = await fetch(`/api/api-keys/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) throw new Error('Failed to update status');
      
      const updatedKey = await response.json();
      setKeys(keys.map(key => key.id === id ? updatedKey : key));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this API key?')) return;
    
    try {
      const response = await fetch(`/api/api-keys/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete API key');
      
      setKeys(keys.filter(key => key.id !== id));
    } catch (error) {
      console.error('Error deleting API key:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">OpenAI API Keys</h2>
        <button
          onClick={() => {
            setEditingKey(null);
            setFormData({ name: '', value: '' });
            setShowForm(true);
          }}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Add New Key
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="value" className="block text-sm font-medium text-gray-700">
              API Key
            </label>
            <input
              type="text"
              id="value"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingKey(null);
                setFormData({ name: '', value: '' });
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : editingKey ? 'Update Key' : 'Add Key'}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {keys.map((key) => (
              <tr key={key.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {key.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      key.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {key.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <button
                    onClick={() => handleEdit(key)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleStatusChange(key.id, key.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE')}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    {key.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDelete(key.id)}
                    className="text-red-600 hover:text-red-900"
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