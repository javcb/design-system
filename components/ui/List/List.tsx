'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// TypeScript Interfaces
// ─────────────────────────────────────────
export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  ordered?: boolean;
}

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  selected?: boolean;
}

export interface ListItemLeadingProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ListItemContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ListItemTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ListItemSubtitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ListItemTrailingProps extends React.HTMLAttributes<HTMLDivElement> {}

// ─────────────────────────────────────────
// List Root Component
// ─────────────────────────────────────────
export const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ className, ordered = false, ...props }, ref) => {
    const Component = ordered ? 'ol' : 'ul';
    return (
      <Component
        ref={ref as React.Ref<HTMLUListElement>}
        className={cn('space-y-1', className)}
        {...props}
      />
    );
  }
);
List.displayName = 'List';

// ─────────────────────────────────────────
// ListItem Component
// ─────────────────────────────────────────
export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, selected = false, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
        selected && 'bg-surface-offset',
        'hover:bg-surface-offset',
        className
      )}
      {...props}
    />
  )
);
ListItem.displayName = 'ListItem';

// ─────────────────────────────────────────
// ListItemLeading Component
// ─────────────────────────────────────────
export const ListItemLeading = React.forwardRef<HTMLDivElement, ListItemLeadingProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-shrink-0 flex items-center justify-center', className)}
      {...props}
    />
  )
);
ListItemLeading.displayName = 'ListItemLeading';

// ─────────────────────────────────────────
// ListItemContent Component
// ─────────────────────────────────────────
export const ListItemContent = React.forwardRef<HTMLDivElement, ListItemContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-1 min-w-0', className)}
      {...props}
    />
  )
);
ListItemContent.displayName = 'ListItemContent';

// ─────────────────────────────────────────
// ListItemTitle Component
// ─────────────────────────────────────────
export const ListItemTitle = React.forwardRef<HTMLDivElement, ListItemTitleProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-neutral-900 font-semibold text-sm truncate', className)}
      {...props}
    />
  )
);
ListItemTitle.displayName = 'ListItemTitle';

// ─────────────────────────────────────────
// ListItemSubtitle Component
// ─────────────────────────────────────────
export const ListItemSubtitle = React.forwardRef<HTMLDivElement, ListItemSubtitleProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-neutral-500 text-xs truncate', className)}
      {...props}
    />
  )
);
ListItemSubtitle.displayName = 'ListItemSubtitle';

// ─────────────────────────────────────────
// ListItemTrailing Component
// ─────────────────────────────────────────
export const ListItemTrailing = React.forwardRef<HTMLDivElement, ListItemTrailingProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-shrink-0 flex items-center justify-center', className)}
      {...props}
    />
  )
);
ListItemTrailing.displayName = 'ListItemTrailing';
