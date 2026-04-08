'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Spinner Variants using CVA
// ─────────────────────────────────────────
const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
    },
    variant: {
      primary: 'text-primary',
      neutral: 'text-neutral-500',
      white: 'text-white',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
});

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  label?: string;
  className?: string;
}

// ─────────────────────────────────────────
// Spinner Component
// ─────────────────────────────────────────
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = 'md', variant = 'primary', label = 'Loading', className = '' }, ref) => {
    const baseClasses = spinnerVariants({ size, variant });
    const combinedClasses = cn(baseClasses, className);

    return (
      <span ref={ref} role="status" aria-live="polite" className="inline-flex items-center justify-center">
        <svg
          className={combinedClasses}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className="sr-only">{label}</span>
      </span>
    );
  }
);

Spinner.displayName = 'Spinner';
