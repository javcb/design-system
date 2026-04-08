'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Divider Variants using CVA
// ─────────────────────────────────────────
const dividerVariants = cva('border-neutral-300', {
  variants: {
    orientation: {
      horizontal: 'border-t',
      vertical: 'border-l',
    },
    variant: {
      solid: 'border-solid',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'solid',
  },
});

const spacingVariants = cva('', {
  variants: {
    spacing: {
      sm: 'my-2',
      md: 'my-4',
      lg: 'my-8',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
});

const verticalSpacingVariants = cva('', {
  variants: {
    spacing: {
      sm: 'mx-2',
      md: 'mx-4',
      lg: 'mx-8',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
});

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface DividerProps extends VariantProps<typeof dividerVariants> {
  label?: string;
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}

// ─────────────────────────────────────────
// Divider Component
// ─────────────────────────────────────────
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'solid',
      label,
      spacing = 'md',
      className = '',
    },
    ref
  ) => {
    const baseClasses = dividerVariants({ orientation, variant });
    const spacingClasses =
      orientation === 'horizontal'
        ? spacingVariants({ spacing })
        : verticalSpacingVariants({ spacing });

    // Horizontal divider without label
    if (orientation === 'horizontal' && !label) {
      const combined = cn(baseClasses, spacingClasses, className);
      return <div ref={ref} className={combined} />;
    }

    // Horizontal divider with label
    if (orientation === 'horizontal' && label) {
      return (
        <div ref={ref} className={cn(spacingClasses, className)}>
          <div className="flex items-center gap-3">
            <div className={cn('flex-1', baseClasses)} />
            <span className="text-neutral-500 text-sm px-3 flex-shrink-0">
              {label}
            </span>
            <div className={cn('flex-1', baseClasses)} />
          </div>
        </div>
      );
    }

    // Vertical divider
    const combined = cn(baseClasses, spacingClasses, 'h-full', className);
    return <div ref={ref} className={combined} />;
  }
);

Divider.displayName = 'Divider';
