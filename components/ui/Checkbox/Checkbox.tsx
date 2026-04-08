'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Checkbox Icon Components
// ─────────────────────────────────────────
const CheckIcon = ({ indeterminate }: { indeterminate?: boolean }) => {
  if (indeterminate) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  indeterminate?: boolean;
  id?: string;
}

// ─────────────────────────────────────────
// Checkbox Component
// ─────────────────────────────────────────
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      indeterminate = false,
      id,
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const isChecked = indeterminate ? false : (props.checked as boolean);

    const checkboxBaseClasses = cn(
      'relative w-5 h-5 rounded border-2 border-neutral-300',
      'bg-surface cursor-pointer transition-colors duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]',
      'hover:border-primary',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-neutral-300',
      isChecked && 'border-primary bg-primary text-white',
      indeterminate && 'border-primary bg-primary text-white'
    );

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={checkboxId}
          className={cn(
            'flex items-center gap-3 cursor-pointer',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {/* Visually Hidden Input */}
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            checked={isChecked}
            disabled={disabled}
            className="sr-only"
            {...props}
          />

          {/* Custom Checkbox Box */}
          <div aria-hidden="true" className={checkboxBaseClasses}>
            {(isChecked || indeterminate) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckIcon indeterminate={indeterminate} />
              </div>
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

Checkbox.displayName = 'Checkbox';
