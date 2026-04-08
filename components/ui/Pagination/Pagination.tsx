'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// usePagination Hook
// ─────────────────────────────────────────
interface UsePaginationParams {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
  showFirstLast?: boolean;
}

interface PaginationItem {
  type: 'page' | 'ellipsis';
  value?: number;
}

const usePagination = ({
  currentPage,
  totalPages,
  siblingCount = 1,
  showFirstLast = true,
}: UsePaginationParams): PaginationItem[] => {
  const pages: PaginationItem[] = [];

  // If total pages <= 7, show all pages
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push({ type: 'page', value: i });
    }
    return pages;
  }

  // Show first page if showFirstLast
  if (showFirstLast) {
    pages.push({ type: 'page', value: 1 });
  }

  // Calculate left range
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const shouldShowLeftEllipsis = leftSiblingIndex > 2;

  if (shouldShowLeftEllipsis) {
    pages.push({ type: 'ellipsis' });
  } else if (leftSiblingIndex === 2) {
    pages.push({ type: 'page', value: 2 });
  }

  // Show current page and siblings
  for (let i = leftSiblingIndex; i <= Math.min(currentPage + siblingCount, totalPages); i++) {
    if (i > 1 && i < totalPages) {
      pages.push({ type: 'page', value: i });
    }
  }

  // Calculate right range
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

  if (shouldShowRightEllipsis) {
    pages.push({ type: 'ellipsis' });
  } else if (rightSiblingIndex === totalPages - 1) {
    pages.push({ type: 'page', value: totalPages - 1 });
  }

  // Show last page if showFirstLast
  if (showFirstLast) {
    pages.push({ type: 'page', value: totalPages });
  }

  return pages;
};

// ─────────────────────────────────────────
// TypeScript Interfaces
// ─────────────────────────────────────────
export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface PaginationContentProps extends React.HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode;
}

export interface PaginationItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
}

export interface PaginationLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  page?: number;
  isActive?: boolean;
  children?: React.ReactNode;
}

export interface PaginationPreviousProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface PaginationNextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface PaginationEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

export interface PaginationControllerProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  children?: React.ReactNode;
  className?: string;
}

// ─────────────────────────────────────────
// Pagination Root
// ─────────────────────────────────────────
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ children, className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="pagination"
      className={cn('', className)}
      {...props}
    >
      {children}
    </nav>
  )
);

Pagination.displayName = 'Pagination';

// ─────────────────────────────────────────
// PaginationContent
// ─────────────────────────────────────────
export const PaginationContent = React.forwardRef<HTMLUListElement, PaginationContentProps>(
  ({ children, className, ...props }, ref) => (
    <ul
      ref={ref}
      role="list"
      className={cn('flex flex-wrap items-center gap-2', className)}
      {...props}
    >
      {children}
    </ul>
  )
);

PaginationContent.displayName = 'PaginationContent';

// ─────────────────────────────────────────
// PaginationItem
// ─────────────────────────────────────────
export const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ children, className, ...props }, ref) => (
    <li ref={ref} className={cn('inline-flex', className)} {...props}>
      {children}
    </li>
  )
);

PaginationItem.displayName = 'PaginationItem';

// ─────────────────────────────────────────
// PaginationLink
// ─────────────────────────────────────────
export const PaginationLink = React.forwardRef<HTMLButtonElement, PaginationLinkProps>(
  ({ page, isActive, className, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-current={isActive ? 'page' : undefined}
      aria-label={page ? `Page ${page}` : undefined}
      className={cn(
        'inline-flex items-center justify-center rounded border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]',
        isActive
          ? 'border-primary bg-primary text-neutral-50'
          : 'border-neutral-300 bg-surface text-neutral-700 hover:bg-surface-offset'
      )}
      {...props}
    >
      {children || page}
    </button>
  )
);

PaginationLink.displayName = 'PaginationLink';

// ─────────────────────────────────────────
// PaginationPrevious
// ─────────────────────────────────────────
export const PaginationPrevious = React.forwardRef<
  HTMLButtonElement,
  PaginationPreviousProps
>(({ disabled, className, children, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    aria-label="Go to previous page"
    aria-disabled={disabled}
    disabled={disabled}
    className={cn(
      'inline-flex items-center justify-center rounded border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]',
      disabled
        ? 'opacity-50 cursor-not-allowed'
        : 'border-neutral-300 bg-surface text-neutral-700 hover:bg-surface-offset',
      className
    )}
    {...props}
  >
    {children || '← Previous'}
  </button>
));

PaginationPrevious.displayName = 'PaginationPrevious';

// ─────────────────────────────────────────
// PaginationNext
// ─────────────────────────────────────────
export const PaginationNext = React.forwardRef<
  HTMLButtonElement,
  PaginationNextProps
>(({ disabled, className, children, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    aria-label="Go to next page"
    aria-disabled={disabled}
    disabled={disabled}
    className={cn(
      'inline-flex items-center justify-center rounded border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]',
      disabled
        ? 'opacity-50 cursor-not-allowed'
        : 'border-neutral-300 bg-surface text-neutral-700 hover:bg-surface-offset',
      className
    )}
    {...props}
  >
    {children || 'Next →'}
  </button>
));

PaginationNext.displayName = 'PaginationNext';

// ─────────────────────────────────────────
// PaginationEllipsis
// ─────────────────────────────────────────
export const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  PaginationEllipsisProps
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-hidden="true"
    className={cn('text-neutral-500 px-2', className)}
    {...props}
  >
    …
  </span>
));

PaginationEllipsis.displayName = 'PaginationEllipsis';

// ─────────────────────────────────────────
// PaginationController (Helper Component)
// ─────────────────────────────────────────
export const PaginationController = React.forwardRef<HTMLDivElement, PaginationControllerProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      siblingCount = 1,
      showFirstLast = true,
      children,
      className,
    },
    ref
  ) => {
    const pages = usePagination({
      currentPage,
      totalPages,
      siblingCount,
      showFirstLast,
    });

    return (
      <div ref={ref} className={className}>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={currentPage === 1}
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              />
            </PaginationItem>

            {pages.map((item, index) =>
              item.type === 'page' ? (
                <PaginationItem key={index}>
                  <PaginationLink
                    page={item.value}
                    isActive={item.value === currentPage}
                    onClick={() => onPageChange(item.value!)}
                  />
                </PaginationItem>
              ) : (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        {children}
      </div>
    );
  }
);

PaginationController.displayName = 'PaginationController';
