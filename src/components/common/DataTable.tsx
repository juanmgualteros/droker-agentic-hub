'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface Column {
  key: string;
  header: string;
  render?: (value: any, item: any) => React.ReactNode;
  sortable?: boolean;
  filterType?: 'text' | 'select';
  filterOptions?: { label: string; value: string }[];
}

interface Action {
  label: string | ((item: any) => string);
  onClick: (item: any) => void;
  type?: 'edit' | 'delete' | 'default';
}

interface Filter {
  key: string;
  label: string;
  options: { label: string; value: string }[];
}

interface DataTableProps {
  title?: string;
  description?: string;
  columns: Column[];
  data: any[];
  actions?: Action[];
  filters?: Filter[];
  newItemPath?: string;
  newItemLabel?: string;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onExport?: () => void;
  onImport?: () => void;
  className?: string;
}

export function DataTable({
  title,
  description,
  columns,
  data,
  actions = [],
  filters = [],
  newItemPath,
  newItemLabel = 'New Item',
  onEdit,
  onDelete,
  onExport,
  onImport,
  className,
}: DataTableProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [columnFilters, setColumnFilters] = useState<Record<string, string[]>>({});

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (columnKey: string, value: string) => {
    setColumnFilters(prev => {
      const currentFilters = prev[columnKey] || [];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter(v => v !== value)
        : [...currentFilters, value];
      
      return {
        ...prev,
        [columnKey]: newFilters
      };
    });
  };

  const handleTextFilterChange = (columnKey: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [columnKey]: value ? [value] : []
    }));
  };

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Apply column filters
    Object.entries(columnFilters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        const column = columns.find(col => col.key === key);
        if (column?.filterType === 'select') {
          result = result.filter(item => values.includes(String(item[key])));
        } else {
          // Text filter
          const searchValue = values[0]?.toLowerCase();
          if (searchValue) {
            result = result.filter(item => 
              String(item[key]).toLowerCase().includes(searchValue)
            );
          }
        }
      }
    });

    // Apply search term
    if (searchTerm) {
      result = result.filter(item =>
        columns.some(column =>
          String(item[column.key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue === bValue) return 0;
        
        const comparison = aValue < bValue ? -1 : 1;
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [data, searchTerm, sortConfig, columnFilters, columns]);

  return (
    <div className={cn("space-y-4", className)}>
      {(title || description || newItemPath) && (
        <div className="flex items-center justify-between">
          {(title || description) && (
            <div>
              {title && <h1 className="text-2xl font-light text-gray-900">{title}</h1>}
              {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
            </div>
          )}
          <div className="flex items-center space-x-4">
            {filters.length > 0 && (
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Filters
              </button>
            )}
            {newItemPath && (
              <Link
                href={newItemPath}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                {newItemLabel}
              </Link>
            )}
          </div>
        </div>
      )}

      {showFilters && filters.length > 0 && (
        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex gap-4">
              {filters.map((filter) => (
                <select
                  key={filter.key}
                  value={filterValues[filter.key] || 'all'}
                  onChange={(e) => setFilterValues({ ...filterValues, [filter.key]: e.target.value })}
                  className="block w-40 pl-3 pr-10 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">{filter.label}: All</option>
                  {filter.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <span>{column.header}</span>
                        <div className="flex items-center space-x-1">
                          {column.sortable && (
                            <button
                              onClick={() => handleSort(column.key)}
                              className={cn(
                                "transition-colors",
                                sortConfig?.key === column.key
                                  ? "text-[hsl(215_100%_50%)]"
                                  : "text-gray-400 hover:text-gray-600"
                              )}
                            >
                              {sortConfig?.key === column.key ? (
                                sortConfig.direction === 'asc' ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )
                              ) : (
                                <div className="flex flex-col">
                                  <ChevronUp className="h-2 w-2" />
                                  <ChevronDown className="h-2 w-2" />
                                </div>
                              )}
                            </button>
                          )}
                          <Popover>
                            <PopoverTrigger asChild>
                              <button 
                                className={cn(
                                  "transition-colors",
                                  columnFilters[column.key]?.length
                                    ? "text-[hsl(215_100%_50%)]"
                                    : "text-gray-400 hover:text-gray-600"
                                )}
                              >
                                <Filter className="h-4 w-4" />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-60">
                              <div className="space-y-4">
                                <h4 className="font-medium text-sm">Filter {column.header}</h4>
                                {column.filterType === 'select' ? (
                                  <div className="space-y-2">
                                    {column.filterOptions?.map((option) => (
                                      <div key={option.value} className="flex items-center space-x-2">
                                        <Checkbox
                                          id={`${column.key}-${option.value}`}
                                          checked={(columnFilters[column.key] || []).includes(option.value)}
                                          onCheckedChange={() => handleFilterChange(column.key, option.value)}
                                        />
                                        <Label htmlFor={`${column.key}-${option.value}`}>{option.label}</Label>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <Input
                                    type="text"
                                    placeholder={`Search ${column.header.toLowerCase()}...`}
                                    value={(columnFilters[column.key] || [])[0] || ''}
                                    onChange={(e) => handleTextFilterChange(column.key, e.target.value)}
                                    className="w-full"
                                  />
                                )}
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>
                  </th>
                ))}
                {actions.length > 0 && (
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAndSortedData.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-50/50">
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap text-center">
                      {column.render ? column.render(item[column.key], item) : item[column.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <div className="flex justify-center gap-2">
                        {actions.map((action) => (
                          <button
                            key={typeof action.label === 'string' ? action.label : action.label(item)}
                            onClick={() => action.onClick(item)}
                            className={cn(
                              "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                              action.type === 'delete' 
                                ? 'text-white bg-red-600 hover:bg-red-700'
                                : 'text-white bg-black hover:bg-gray-800'
                            )}
                          >
                            {typeof action.label === 'string' ? action.label : action.label(item)}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {filteredAndSortedData.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {(onExport || onImport) && (
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {onExport && (
              <button
                onClick={onExport}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Export
              </button>
            )}
            {onImport && (
              <button
                onClick={onImport}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Import
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 