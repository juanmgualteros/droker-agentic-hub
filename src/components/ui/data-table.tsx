"use client";

import { cn } from "@/lib/utils";

interface Column<T> {
  header: string;
  accessorKey: keyof T;
  className?: string;
}

interface RowRender<T> {
  cells: {
    key: string;
    content: string;
  }[];
  actions: React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  renderRow: (item: T) => RowRender<T>;
  className?: string;
}

export function DataTable<T>({ data, columns, renderRow, className }: DataTableProps<T>) {
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
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const row = renderRow(item);
              return (
                <tr
                  key={index}
                  className="border-b bg-white transition-colors hover:bg-gray-50/50"
                >
                  {row.cells.map((cell) => (
                    <td
                      key={cell.key}
                      className="px-4 py-3 text-gray-900"
                    >
                      {cell.content}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    {row.actions}
                  </td>
                </tr>
              );
            })}
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
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