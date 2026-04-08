'use client';

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Spinner } from '../Spinner';

// ─────────────────────────────────────────
// Button Variants using CVA
// ─────────────────────────────────────────
export const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)] disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-text-on-primary hover:bg-primary-hover',
        secondary: 'bg-surface-raised text-neutral-900 border border-neutral-300 hover:bg-neutral-100',
        ghost: 'bg-transparent text-primary hover:bg-primary-subtle',
        destructive: 'bg-error text-text-on-primary hover:opacity-90',
        accent: 'bg-accent text-text-on-accent hover:bg-accent-hover',
      },
      size: {
        sm: 'text-sm px-3 py-1.5 rounded-md',
        md: 'text-base px-4 py-2 rounded-lg',
        lg: 'text-lg px-6 py-3 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// ─────────────────────────────────────────
// Spinner size mapping for Button sizes
// ─────────────────────────────────────────
const spinnerSizeMap = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
} as const;

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface ButtonProps extends Omit<VariantProps<typeof buttonVariants>, 'variant' | 'size'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export interface ButtonAsLinkProps extends Omit<ButtonProps, 'onClick'> {
  as: 'a';
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface ButtonAsButtonProps extends ButtonProps {
  as?: 'button';
}

export type ButtonComponentProps = ButtonAsButtonProps | ButtonAsLinkProps;

// ─────────────────────────────────────────
// Button Component
// ─────────────────────────────────────────
export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonComponentProps
>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses = buttonVariants({ variant, size });
    const loadingClasses = isLoading ? 'pointer-events-none' : '';
    const fullWidthClasses = fullWidth ? 'w-full' : '';
    const combinedClasses = cn(baseClasses, loadingClasses, fullWidthClasses, className);

    // Determine if rendering as anchor or button
    const isLink = 'as' in props && props.as === 'a';

    const content = (
      <>
        {isLoading ? (
          <Spinner size={spinnerSizeMap[size]} variant="primary" />
        ) : (
          leftIcon && <span className="inline-flex mr-2">{leftIcon}</span>
        )}
        <span>{children}</span>
        {rightIcon && !isLoading && (
          <span className="inline-flex ml-2">{rightIcon}</span>
        )}
      </>
    );

    if (isLink) {
      const { href, onClick, ...linkProps } = props as any;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={`inline-flex items-center justify-center transition-colors ${combinedClasses}`}
          onClick={onClick}
          {...linkProps}
        >
          {content}
        </a>
      );
    }

    const { onClick, ...buttonProps } = props as any;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center transition-colors ${combinedClasses}`}
        onClick={onClick}
        {...buttonProps}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
