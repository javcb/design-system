'use client';

import React, { forwardRef } from 'react';
import { buttonVariants, type ButtonProps } from '../Button';
import { Spinner } from '../Spinner';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Spinner size mapping for IconButton sizes
// ─────────────────────────────────────────
const spinnerSizeMap = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
} as const;

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
  label: string;
}

export interface IconButtonAsLinkProps extends Omit<IconButtonProps, 'onClick'> {
  as: 'a';
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface IconButtonAsButtonProps extends IconButtonProps {
  as?: 'button';
}

export type IconButtonComponentProps = IconButtonAsButtonProps | IconButtonAsLinkProps;

// ─────────────────────────────────────────
// Size Map for Square Dimensions
// ─────────────────────────────────────────
const iconButtonSizeMap = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

// ─────────────────────────────────────────
// IconButton Component
// ─────────────────────────────────────────
export const IconButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  IconButtonComponentProps
>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      isLoading = false,
      icon,
      label,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses = buttonVariants({ variant, size });
    const squareSizeClasses = iconButtonSizeMap[size];
    const loadingClasses = isLoading ? 'pointer-events-none' : '';
    const combinedClasses = cn(
      baseClasses,
      squareSizeClasses,
      loadingClasses,
      // Override padding since we're using fixed dimensions
      'p-0',
      className
    );

    // Determine if rendering as anchor or button
    const isLink = 'as' in props && props.as === 'a';

    const content = (
      <>
        {isLoading ? (
          <Spinner size={spinnerSizeMap[size]} variant="primary" />
        ) : (
          icon
        )}
      </>
    );

    if (isLink) {
      const { href, onClick, ...linkProps } = props as any;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          aria-label={label}
          role="button"
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
        aria-label={label}
        className={`inline-flex items-center justify-center transition-colors ${combinedClasses}`}
        onClick={onClick}
        {...buttonProps}
      >
        {content}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
