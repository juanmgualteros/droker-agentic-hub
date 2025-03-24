"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal } from "lucide-react";
import Link from "next/link";

interface ApiKey {
  id: string;
  name: string;
  type: string;
  value: string;
  organization: string;
  createdAt: string;
}

const columns = [
  {
    header: "Name",
    accessorKey: "name" as keyof ApiKey,
  },
  {
    header: "Type",
    accessorKey: "type" as keyof ApiKey,
    className: "capitalize",
  },
  {
    header: "Value",
    accessorKey: "value" as keyof ApiKey,
    className: "font-mono",
  },
  {
    header: "Organization",
    accessorKey: "organization" as keyof ApiKey,
    className: "capitalize",
  },
  {
    header: "Created At",
    accessorKey: "createdAt" as keyof ApiKey,
  },
];

export default function ApiKeysPage() {
  const apiKeys: ApiKey[] = [
    {
      id: "1",
      name: "Production API Key",
      type: "openai",
      value: "sk-...abc123",
      organization: "Organization 1",
      createdAt: "2024-03-20",
    },
    {
      id: "2",
      name: "Development API Key",
      type: "supabase",
      value: "sb-...xyz789",
      organization: "Organization 2",
      createdAt: "2024-03-19",
    },
  ];

  const renderRow = (apiKey: ApiKey) => {
    const cells = columns.map(column => ({
      key: String(column.accessorKey),
      content: String(apiKey[column.accessorKey]),
    }));

    const actions = (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link
              href={`/superadmin/api-keys/${apiKey.id}/edit`}
              className="flex items-center"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    return { cells, actions };
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">API Keys</h1>
        <p className="text-sm text-gray-500">
          Manage API keys for your organizations
        </p>
      </div>
      <div className="flex justify-end">
        <Link href="/superadmin/api-keys/new">
          <Button>New API Key</Button>
        </Link>
      </div>
      <DataTable
        data={apiKeys}
        columns={columns}
        renderRow={renderRow}
      />
    </div>
  );
} 