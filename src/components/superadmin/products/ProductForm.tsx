'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type ProductType = 'VALUEFLOWS' | 'EXPERTS';
type ProductCategory = 
  | 'SALES' | 'ONBOARDING' | 'COLLECTIONS'  // Valueflows categories
  | 'MARKETING' | 'LEGAL' | 'PEOPLE'; // Experts categories

interface Product {
  id?: string;
  name: string;
  type: ProductType;
  category: ProductCategory;
  status: 'ACTIVE' | 'INACTIVE';
}

interface ProductFormProps {
  product?: Product;
  mode: 'create' | 'edit';
}

export default function ProductForm({ product, mode }: ProductFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Product>({
    name: product?.name || '',
    type: product?.type || 'VALUEFLOWS',
    category: product?.category || 'SALES',
    status: product?.status || 'INACTIVE',
  });
  const [loading, setLoading] = useState(false);

  // Get available categories based on selected type
  const getAvailableCategories = (type: ProductType): ProductCategory[] => {
    if (type === 'VALUEFLOWS') {
      return ['SALES', 'ONBOARDING', 'COLLECTIONS'];
    } else {
      return ['MARKETING', 'LEGAL', 'PEOPLE'];
    }
  };

  // Update category when type changes
  useEffect(() => {
    const availableCategories = getAvailableCategories(formData.type);
    if (!availableCategories.includes(formData.category)) {
      setFormData(prev => ({
        ...prev,
        category: availableCategories[0]
      }));
    }
  }, [formData.type]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/products${mode === 'edit' ? `/${product?.id}` : ''}`, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/superadmin/products');
        router.refresh();
      } else {
        throw new Error('Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const formatCategoryLabel = (category: string) => {
    return category.charAt(0) + category.slice(1).toLowerCase();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-foreground dark:text-white">
          Type
        </label>
        <select
          id="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as ProductType })}
          className="mt-1 block w-full rounded-md border-border shadow-sm text-foreground dark:text-white focus:border-primary focus:ring-primary sm:text-sm bg-background dark:bg-card"
        >
          <option value="VALUEFLOWS">Value Flows</option>
          <option value="EXPERTS">Experts</option>
        </select>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-foreground dark:text-white">
          Category
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
          className="mt-1 block w-full rounded-md border-border shadow-sm text-foreground dark:text-white focus:border-primary focus:ring-primary sm:text-sm bg-background dark:bg-card"
        >
          {getAvailableCategories(formData.type).map((category) => (
            <option key={category} value={category}>
              {formatCategoryLabel(category)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground dark:text-white">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-border shadow-sm text-foreground dark:text-white focus:border-primary focus:ring-primary sm:text-sm bg-background dark:bg-card"
          required
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-foreground dark:text-white">
          Status
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as 'ACTIVE' | 'INACTIVE' })}
          className="mt-1 block w-full rounded-md border-border shadow-sm text-foreground dark:text-white focus:border-primary focus:ring-primary sm:text-sm bg-background dark:bg-card"
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-foreground dark:text-white bg-background dark:bg-card border border-border rounded-md shadow-sm hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          {loading ? 'Saving...' : mode === 'create' ? 'Create Product' : 'Update Product'}
        </button>
      </div>
    </form>
  );
} 