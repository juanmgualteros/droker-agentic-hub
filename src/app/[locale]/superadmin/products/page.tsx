"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  createdAt: string;
}

const columns = [
  {
    header: "Name",
    accessorKey: "name" as keyof Product,
  },
  {
    header: "Description",
    accessorKey: "description" as keyof Product,
  },
  {
    header: "Price",
    accessorKey: "price" as keyof Product,
  },
  {
    header: "Created At",
    accessorKey: "createdAt" as keyof Product,
  },
];

export default function ProductsPage() {
  const products: Product[] = [
    {
      id: "1",
      name: "Product 1",
      description: "Description for product 1",
      price: "$99.99",
      createdAt: "2024-03-20",
    },
    {
      id: "2",
      name: "Product 2",
      description: "Description for product 2",
      price: "$149.99",
      createdAt: "2024-03-19",
    },
  ];

  const renderRow = (product: Product) => {
    const cells = columns.map(column => ({
      key: String(column.accessorKey),
      content: String(product[column.accessorKey]),
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
              href={`/superadmin/products/${product.id}/edit`}
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
        <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
        <p className="text-sm text-gray-500">
          Manage products in your system
        </p>
      </div>
      <div className="flex justify-end">
        <Link href="/superadmin/products/new">
          <Button>New Product</Button>
        </Link>
      </div>
      <DataTable
        data={products}
        columns={columns}
        renderRow={renderRow}
      />
    </div>
  );
} 