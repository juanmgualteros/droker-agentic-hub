"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

interface Organization {
  id: string;
  name: string;
  products: Product[];
  apiKeys: ApiKey[];
}

export default function EditOrganizationPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [organization, setOrganization] = useState<Organization>({
    id: params.id,
    name: "Sample Organization",
    products: [
      {
        id: "1",
        name: "Product 1",
        type: "VALUEFLOWS",
        category: "SALES",
      },
    ],
    apiKeys: [
      {
        id: "1",
        name: "API Key 1",
        type: "OPENAI",
        value: "sk-...",
      },
    ],
  });

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
    // TODO: Implement API call to update organization
    router.push(`/${locale}/superadmin/organizations`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light text-gray-900">Edit Organization</h1>
        <p className="mt-1 text-sm text-gray-500">
          Edit organization details and manage its resources
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Organization Name</Label>
              <Input
                id="name"
                value={organization.name}
                onChange={(e) => setOrganization({ ...organization, name: e.target.value })}
                placeholder="Enter organization name"
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg">
          <div className="p-6">
            <h2 className="text-lg font-light text-gray-900 mb-4">Products</h2>
            <DataTable
              data={organization.products}
              columns={productColumns}
              actions={renderProductActions}
            />
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg">
          <div className="p-6">
            <h2 className="text-lg font-light text-gray-900 mb-4">API Keys</h2>
            <DataTable
              data={organization.apiKeys}
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
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
} 