'use client';

import React from 'react';
import { Link } from '@/components/ui/Link';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// TypeScript Interfaces
// ─────────────────────────────────────────
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface BreadcrumbListProps extends React.OlHTMLAttributes<HTMLOListElement> {
  children?: React.ReactNode;
}

export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
}

export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  asChild?: boolean;
  children?: React.ReactNode;
}

export interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

export interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

export interface BreadcrumbEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

// ─────────────────────────────────────────
// Breadcrumb Root
// ─────────────────────────────────────────
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ children, className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="breadcrumb"
      className={cn('', className)}
      {...props}
    >
      {children}
    </nav>
  )
);

Breadcrumb.displayName = 'Breadcrumb';

// ─────────────────────────────────────────
// BreadcrumbList
// ─────────────────────────────────────────
export const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ children, className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn('flex flex-wrap items-center gap-1', className)}
      {...props}
    >
      {children}
    </ol>
  )
);

BreadcrumbList.displayName = 'BreadcrumbList';

// ─────────────────────────────────────────
// BreadcrumbItem
// ─────────────────────────────────────────
export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ children, className, ...props }, ref) => (
    <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props}>
      {children}
    </li>
  )
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

// ─────────────────────────────────────────
// BreadcrumbLink
// ─────────────────────────────────────────
export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>(({ href, className, children, ...props }, ref) => (
  <a
    ref={ref}
    href={href}
    className={cn(
      'text-neutral-500 transition-colors hover:text-neutral-900',
      className
    )}
    {...props}
  >
    {children}
  </a>
));

BreadcrumbLink.displayName = 'BreadcrumbLink';

// ─────────────────────────────────────────
// BreadcrumbPage
// ─────────────────────────────────────────
export const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbPageProps
>(({ className, children, ...props }, ref) => (
  <span
    ref={ref}
    aria-current="page"
    className={cn('text-neutral-900 font-medium', className)}
    {...props}
  >
    {children}
  </span>
));

BreadcrumbPage.displayName = 'BreadcrumbPage';

// ─────────────────────────────────────────
// BreadcrumbSeparator
// ─────────────────────────────────────────
export const BreadcrumbSeparator = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbSeparatorProps
>(({ children, className, ...props }, ref) => (
  <span
    ref={ref}
    aria-hidden="true"
    className={cn('text-neutral-300 mx-1', className)}
    {...props}
  >
    {children || '/'}
  </span>
));

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

// ─────────────────────────────────────────
// BreadcrumbEllipsis
// ─────────────────────────────────────────
export const BreadcrumbEllipsis = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbEllipsisProps
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-hidden="true"
    className={cn('text-neutral-500 px-1.5', className)}
    {...props}
  >
    …
  </span>
));

BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';
