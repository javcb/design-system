'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Skeleton Variants using CVA
// ─────────────────────────────────────────
const skeletonVariants = cva('bg-neutral-100 animate-pulse', {
  variants: {
    variant: {
      block: 'rounded-md',
      text: 'rounded-sm w-full',
      circle: 'rounded-full',
      avatar: 'rounded-full',
    },
  },
  defaultVariants: {
    variant: 'block',
  },
});

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface SkeletonProps extends VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
}

// ─────────────────────────────────────────
// Helper: Convert width/height to CSS
// ─────────────────────────────────────────
const getSize = (value: string | number | undefined): string => {
  if (value === undefined) return '';
  if (typeof value === 'number') return `${value}px`;
  return value;
};

// ─────────────────────────────────────────
// Skeleton Component
// ─────────────────────────────────────────
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'block', width, height, lines = 1, className = '' }, ref) => {
    // Avatar sizes (preset)
    const avatarSizes = {
      sm: { width: '32px', height: '32px' },
      md: { width: '40px', height: '40px' },
      lg: { width: '48px', height: '48px' },
    };

    // For text variant with multiple lines
    if (variant === 'text' && lines > 1) {
      return (
        <div className={cn('space-y-2', className)} ref={ref}>
          {Array.from({ length: lines }).map((_, i) => {
            const isLastLine = i === lines - 1;
            const w = isLastLine ? 'w-3/4' : 'w-full';
            const style = {
              height: getSize(height) || '1rem',
            };
            return (
              <div
                key={i}
                className={cn(skeletonVariants({ variant }), w)}
                style={style}
              />
            );
          })}
        </div>
      );
    }

    // For single line text
    if (variant === 'text') {
      const style = {
        width: getSize(width) || '100%',
        height: getSize(height) || '1rem',
      };
      const baseClasses = skeletonVariants({ variant });
      const combined = cn(baseClasses, className);
      return <div ref={ref} className={combined} style={style} />;
    }

    // For avatar variant (use preset sizes)
    if (variant === 'avatar') {
      let avatarSize = avatarSizes.md;
      if (typeof width === 'string' && width in avatarSizes) {
        avatarSize = avatarSizes[width as keyof typeof avatarSizes];
      } else if (width === 'sm') {
        avatarSize = avatarSizes.sm;
      } else if (width === 'lg') {
        avatarSize = avatarSizes.lg;
      }

      const style = {
        width: getSize(avatarSize.width),
        height: getSize(avatarSize.height),
      };
      const baseClasses = skeletonVariants({ variant });
      const combined = cn(baseClasses, className);
      return <div ref={ref} className={combined} style={style} />;
    }

    // For circle variant (equal width/height)
    if (variant === 'circle') {
      const size = getSize(width) || getSize(height) || '60px';
      const style = {
        width: size,
        height: size,
      };
      const baseClasses = skeletonVariants({ variant });
      const combined = cn(baseClasses, className);
      return <div ref={ref} className={combined} style={style} />;
    }

    // For block variant (default)
    const style = {
      width: getSize(width) || '100%',
      height: getSize(height) || '100px',
    };
    const baseClasses = skeletonVariants({ variant });
    const combined = cn(baseClasses, className);
    return <div ref={ref} className={combined} style={style} />;
  }
);

Skeleton.displayName = 'Skeleton';
