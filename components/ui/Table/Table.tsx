'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Table Variants
// ─────────────────────────────────────────
export const tableVariants = cva('w-full text-sm', {
  variants: {
    striped: {
      true: '',
      false: '',
    },
    hoverable: {
      true: '',
      false: '',
    },
    bordered: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    striped: false,
    hoverable: false,
    bordered: false,
  },
});

export const tableHeadVariants = cva(
  'bg-surface-offset text-neutral-700 font-medium text-left px-4 py-3 border-b border-neutral-300',
  {
    variants: {
      sortable: {
        true: 'cursor-pointer hover:bg-neutral-200',
        false: '',
      },
      sortActive: {
        true: 'text-neutral-900 font-semibold',
        false: 'text-neutral-500',
      },
    },
    defaultVariants: {
      sortable: false,
      sortActive: false,
    },
  }
);

// ─────────────────────────────────────────
// TypeScript Interfaces
// ─────────────────────────────────────────
export interface TableProps extends VariantProps<typeof tableVariants> {
  children?: React.ReactNode;
  className?: string;
  stickyHeader?: boolean;
}

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  isEven?: boolean;
}

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
  onSort?: () => void;
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  bordered?: boolean;
}

// ─────────────────────────────────────────
// Table Root Component
// ─────────────────────────────────────────
export const Table = React.forwardRef<HTMLDivElement, TableProps>(
  ({ className, striped, hoverable, bordered, stickyHeader = false, children, ...props }, ref) => {
    const tableContext = React.useMemo(
      () => ({ striped, hoverable, bordered }),
      [striped, hoverable, bordered]
    );

    return (
      <TableContext.Provider value={tableContext}>
        <div
          ref={ref}
          className={cn('w-full overflow-auto', stickyHeader && '', className)}
          {...props}
        >
          <table className={cn(tableVariants({ striped, hoverable, bordered }))}>
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  }
);
Table.displayName = 'Table';

// ─────────────────────────────────────────
// Table Context
// ─────────────────────────────────────────
interface TableContextType {
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
}

const TableContext = React.createContext<TableContextType | undefined>(undefined);

export const useTable = () => {
  const context = React.useContext(TableContext);
  if (!context) {
    return { striped: false, hoverable: false, bordered: false };
  }
  return context;
};

// ─────────────────────────────────────────
// TableHeader Component
// ─────────────────────────────────────────
export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('', className)} {...props} />
  )
);
TableHeader.displayName = 'TableHeader';

// ─────────────────────────────────────────
// TableBody Component
// ─────────────────────────────────────────
export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('', className)} {...props} />
  )
);
TableBody.displayName = 'TableBody';

// ─────────────────────────────────────────
// TableFooter Component
// ─────────────────────────────────────────
export const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('bg-surface-offset font-medium', className)}
      {...props}
    />
  )
);
TableFooter.displayName = 'TableFooter';

// ─────────────────────────────────────────
// TableRow Component
// ─────────────────────────────────────────
export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, striped: stripeOverride, hoverable: hoverOverride, bordered: borderOverride, isEven, ...props }, ref) => {
    const tableCtx = useTable();
    const striped = stripeOverride ?? tableCtx.striped;
    const hoverable = hoverOverride ?? tableCtx.hoverable;
    const bordered = borderOverride ?? tableCtx.bordered;

    return (
      <tr
        ref={ref}
        className={cn(
          'transition-colors',
          striped && isEven && 'bg-surface-offset',
          hoverable && 'hover:bg-surface-offset',
          className
        )}
        {...props}
      />
    );
  }
);
TableRow.displayName = 'TableRow';

// ─────────────────────────────────────────
// TableHead Component
// ─────────────────────────────────────────
export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sortable = false, sortDirection = null, onSort, children, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={cn(
          tableHeadVariants({
            sortable,
            sortActive: sortDirection !== null && sortDirection !== undefined,
          }),
          className
        )}
        onClick={sortable ? onSort : undefined}
        aria-sort={
          sortDirection === 'asc'
            ? 'ascending'
            : sortDirection === 'desc'
              ? 'descending'
              : 'none'
        }
        {...props}
      >
        <div className="flex items-center gap-2">
          {children}
          {sortable && (
            <span className="text-neutral-400" aria-hidden="true">
              {sortDirection === 'asc' && '▲'}
              {sortDirection === 'desc' && '▼'}
              {!sortDirection && '⋮'}
            </span>
          )}
        </div>
      </th>
    );
  }
);
TableHead.displayName = 'TableHead';

// ─────────────────────────────────────────
// TableCell Component
// ─────────────────────────────────────────
export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, bordered, ...props }, ref) => {
    const tableCtx = useTable();
    const isBordered = bordered ?? tableCtx.bordered;

    return (
      <td
        ref={ref}
        className={cn(
          'px-4 py-3 text-neutral-700',
          isBordered ? 'border-b border-neutral-300' : 'border-b border-neutral-300',
          className
        )}
        {...props}
      />
    );
  }
);
TableCell.displayName = 'TableCell';
