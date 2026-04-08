'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Toast Variants using CVA
// ─────────────────────────────────────────
export const toastVariants = cva(
  'relative flex gap-3 rounded-lg border px-4 py-3 animate-in slide-in-from-bottom-5 duration-300 shadow-lg',
  {
    variants: {
      variant: {
        info: 'bg-info-subtle border-info text-info',
        success: 'bg-success-subtle border-success text-success',
        warning: 'bg-warning-subtle border-warning text-warning',
        error: 'bg-error-subtle border-error text-error',
        default: 'bg-surface-raised border-neutral-300 text-neutral-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ─────────────────────────────────────────
// Icon Components
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
  default: null,
} as const;

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface ToastProps extends VariantProps<typeof toastVariants> {
  title?: React.ReactNode;
  message?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
  duration?: number;
  open?: boolean;
  className?: string;
}

// ─────────────────────────────────────────
// Toast Component
// ─────────────────────────────────────────
export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      variant = 'default',
      title,
      message,
      action,
      onClose,
      duration,
      open = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(open);

    React.useEffect(() => {
      setIsVisible(open);
    }, [open]);

    React.useEffect(() => {
      if (!isVisible || !duration) return;

      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    const baseClasses = toastVariants({ variant });
    const combined = cn(baseClasses, className);

    const Icon =
      variant && variant !== 'default'
        ? variantIconMap[variant as keyof typeof variantIconMap]
        : null;

    const handleClose = () => {
      setIsVisible(false);
      onClose?.();
    };

    return (
      <div ref={ref} className={combined} {...props} role="status" aria-live="polite">
        {Icon && <Icon />}
        <div className="flex-1 min-w-0">
          {title && (
            <div className="font-semibold leading-5 mb-1">
              {typeof title === 'string' ? <span>{title}</span> : title}
            </div>
          )}
          {message && (
            <div className="text-sm leading-5">
              {typeof message === 'string' ? <span>{message}</span> : message}
            </div>
          )}
        </div>
        {action && (
          <button
            onClick={() => {
              action.onClick();
              handleClose();
            }}
            className="flex-shrink-0 font-medium hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)] rounded px-2 py-1 text-sm"
            type="button"
          >
            {action.label}
          </button>
        )}
        {onClose && !action && (
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-current hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)] rounded"
            aria-label="Dismiss notification"
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

Toast.displayName = 'Toast';
