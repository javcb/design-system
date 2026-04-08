'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Tag Variants using CVA
// ─────────────────────────────────────────
const tagVariants = cva('inline-flex items-center gap-1.5 rounded-full font-medium border', {
  variants: {
    variant: {
      default: 'bg-neutral-100 text-neutral-700 border-neutral-300',
      primary: 'bg-primary-subtle text-primary border-primary',
      accent: 'bg-accent-subtle text-accent border-accent',
    },
    size: {
      sm: 'text-xs px-2 py-0.5',
      md: 'text-sm px-3 py-1',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

// ─────────────────────────────────────────
// Close Icon SVG
// ─────────────────────────────────────────
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface TagProps extends VariantProps<typeof tagVariants> {
  onDismiss?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

// ─────────────────────────────────────────
// Tag Component
// ─────────────────────────────────────────
export const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  (
    {
      variant = 'default',
      size = 'md',
      onDismiss,
      disabled = false,
      children,
      className = '',
    },
    ref
  ) => {
    const baseClasses = tagVariants({ variant, size });
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
    const combined = cn(baseClasses, disabledClasses, className);

    const dismissHoverClass =
      variant === 'default'
        ? 'hover:bg-neutral-200'
        : variant === 'primary'
          ? 'hover:bg-primary-subtle'
          : 'hover:bg-accent-subtle';

    return (
      <div ref={ref} className={combined}>
        <span>{children}</span>
        {onDismiss && !disabled && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            aria-label="Remove"
            className={cn(
              'flex items-center justify-center rounded-full p-0.5 flex-shrink-0 transition-colors',
              dismissHoverClass
            )}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  }
);

Tag.displayName = 'Tag';
