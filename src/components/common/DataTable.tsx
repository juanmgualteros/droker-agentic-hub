import { useState } from 'react';
import Link from 'next/link';

interface Column {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface Action {
  label: string | ((item: any) => string);
  onClick: (item: any) => void;
  type?: 'edit' | 'delete' | 'activate' | 'deactivate';
}

interface Filter {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  actions: Action[];
  filters?: Filter[];
  title: string;
  description?: string;
  newItemPath?: string;
  newItemLabel?: string;
}

export default function DataTable({
  data,
  columns,
  actions,
  filters = [],
  title,
  description,
  newItemPath,
  newItemLabel = 'New Item'
}: DataTableProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, string>>(
    filters.reduce((acc, filter) => ({ ...acc, [filter.key]: 'all' }), {})
  );

  const filteredData = data.filter(item => {
    return filters.every(filter => {
      if (filterValues[filter.key] === 'all') return true;
      return item[filter.key] === filterValues[filter.key];
    });
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-black">{title}</h1>
          {description && <p className="text-gray-600">{description}</p>}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black rounded-md"
          >
            Filters
          </button>
          {newItemPath && (
            <Link
              href={newItemPath}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black rounded-md"
            >
              {newItemLabel}
            </Link>
          )}
        </div>
      </div>

      {showFilters && filters.length > 0 && (
        <div className="bg-white p-4 rounded-md border border-gray-200 space-y-4">
          <div className="flex items-center gap-4">
            {filters.map(filter => (
              <select
                key={filter.key}
                value={filterValues[filter.key]}
                onChange={(e) => setFilterValues({ ...filterValues, [filter.key]: e.target.value })}
                className="px-3 py-2 bg-gray-100 rounded-md text-black border-none"
              >
                <option value="all">All {filter.label}</option>
                {filter.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(column => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item, index) => (
              <tr key={item.id || index} className="border-b border-gray-200">
                {columns.map(column => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                    {column.render ? column.render(item[column.key], item) : (
                      <div className="text-sm text-gray-900">{item[column.key]}</div>
                    )}
                  </td>
                ))}
                {actions.length > 0 && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      {actions.map(action => (
                        <button
                          key={typeof action.label === 'string' ? action.label : action.label(item)}
                          onClick={() => action.onClick(item)}
                          className={`px-3 py-1 rounded-md ${
                            action.type === 'delete' 
                              ? 'text-red-600 hover:text-red-900'
                              : action.type === 'edit'
                              ? 'text-blue-600 hover:text-blue-900'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {typeof action.label === 'string' ? action.label : action.label(item)}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 