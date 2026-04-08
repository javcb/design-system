'use client';

import React, { forwardRef } from 'react';

// ─────────────────────────────────────────
// Variants Map — Single Source of Truth
// ─────────────────────────────────────────
const variants = {
  primary: {
    sm: 'bg-primary text-text-on-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none text-sm px-3 py-1.5 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]',
    md: 'bg-primary text-text-on-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none text-base px-4 py-2 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]',
    lg: 'bg-primary text-text-on-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none text-lg px-6 py-3 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]',
  },
  secondary: {
    sm: 'bg-surface-raised text-neutral-900 border border-neutral-300 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none text-sm px-3 py-1.5 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]',
    md: 'bg-surface-raised text-neutral-900 border border-neutral-300 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none text-base px-4 py-2 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]',
    lg: 'bg-surface-raised text-neutral-900 border border-neutral-300 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none text-lg px-6 py-3 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]',
  },
  ghost: {
    sm: 'bg-transparent text-primary hover:bg-primary-subtle disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none text-sm px-3 py-1.5 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]',
    md: 'bg-transparent text-primary hover:bg-primary-subtle disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none text-base px-4 py-2 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]',
    lg: 'bg-transparent text-primary hover:bg-primary-subtle disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none text-lg px-6 py-3 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]',
  },
  destructive: {
    sm: 'bg-error text-text-on-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none text-sm px-3 py-1.5 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]',
    md: 'bg-error text-text-on-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none text-base px-4 py-2 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]',
    lg: 'bg-error text-text-on-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none text-lg px-6 py-3 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]',
  },
  accent: {
    sm: 'bg-accent text-text-on-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none text-sm px-3 py-1.5 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]',
    md: 'bg-accent text-text-on-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none text-base px-4 py-2 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]',
    lg: 'bg-accent text-text-on-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none text-lg px-6 py-3 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]',
  },
};

// ─────────────────────────────────────────
// Spinner Component (inline SVG)
// ─────────────────────────────────────────
interface SpinnerProps {
  size: 'sm' | 'md' | 'lg';
}

const Spinner = ({ size }: SpinnerProps) => {
  const sizeMap = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <svg
      className={`${sizeMap[size]} animate-spin`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface ButtonProps {
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

export interface ButtonAsLinkProps extends Omit<ButtonProps, 'as' | 'onClick'> {
  as: 'a';
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface ButtonAsButtonProps extends Omit<ButtonProps, 'as'> {
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
    const baseClasses = variants[variant][size];
    const loadingClasses = isLoading ? 'pointer-events-none' : '';
    const fullWidthClasses = fullWidth ? 'w-full' : '';
    const combinedClasses = `${baseClasses} ${loadingClasses} ${fullWidthClasses} ${className}`.trim();

    // Determine if rendering as anchor or button
    const isLink = 'as' in props && props.as === 'a';

    const content = (
      <>
        {isLoading ? (
          <Spinner size={size} />
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
