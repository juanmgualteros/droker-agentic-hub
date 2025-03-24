"use client";

import { cn } from "@/lib/utils";

interface Column<T> {
  header: string;
  accessorKey: keyof T;
  className?: string;
  cell?: (value: any) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: ((item: T) => React.ReactNode) | React.ReactNode;
  className?: string;
}

export function DataTable<T>({ data, columns, actions, className }: DataTableProps<T>) {
  return (
    <div className={cn("rounded-md border", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50/50">
              {columns.map((column) => (
                <th
                  key={String(column.accessorKey)}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500",
                    column.className
                  )}
                >
                  {column.header}
                </th>
              ))}
              {actions && (
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                  ACTIONS
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b bg-white transition-colors hover:bg-gray-50/50"
              >
                {columns.map((column) => (
                  <td
                    key={String(column.accessorKey)}
                    className="px-4 py-3 text-gray-900"
                  >
                    {column.cell 
                      ? column.cell(item[column.accessorKey])
                      : String(item[column.accessorKey])
                    }
                  </td>
                ))}
                {actions && (
                  <td className="px-4 py-3 text-right">
                    {typeof actions === 'function' ? actions(item) : actions}
                  </td>
                )}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-4 py-3 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 