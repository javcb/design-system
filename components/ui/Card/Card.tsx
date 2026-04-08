'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Card Variants
// ─────────────────────────────────────────
export const cardVariants = cva(
  'rounded-lg transition-all',
  {
    variants: {
      variant: {
        default: 'bg-surface border border-neutral-300',
        outlined: 'bg-transparent border-2 border-neutral-300',
        elevated: 'bg-surface shadow-md border-transparent',
        ghost: 'bg-transparent border-transparent',
      },
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

// ─────────────────────────────────────────
// TypeScript Interfaces
// ─────────────────────────────────────────
export interface CardProps
  extends React.HTMLAttributes<HTMLArticleElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

// ─────────────────────────────────────────
// Card Root Component
// ─────────────────────────────────────────
export const Card = React.forwardRef<HTMLArticleElement, CardProps>(
  ({ className, variant, padding, asChild = false, ...props }, ref) => {
    const baseClasses = cardVariants({ variant, padding });
    return (
      <article
        ref={ref}
        className={cn(baseClasses, className)}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

// ─────────────────────────────────────────
// CardHeader Component
// ─────────────────────────────────────────
let cardTitleId = 0;

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('pb-2 space-y-1', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

// ─────────────────────────────────────────
// CardTitle Component
// ─────────────────────────────────────────
export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    const id = React.useMemo(() => `card-title-${++cardTitleId}`, []);
    return (
      <h3
        ref={ref}
        id={id}
        className={cn('text-neutral-900 font-semibold text-lg', className)}
        {...props}
      />
    );
  }
);
CardTitle.displayName = 'CardTitle';

// ─────────────────────────────────────────
// CardDescription Component
// ─────────────────────────────────────────
export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-neutral-500 text-sm', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

// ─────────────────────────────────────────
// CardContent Component
// ─────────────────────────────────────────
export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('', className)}
      {...props}
    />
  )
);
CardContent.displayName = 'CardContent';

// ─────────────────────────────────────────
// CardFooter Component
// ─────────────────────────────────────────
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('pt-4 border-t border-neutral-300 flex items-center gap-2', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';
