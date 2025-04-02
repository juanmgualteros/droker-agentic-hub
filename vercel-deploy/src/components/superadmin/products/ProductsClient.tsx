'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/common/DataTable';

interface Organization {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  type: string;
  organization?: Organization;
}

interface ProductsClientProps {
  products: Product[];
}

export default function ProductsClient({ products: initialProducts }: ProductsClientProps) {
  const [products, setProducts] = useState(initialProducts);
  const router = useRouter();

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (value: string, product: Product) => (
        <div>
          <div className="font-comfortaa font-light text-gray-900">{value}</div>
          {product.description && (
            <div className="font-comfortaa font-light text-gray-500">{product.description}</div>
          )}
        </div>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      render: (value: number) => (
        <div className="font-comfortaa font-light text-gray-900">
          ${value.toFixed(2)}
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (value: string) => (
        <div className="font-comfortaa font-light text-gray-500">
          {value}
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      render: (value: string) => (
        <div className="font-comfortaa font-light text-gray-500">
          {value}
        </div>
      ),
    },
    {
      key: 'organization',
      header: 'Organization',
      render: (value: Organization | undefined) => (
        <div className="font-comfortaa font-light text-gray-500">
          {value?.name || 'No Organization'}
        </div>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created At',
      render: (value: Date) => (
        <div className="font-comfortaa font-light text-gray-500">
          {new Date(value).toLocaleDateString()}
        </div>
      ),
    },
  ];

  const actions = [
    {
      label: 'Edit',
      onClick: (product: Product) => router.push(`/superadmin/products/${product.id}/edit`),
      type: 'edit' as const,
    },
    {
      label: 'Delete',
      onClick: (product: Product) => deleteProduct(product.id),
      type: 'delete' as const,
    },
  ];

  const filters = [
    {
      key: 'category',
      label: 'Category',
      options: [
        { value: 'SALES', label: 'Sales' },
        { value: 'ONBOARDING', label: 'Onboarding' },
        { value: 'COLLECTIONS', label: 'Collections' },
        { value: 'OPERATIONS', label: 'Operations' },
        { value: 'NEGOTIATION', label: 'Negotiation' },
        { value: 'EXPERT_SALES', label: 'Expert Sales' },
      ],
    },
    {
      key: 'type',
      label: 'Type',
      options: [
        { value: 'VALUEFLOWS', label: 'Value Flows' },
        { value: 'TEAM_OF_EXPERTS', label: 'Team of Experts' },
      ],
    },
  ];

  async function deleteProduct(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setProducts(products.filter(product => product.id !== id));
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <DataTable
        data={products}
        columns={columns}
        actions={actions}
        filters={filters}
        title="Products Management"
        description="Create and manage products for organizations"
        newItemPath="/superadmin/products/new"
        newItemLabel="New Product"
      />
    </div>
  );
} 