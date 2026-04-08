'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Badge Variants using CVA
// ─────────────────────────────────────────
const badgeVariants = cva('inline-flex items-center gap-1.5 rounded-md font-medium', {
  variants: {
    variant: {
      primary: 'bg-primary-subtle text-primary',
      accent: 'bg-accent-subtle text-accent',
      neutral: 'bg-neutral-100 text-neutral-700',
      success: 'bg-success-subtle text-success',
      warning: 'bg-warning-subtle text-warning',
      error: 'bg-error-subtle text-error',
      info: 'bg-info-subtle text-info',
    },
    size: {
      sm: 'text-xs px-1.5 py-0.5',
      md: 'text-sm px-2 py-1',
    },
  },
  defaultVariants: {
    variant: 'neutral',
    size: 'md',
  },
});

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  dot?: boolean;
  children?: React.ReactNode;
  className?: string;
}

// ─────────────────────────────────────────
// Badge Component
// ─────────────────────────────────────────
export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ variant = 'neutral', size = 'md', dot = false, children, className = '' }, ref) => {
    const baseClasses = badgeVariants({ variant, size });
    const combined = cn(baseClasses, className);

    return (
      <div ref={ref} className={combined}>
        {dot && (
          <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
        )}
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';
