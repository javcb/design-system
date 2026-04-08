'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Toggle Variants
// ─────────────────────────────────────────
const toggleVariants = cva('relative inline-block', {
  variants: {
    size: {
      sm: 'w-10 h-6',
      md: 'w-12 h-7',
      lg: 'w-14 h-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const trackVariants = cva(
  'absolute inset-0 rounded-full transition-colors duration-200 cursor-pointer',
  {
    variants: {
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
  }
);

const thumbVariants = cva(
  'absolute top-1 rounded-full transition-transform duration-200',
  {
    variants: {
      size: {
        sm: 'w-4 h-4 left-1',
        md: 'w-5 h-5 left-1',
        lg: 'w-6 h-6 left-1',
      },
    },
  }
);

const translateVariants = {
  sm: 'translate-x-4',
  md: 'translate-x-5',
  lg: 'translate-x-6',
};

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>,
    VariantProps<typeof toggleVariants> {
  label?: string;
  description?: string;
  id?: string;
}

// ─────────────────────────────────────────
// Toggle Component
// ─────────────────────────────────────────
export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      size = 'md',
      label,
      description,
      id,
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const toggleId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;
    const isChecked = props.checked as boolean;

    const wrapperClasses = toggleVariants({ size });
    const trackClasses = cn(
      trackVariants({ size }),
      isChecked ? 'bg-primary' : 'bg-neutral-300',
      disabled && 'opacity-50 cursor-not-allowed'
    );

    const thumbClasses = cn(
      thumbVariants({ size }),
      'bg-white shadow-sm',
      isChecked && translateVariants[size as keyof typeof translateVariants]
    );

    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={toggleId}
          className={cn(
            'flex items-center gap-3',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {/* Visually Hidden Input */}
          <input
            ref={ref}
            id={toggleId}
            type="checkbox"
            checked={isChecked}
            disabled={disabled}
            className="sr-only"
            {...props}
          />

          {/* Toggle Track */}
          <div className={wrapperClasses}>
            <div className={trackClasses} />
            <div className={thumbClasses} />
          </div>

          {/* Label Text */}
          {label && (
            <span
              className={cn(
                'text-sm font-medium',
                disabled ? 'text-neutral-400' : 'text-default'
              )}
            >
              {label}
            </span>
          )}
        </label>

        {/* Description */}
        {description && (
          <p className="text-xs text-neutral-500 ml-12">{description}</p>
        )}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';
