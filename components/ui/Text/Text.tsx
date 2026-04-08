'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Text Variants using CVA
// ─────────────────────────────────────────
const textVariants = cva('', {
  variants: {
    size: {
      xs: 'text-xs leading-4',
      sm: 'text-sm leading-5',
      md: 'text-base leading-6',
      lg: 'text-lg leading-7',
      xl: 'text-xl leading-8',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    color: {
      default: 'text-neutral-900',
      muted: 'text-neutral-700',
      subtle: 'text-neutral-500',
      primary: 'text-primary',
      error: 'text-error',
      success: 'text-success',
      warning: 'text-warning',
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
    size: 'md',
    weight: 'normal',
    color: 'default',
    align: 'left',
  },
});

// ─────────────────────────────────────────
// Line clamp helper
// ─────────────────────────────────────────
const getLineClamp = (clamp?: 1 | 2 | 3 | 4) => {
  if (!clamp) return '';
  return `line-clamp-${clamp}`;
};

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface TextProps extends VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div' | 'label' | 'strong' | 'em';
  clamp?: 1 | 2 | 3 | 4;
  children?: React.ReactNode;
  className?: string;
}

// ─────────────────────────────────────────
// Text Component
// ─────────────────────────────────────────
export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Component = 'p',
      size = 'md',
      weight = 'normal',
      color = 'default',
      align = 'left',
      truncate = false,
      clamp,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses = textVariants({
      size,
      weight,
      color,
      align,
      truncate,
    });
    const lineClampClasses = getLineClamp(clamp);
    const combined = cn(baseClasses, lineClampClasses, className);

    return (
      <Component ref={ref} className={combined} {...props}>
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';
