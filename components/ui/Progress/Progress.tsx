'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Progress Bar Variants using CVA
// ─────────────────────────────────────────
export const progressBarVariants = cva('relative w-full rounded-full overflow-hidden', {
  variants: {
    size: {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    },
    variant: {
      default: 'bg-neutral-200',
      success: 'bg-success-subtle',
      warning: 'bg-warning-subtle',
      error: 'bg-error-subtle',
      info: 'bg-info-subtle',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

// ─────────────────────────────────────────
// Progress Circle Variants using CVA
// ─────────────────────────────────────────
export const progressCircleVariants = cva('inline-flex items-center justify-center relative', {
  variants: {
    size: {
      sm: 'w-12 h-12',
      md: 'w-16 h-16',
      lg: 'w-20 h-20',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// ─────────────────────────────────────────
// TypeScript Interfaces
// ─────────────────────────────────────────
export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressBarVariants> {
  value?: number;
  max?: number;
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

export interface ProgressCircleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressCircleVariants> {
  value?: number;
  max?: number;
  showLabel?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

// ─────────────────────────────────────────
// Progress Bar Component
// ─────────────────────────────────────────
export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      size = 'md',
      variant = 'default',
      value = 0,
      max = 100,
      showLabel = false,
      animated = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const containerClasses = progressBarVariants({ size, variant });
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const getBarColor = (variant: string) => {
      switch (variant) {
        case 'success':
          return 'bg-success';
        case 'warning':
          return 'bg-warning';
        case 'error':
          return 'bg-error';
        case 'info':
          return 'bg-info';
        default:
          return 'bg-primary';
      }
    };

    return (
      <div ref={ref} className={cn(containerClasses, className)} {...props}>
        <div
          className={cn(
            `h-full transition-all duration-300 ease-out ${getBarColor(variant || 'default')}`,
            animated && 'animate-pulse'
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label="Progress"
        />
        {showLabel && (
          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-neutral-900">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

// ─────────────────────────────────────────
// Progress Circle Component
// ─────────────────────────────────────────
export const ProgressCircle = React.forwardRef<HTMLDivElement, ProgressCircleProps>(
  (
    {
      size = 'md',
      variant = 'default',
      value = 0,
      max = 100,
      showLabel = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const containerClasses = progressCircleVariants({ size });
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    // Get size-based radius
    const radiusMap = {
      sm: 18,
      md: 24,
      lg: 30,
    };
    const radius = radiusMap[size as keyof typeof radiusMap];
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    const getColor = (variant: string) => {
      switch (variant) {
        case 'success':
          return 'var(--color-success)';
        case 'warning':
          return 'var(--color-warning)';
        case 'error':
          return 'var(--color-error)';
        case 'info':
          return 'var(--color-info)';
        default:
          return 'var(--color-primary)';
      }
    };

    // Get font size based on circle size
    const fontSizeMap = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    return (
      <div ref={ref} className={cn(containerClasses, className)} {...props}>
        <svg
          className="absolute inset-0"
          viewBox="0 0 100 100"
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-neutral-200"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={getColor(variant)}
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-label="Progress"
          />
        </svg>
        {showLabel && (
          <div className={cn('relative flex items-center justify-center font-semibold', fontSizeMap[size as keyof typeof fontSizeMap])}>
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    );
  }
);

ProgressCircle.displayName = 'ProgressCircle';

// ─────────────────────────────────────────
// Re-export for convenience
// ─────────────────────────────────────────
export const Progress = ProgressBar;
