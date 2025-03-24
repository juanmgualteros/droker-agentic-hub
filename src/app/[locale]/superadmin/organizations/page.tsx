"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Package, Key } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Organization {
  id: string;
  name: string;
  state: string;
  createdAt: string;
}

const organizations: Organization[] = [
  {
    id: "1",
    name: "Acme Corp",
    state: "ACTIVE",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Globex Corp",
    state: "ACTIVE",
    createdAt: "2024-01-02",
  },
];

export default function OrganizationsPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<"products" | "api-keys" | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

  const columns = [
    {
      header: "NAME",
      accessorKey: "name" as keyof Organization,
    },
    {
      header: "STATE",
      accessorKey: "state" as keyof Organization,
    },
    {
      header: "CREATED AT",
      accessorKey: "createdAt" as keyof Organization,
      cell: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  const renderActions = (organization: Organization) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push(`/${locale}/superadmin/organizations/${organization.id}/edit`)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          setSelectedOrg(organization);
          setSelectedTab("products");
        }}>
          <Package className="mr-2 h-4 w-4" />
          View Products
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          setSelectedOrg(organization);
          setSelectedTab("api-keys");
        }}>
          <Key className="mr-2 h-4 w-4" />
          View API Keys
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Get locale from pathname
  const locale = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-light text-gray-900">Organizations</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your customer organizations and their configurations
          </p>
        </div>
        <Link href={`/${locale}/superadmin/organizations/new`}>
          <Button>New Organization</Button>
        </Link>
      </div>

      {selectedTab && selectedOrg ? (
        <div>
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedTab(null);
                setSelectedOrg(null);
              }}
            >
              Back to Organizations
            </Button>
          </div>

          {selectedTab === "products" ? (
            <div className="bg-white shadow-sm rounded-lg">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-light text-gray-900">Products</h3>
                  <Button>Add Product</Button>
                </div>
                <DataTable
                  data={[]}
                  columns={[
                    { header: "NAME", accessorKey: "name" },
                    { header: "TYPE", accessorKey: "type" },
                  ]}
                />
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-sm rounded-lg">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-light text-gray-900">API Keys</h3>
                  <Button>Add API Key</Button>
                </div>
                <DataTable
                  data={[]}
                  columns={[
                    { header: "NAME", accessorKey: "name" },
                    { header: "TYPE", accessorKey: "type" },
                  ]}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg">
          <div className="p-6">
            <DataTable
              data={organizations}
              columns={columns}
              actions={renderActions}
            />
          </div>
        </div>
      )}
    </div>
  );
} 