'use client';

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Link Variants using CVA
// ─────────────────────────────────────────
const linkVariants = cva(
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)] transition-colors',
  {
    variants: {
      variant: {
        inline: 'text-primary underline underline-offset-2 hover:text-primary-hover',
        standalone: 'text-primary font-medium no-underline hover:underline hover:text-primary-hover',
        nav: 'text-neutral-700 font-medium no-underline hover:text-neutral-900',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'inline',
      size: 'md',
    },
  }
);

// ─────────────────────────────────────────
// External Link Icon
// ─────────────────────────────────────────
const ExternalLinkIcon = () => (
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
    className="inline ml-1 -mt-0.5"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface LinkProps extends VariantProps<typeof linkVariants> {
  href: string;
  external?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export type LinkComponentProps = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

// ─────────────────────────────────────────
// Link Component
// ─────────────────────────────────────────
export const Link = forwardRef<HTMLAnchorElement, LinkComponentProps>(
  (
    {
      variant = 'inline',
      size = 'md',
      href,
      external = false,
      disabled = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses = linkVariants({ variant, size });
    const disabledClasses = disabled ? 'text-neutral-500 cursor-not-allowed pointer-events-none' : '';
    const combinedClasses = cn(baseClasses, disabledClasses, className);

    // If disabled, render as span instead of anchor
    if (disabled) {
      return (
        <span ref={ref as React.Ref<HTMLSpanElement>} className={combinedClasses}>
          {children}
        </span>
      );
    }

    return (
      <a
        ref={ref}
        href={href}
        className={combinedClasses}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
        {external && <ExternalLinkIcon />}
      </a>
    );
  }
);

Link.displayName = 'Link';
