'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// HelperText Variants using CVA
// ─────────────────────────────────────────
const helperTextVariants = cva('inline-flex items-center gap-1.5', {
  variants: {
    variant: {
      default: 'text-neutral-500',
      error: 'text-error',
      success: 'text-success',
      warning: 'text-warning',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'sm',
  },
});

// ─────────────────────────────────────────
// Icon Components
// ─────────────────────────────────────────
const ErrorIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const SuccessIcon = () => (
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
    <polyline points="20 6 9 17 4 12" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const WarningIcon = () => (
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
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface HelperTextProps extends VariantProps<typeof helperTextVariants> {
  icon?: boolean;
  id?: string;
  children?: React.ReactNode;
  className?: string;
}

// ─────────────────────────────────────────
// HelperText Component
// ─────────────────────────────────────────
export const HelperText = React.forwardRef<HTMLDivElement, HelperTextProps>(
  (
    {
      variant = 'default',
      size = 'sm',
      icon = false,
      id,
      children,
      className = '',
    },
    ref
  ) => {
    const baseClasses = helperTextVariants({ variant, size });
    const combined = cn(baseClasses, className);

    const renderIcon = () => {
      if (!icon || variant === 'default') return null;

      switch (variant) {
        case 'error':
          return <ErrorIcon />;
        case 'success':
          return <SuccessIcon />;
        case 'warning':
          return <WarningIcon />;
        default:
          return null;
      }
    };

    return (
      <div ref={ref} id={id} className={combined}>
        {renderIcon()}
        <span>{children}</span>
      </div>
    );
  }
);

HelperText.displayName = 'HelperText';
