'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Label Variants using CVA
// ─────────────────────────────────────────
const labelVariants = cva('text-neutral-700 font-medium', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-sm',
    },
    disabled: {
      true: 'text-neutral-500',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface LabelProps extends VariantProps<typeof labelVariants> {
  htmlFor?: string;
  required?: boolean;
  optional?: boolean;
  children?: React.ReactNode;
  className?: string;
}

// ─────────────────────────────────────────
// Label Component
// ─────────────────────────────────────────
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      htmlFor,
      required = false,
      optional = false,
      size = 'md',
      disabled = false,
      children,
      className = '',
    },
    ref
  ) => {
    const baseClasses = labelVariants({ size, disabled });
    const combined = cn(baseClasses, className);

    return (
      <label ref={ref} htmlFor={htmlFor} className={combined}>
        {children}
        {required && (
          <span className="text-error ml-0.5" aria-hidden="true">
            *
          </span>
        )}
        {optional && (
          <span className="text-neutral-500 font-normal ml-1 text-xs">
            (optional)
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = 'Label';
