'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { inputBase, inputStates, inputSizes, inputDisabledState, inputFocusState } from '@/lib/input-variants';

// ─────────────────────────────────────────
// Input Variants
// ─────────────────────────────────────────
const inputVariants = cva(inputBase, {
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
// Icon Components
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
    className="text-neutral-400"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const XIcon = () => (
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
    className="text-neutral-400"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftAddon?: string;
  rightAddon?: string;
  state?: 'default' | 'error' | 'success';
}

// ─────────────────────────────────────────
// Input Component
// ─────────────────────────────────────────
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      state = 'default',
      leftIcon,
      rightIcon,
      leftAddon,
      rightAddon,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses = inputVariants({ size, state });
    const paddingClasses = cn(
      leftIcon || leftAddon ? 'pl-10' : '',
      rightIcon || rightAddon ? 'pr-10' : ''
    );
    const combined = cn(baseClasses, inputDisabledState, paddingClasses, className);

    return (
      <div className="relative">
        {/* Left Addon Text */}
        {leftAddon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm pointer-events-none">
            {leftAddon}
          </span>
        )}

        {/* Left Icon */}
        {leftIcon && !leftAddon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-neutral-400 pointer-events-none">
            {leftIcon}
          </div>
        )}

        {/* Input */}
        <input ref={ref} className={combined} {...props} />

        {/* Right Icon */}
        {rightIcon && !rightAddon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-neutral-400 pointer-events-none">
            {rightIcon}
          </div>
        )}

        {/* Right Addon Text */}
        {rightAddon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm pointer-events-none">
            {rightAddon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
