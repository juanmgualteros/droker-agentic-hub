"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal } from "lucide-react";
import Link from "next/link";

interface Organization {
  id: string;
  name: string;
  state: string;
  createdAt: string;
}

const columns = [
  {
    header: "Name",
    accessorKey: "name" as keyof Organization,
  },
  {
    header: "State",
    accessorKey: "state" as keyof Organization,
    className: "capitalize",
  },
  {
    header: "Created At",
    accessorKey: "createdAt" as keyof Organization,
  },
];

export default function OrganizationsPage() {
  const organizations: Organization[] = [
    {
      id: "1",
      name: "Organization 1",
      state: "active",
      createdAt: "2024-03-20",
    },
    {
      id: "2",
      name: "Organization 2",
      state: "inactive",
      createdAt: "2024-03-19",
    },
  ];

  const renderRow = (organization: Organization) => {
    const cells = columns.map(column => ({
      key: String(column.accessorKey),
      content: String(organization[column.accessorKey]),
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
              href={`/superadmin/organizations/${organization.id}/edit`}
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
        <h1 className="text-2xl font-semibold tracking-tight">Organizations</h1>
        <p className="text-sm text-gray-500">
          Manage organizations in your system
        </p>
      </div>
      <div className="flex justify-end">
        <Link href="/superadmin/organizations/new">
          <Button>New Organization</Button>
        </Link>
      </div>
      <DataTable
        data={organizations}
        columns={columns}
        renderRow={renderRow}
      />
    </div>
  );
} 