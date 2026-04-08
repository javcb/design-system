'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Stat Variants
// ─────────────────────────────────────────
export const statVariants = cva('', {
  variants: {
    variant: {
      default: '',
      card: 'bg-surface border border-neutral-300 rounded-lg p-4',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const statArrowVariants = cva('inline-block ml-2', {
  variants: {
    type: {
      increase: 'text-success',
      decrease: 'text-error',
    },
  },
});

// ─────────────────────────────────────────
// TypeScript Interfaces
// ─────────────────────────────────────────
export interface StatProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statVariants> {}

export interface StatLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface StatValueProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface StatHelpTextProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface StatArrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  type: 'increase' | 'decrease';
}

// ─────────────────────────────────────────
// Stat Root Component
// ─────────────────────────────────────────
export const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(statVariants({ variant }), className)}
      {...props}
    />
  )
);
Stat.displayName = 'Stat';

// ─────────────────────────────────────────
// StatLabel Component
// ─────────────────────────────────────────
export const StatLabel = React.forwardRef<HTMLDivElement, StatLabelProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-neutral-500 text-sm font-medium uppercase tracking-wide', className)}
      {...props}
    />
  )
);
StatLabel.displayName = 'StatLabel';

// ─────────────────────────────────────────
// StatValue Component
// ─────────────────────────────────────────
export const StatValue = React.forwardRef<HTMLDivElement, StatValueProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-neutral-900 text-3xl font-bold tabular-nums', className)}
      aria-live="polite"
      {...props}
    />
  )
);
StatValue.displayName = 'StatValue';

// ─────────────────────────────────────────
// StatArrow Component
// ─────────────────────────────────────────
export const StatArrow = React.forwardRef<HTMLSpanElement, StatArrowProps>(
  ({ className, type, ...props }, ref) => {
    const arrowLabel = type === 'increase' ? 'increased by' : 'decreased by';
    return (
      <span
        ref={ref}
        className={cn(statArrowVariants({ type }), className)}
        aria-label={arrowLabel}
        {...props}
      >
        {type === 'increase' ? '↑' : '↓'}
      </span>
    );
  }
);
StatArrow.displayName = 'StatArrow';

// ─────────────────────────────────────────
// StatHelpText Component
// ─────────────────────────────────────────
export const StatHelpText = React.forwardRef<HTMLDivElement, StatHelpTextProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-neutral-500 text-sm mt-1', className)}
      {...props}
    />
  )
);
StatHelpText.displayName = 'StatHelpText';
