"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/components/ui/data-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Plus } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  type: string;
  category: string;
}

interface ApiKey {
  id: string;
  name: string;
  type: string;
  value: string;
}

export default function NewOrganizationPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get locale from pathname
  const locale = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en';

  const productColumns = [
    {
      header: "NAME",
      accessorKey: "name" as keyof Product,
    },
    {
      header: "TYPE",
      accessorKey: "type" as keyof Product,
    },
    {
      header: "CATEGORY",
      accessorKey: "category" as keyof Product,
    },
  ];

  const apiKeyColumns = [
    {
      header: "NAME",
      accessorKey: "name" as keyof ApiKey,
    },
    {
      header: "TYPE",
      accessorKey: "type" as keyof ApiKey,
    },
    {
      header: "VALUE",
      accessorKey: "value" as keyof ApiKey,
      cell: (value: string) => value.substring(0, 8) + "...",
    },
  ];

  const renderProductActions = (product: Product) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const renderApiKeyActions = (apiKey: ApiKey) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/organizations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          products,
          apiKeys,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create organization');
      }

      toast.success('Organization created successfully');
      router.push(`/${locale}/superadmin/organizations`);
      router.refresh();
    } catch (error) {
      console.error('Error creating organization:', error);
      toast.error('Failed to create organization');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light text-gray-900">New Organization</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create a new organization and configure its resources
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Organization Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter organization name"
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-light text-gray-900">Products</h3>
                <p className="text-sm text-gray-500">
                  Configure which products are available for this organization
                </p>
              </div>
              <Button type="button" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>

            <DataTable
              data={products}
              columns={productColumns}
              actions={renderProductActions}
            />
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-light text-gray-900">API Keys</h3>
                <p className="text-sm text-gray-500">
                  Configure API keys for this organization
                </p>
              </div>
              <Button type="button" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add API Key
              </Button>
            </div>

            <DataTable
              data={apiKeys}
              columns={apiKeyColumns}
              actions={renderApiKeyActions}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/${locale}/superadmin/organizations`)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Organization'}
          </Button>
        </div>
      </form>
    </div>
  );
} 