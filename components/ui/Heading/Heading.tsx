'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Heading Variants using CVA
// ─────────────────────────────────────────
const headingVariants = cva('', {
  variants: {
    size: {
      xs: 'text-sm leading-5',
      sm: 'text-base leading-6',
      md: 'text-lg leading-7',
      lg: 'text-xl leading-8',
      xl: 'text-2xl leading-9',
      '2xl': 'text-3xl leading-10',
      '3xl': 'text-4xl leading-none',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    color: {
      default: 'text-neutral-900',
      muted: 'text-neutral-500',
      primary: 'text-primary',
      error: 'text-error',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    truncate: {
      true: 'truncate',
    },
  },
  defaultVariants: {
    weight: 'semibold',
    color: 'default',
    align: 'left',
  },
});

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface HeadingProps extends VariantProps<typeof headingVariants> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children?: React.ReactNode;
  className?: string;
}

// ─────────────────────────────────────────
// Size defaults by level
// ─────────────────────────────────────────
const defaultSizeByLevel = {
  1: '2xl',
  2: 'xl',
  3: 'lg',
  4: 'md',
  5: 'sm',
  6: 'xs',
} as const;

// ─────────────────────────────────────────
// Heading Component
// ─────────────────────────────────────────
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      level = 2,
      size,
      weight = 'semibold',
      color = 'default',
      align = 'left',
      truncate = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    // Determine size: explicit size prop overrides level default
    const resolvedSize = (size || defaultSizeByLevel[level]) as VariantProps<typeof headingVariants>['size'];

    const baseClasses = headingVariants({
      size: resolvedSize,
      weight,
      color,
      align,
      truncate,
    });
    const combined = cn(baseClasses, className);

    const Tag = `h${level}` as const;

    return (
      <Tag ref={ref} className={combined} {...props}>
        {children}
      </Tag>
    );
  }
);

Heading.displayName = 'Heading';
