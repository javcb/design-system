'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  id?: string;
}

// ─────────────────────────────────────────
// Radio Component
// ─────────────────────────────────────────
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      description,
      id,
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;
    const isChecked = props.checked as boolean;

    const radioBaseClasses = cn(
      'relative w-5 h-5 rounded-full border-2 border-neutral-300',
      'bg-surface cursor-pointer transition-colors duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]',
      'hover:border-primary',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-neutral-300',
      isChecked && 'border-primary'
    );

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={radioId}
          className={cn(
            'flex items-center gap-3 cursor-pointer',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {/* Visually Hidden Input */}
          <input
            ref={ref}
            id={radioId}
            type="radio"
            checked={isChecked}
            disabled={disabled}
            className="sr-only"
            {...props}
          />

          {/* Custom Radio Circle */}
          <div aria-hidden="true" className={radioBaseClasses}>
            {isChecked && (
              <div className="absolute inset-1.5 rounded-full bg-primary" />
            )}
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
          <p className="text-xs text-neutral-500 ml-8">{description}</p>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
