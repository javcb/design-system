'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Text } from '../Text';

// ─────────────────────────────────────────
// Alert Variants using CVA
// ─────────────────────────────────────────
export const alertVariants = cva(
  'relative flex gap-3 rounded-lg border px-4 py-3',
  {
    variants: {
      variant: {
        info: 'bg-info-subtle border-info text-info',
        success: 'bg-success-subtle border-success text-success',
        warning: 'bg-warning-subtle border-warning text-warning',
        error: 'bg-error-subtle border-error text-error',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

// ─────────────────────────────────────────
// Icon Components for Each Variant
// ─────────────────────────────────────────
const IconInfo = () => (
  <svg
    className="w-5 h-5 flex-shrink-0 mt-0.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const IconSuccess = () => (
  <svg
    className="w-5 h-5 flex-shrink-0 mt-0.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconWarning = () => (
  <svg
    className="w-5 h-5 flex-shrink-0 mt-0.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const IconError = () => (
  <svg
    className="w-5 h-5 flex-shrink-0 mt-0.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const variantIconMap = {
  info: IconInfo,
  success: IconSuccess,
  warning: IconWarning,
  error: IconError,
} as const;

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface AlertProps extends VariantProps<typeof alertVariants> {
  title?: React.ReactNode;
  children?: React.ReactNode;
  onDismiss?: () => void;
  dismissible?: boolean;
  className?: string;
}

// ─────────────────────────────────────────
// Alert Component
// ─────────────────────────────────────────
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      children,
      onDismiss,
      dismissible = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses = alertVariants({ variant });
    const combined = cn(baseClasses, className);

    const Icon = variant ? variantIconMap[variant as keyof typeof variantIconMap] : null;

    return (
      <div ref={ref} className={combined} {...props}>
        {Icon && <Icon />}
        <div className="flex-1 min-w-0">
          {title && (
            <div className="font-semibold leading-5 mb-1">
              {typeof title === 'string' ? (
                <span>{title}</span>
              ) : (
                title
              )}
            </div>
          )}
          {children && (
            <div className="text-sm leading-5">
              {typeof children === 'string' ? (
                <span>{children}</span>
              ) : (
                children
              )}
            </div>
          )}
        </div>
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 mt-0.5 text-current hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)] rounded"
            aria-label="Dismiss alert"
            type="button"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
