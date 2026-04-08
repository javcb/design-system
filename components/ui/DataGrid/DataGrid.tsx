'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../Table';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from '../Pagination';
import { Text } from '../Text';
import { Skeleton } from '../Skeleton';

// ─────────────────────────────────────────
// TypeScript Interfaces
// ─────────────────────────────────────────
export interface DataGridColumn {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

export interface DataGridProps {
  columns: DataGridColumn[];
  data: Record<string, unknown>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  selectable?: boolean;
  selectedRows?: string[];
  onSelectionChange?: (ids: string[]) => void;
  pageSize?: number;
  emptyMessage?: string;
  loading?: boolean;
  className?: string;
  rowIdKey?: string;
}

// ─────────────────────────────────────────
// DataGrid Component
// ─────────────────────────────────────────
export const DataGrid = React.forwardRef<HTMLDivElement, DataGridProps>(
  (
    {
      columns,
      data,
      searchable = false,
      searchPlaceholder = 'Search...',
      selectable = false,
      selectedRows: controlledSelectedRows,
      onSelectionChange,
      pageSize,
      emptyMessage = 'No data available',
      loading = false,
      className,
      rowIdKey = 'id',
    },
    ref
  ) => {
    // State management
    const [searchQuery, setSearchQuery] = React.useState('');
    const [sortColumn, setSortColumn] = React.useState<string | null>(null);
    const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = React.useState(1);
    const [internalSelectedRows, setInternalSelectedRows] = React.useState<string[]>([]);

    // Use controlled or internal selection
    const selectedRows = controlledSelectedRows ?? internalSelectedRows;
    const handleSelectionChange = (ids: string[]) => {
      if (onSelectionChange) {
        onSelectionChange(ids);
      } else {
        setInternalSelectedRows(ids);
      }
    };

    // Filter data
    const filteredData = React.useMemo(() => {
      if (!searchQuery) return data;
      const query = searchQuery.toLowerCase();
      return data.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(query)
        )
      );
    }, [data, searchQuery]);

    // Sort data
    const sortedData = React.useMemo(() => {
      if (!sortColumn) return filteredData;
      const sorted = [...filteredData].sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
      return sorted;
    }, [filteredData, sortColumn, sortDirection]);

    // Paginate data
    const paginatedData = React.useMemo(() => {
      if (!pageSize) return sortedData;
      const start = (currentPage - 1) * pageSize;
      return sortedData.slice(start, start + pageSize);
    }, [sortedData, currentPage, pageSize]);

    const totalPages = pageSize ? Math.ceil(sortedData.length / pageSize) : 1;

    // Handle sort
    const handleSort = (columnKey: string) => {
      if (sortColumn === columnKey) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(columnKey);
        setSortDirection('asc');
      }
      setCurrentPage(1);
    };

    // Handle selection
    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        const allIds = paginatedData.map((row) => String(row[rowIdKey]));
        handleSelectionChange(allIds);
      } else {
        handleSelectionChange([]);
      }
    };

    const handleSelectRow = (id: string, checked: boolean) => {
      if (checked) {
        handleSelectionChange([...selectedRows, id]);
      } else {
        handleSelectionChange(selectedRows.filter((rowId) => rowId !== id));
      }
    };

    const selectAllChecked =
      paginatedData.length > 0 &&
      paginatedData.every((row) =>
        selectedRows.includes(String(row[rowIdKey]))
      );

    // Render
    if (loading) {
      return (
        <div ref={ref} className={cn('space-y-4', className)}>
          <Table>
            <TableHeader>
              <TableRow>
                {selectable && <TableHead style={{ width: '40px' }} />}
                {columns.map((col) => (
                  <TableHead key={col.key}>{col.header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, idx) => (
                <TableRow key={idx}>
                  {selectable && (
                    <TableCell style={{ width: '40px' }}>
                      <Skeleton variant="circle" />
                    </TableCell>
                  )}
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      <Skeleton variant="text" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      );
    }

    if (paginatedData.length === 0) {
      return (
        <div
          ref={ref}
          className={cn('text-neutral-500 py-16 text-center', className)}
        >
          <Text>{emptyMessage}</Text>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn('space-y-4', className)}>
        {searchable && (
          <div className="bg-surface-offset border-b border-neutral-300 p-3 rounded-t-lg">
            <Input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.currentTarget.value);
                setCurrentPage(1);
              }}
              aria-label="Search table"
            />
          </div>
        )}

        <Table striped hoverable>
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead style={{ width: '40px' }}>
                  <Checkbox
                    name="select-all"
                    checked={selectAllChecked}
                    onChange={(e) => handleSelectAll(e.currentTarget.checked)}
                    aria-label="Select all rows"
                  />
                </TableHead>
              )}
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  style={{ width: col.width }}
                  sortable={col.sortable}
                  sortDirection={sortColumn === col.key ? sortDirection : null}
                  onSort={() => col.sortable && handleSort(col.key)}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row, idx) => (
              <TableRow
                key={String(row[rowIdKey]) || idx}
                isEven={idx % 2 === 0}
                aria-selected={selectedRows.includes(String(row[rowIdKey]))}
              >
                {selectable && (
                  <TableCell style={{ width: '40px' }}>
                    <Checkbox
                      name={`select-row-${row[rowIdKey]}`}
                      checked={selectedRows.includes(String(row[rowIdKey]))}
                      onChange={(e) =>
                        handleSelectRow(String(row[rowIdKey]), e.currentTarget.checked)
                      }
                      aria-label={`Select row ${row[rowIdKey]}`}
                    />
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {pageSize && totalPages > 1 && (
          <div className="flex justify-center pt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(Math.max(1, currentPage - 1));
                    }}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(pageNum);
                        }}
                        isActive={currentPage === pageNum}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(Math.min(totalPages, currentPage + 1));
                    }}
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    );
  }
);
DataGrid.displayName = 'DataGrid';
