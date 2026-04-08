'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { inputBase, inputStates, inputSizes, inputDisabledState } from '@/lib/input-variants';

// ─────────────────────────────────────────
// Select Variants
// ─────────────────────────────────────────
const selectVariants = cva(cn(inputBase, 'appearance-none cursor-pointer'), {
  variants: {
    size: inputSizes,
    state: inputStates,
  },
  defaultVariants: {
    size: 'md',
    state: 'default',
  },
});

// ─────────────────────────────────────────
// Chevron Down Icon
// ─────────────────────────────────────────
const ChevronDownIcon = () => (
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
    className="text-neutral-400 pointer-events-none"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  placeholder?: string;
}

// ─────────────────────────────────────────
// Select Component
// ─────────────────────────────────────────
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      size = 'md',
      state = 'default',
      placeholder,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses = selectVariants({ size, state });
    const combined = cn(baseClasses, inputDisabledState, 'pr-10', className);

    return (
      <div className="relative">
        <select ref={ref} className={combined} {...props}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
          <ChevronDownIcon />
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';
