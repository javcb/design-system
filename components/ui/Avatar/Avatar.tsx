'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Avatar Variants
// ─────────────────────────────────────────
const avatarVariants = cva('relative inline-flex items-center justify-center overflow-hidden font-semibold', {
  variants: {
    size: {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-12 h-12 text-base',
      xl: 'w-16 h-16 text-lg',
      '2xl': 'w-20 h-20 text-xl',
    },
    shape: {
      circle: 'rounded-full',
      square: 'rounded-lg',
    },
  },
  defaultVariants: {
    size: 'md',
    shape: 'circle',
  },
});

const statusVariants = cva(
  'absolute rounded-full border-2 ring-[var(--color-surface)]',
  {
    variants: {
      size: {
        xs: 'w-2 h-2 bottom-0 right-0',
        sm: 'w-2.5 h-2.5 bottom-0 right-0',
        md: 'w-3 h-3 bottom-1 right-1',
        lg: 'w-3.5 h-3.5 bottom-1.5 right-1.5',
        xl: 'w-4 h-4 bottom-2 right-2',
        '2xl': 'w-5 h-5 bottom-2.5 right-2.5',
      },
      status: {
        online: 'bg-success border-success',
        offline: 'bg-neutral-400 border-neutral-400',
        away: 'bg-warning border-warning',
        busy: 'bg-error border-error',
      },
    },
  }
);

// ─────────────────────────────────────────
// Icon Component
// ─────────────────────────────────────────
const DefaultIcon = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-neutral-400"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// ─────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  initials?: string;
  name?: string;
  fallback?: React.ReactNode;
  status?: 'online' | 'offline' | 'away' | 'busy';
  className?: string;
}

// ─────────────────────────────────────────
// Avatar Component
// ─────────────────────────────────────────
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      size = 'md',
      shape = 'circle',
      src,
      alt = 'Avatar',
      initials,
      name,
      fallback,
      status,
      className = '',
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);

    const baseClasses = avatarVariants({ size, shape });
    const combined = cn(baseClasses, className);

    // Determine what to display: image → initials → icon
    const displayInitials = initials || (name ? getInitials(name) : undefined);

    return (
      <div ref={ref} className={combined}>
        {/* Image */}
        {src && !imageError && (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            unoptimized={true}
            onError={() => setImageError(true)}
          />
        )}

        {/* Initials Fallback */}
        {(!src || imageError) && displayInitials && (
          <div className="w-full h-full bg-primary text-white flex items-center justify-center">
            {displayInitials}
          </div>
        )}

        {/* Icon Fallback */}
        {(!src || imageError) && !displayInitials && (
          <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
            {fallback || <DefaultIcon />}
          </div>
        )}

        {/* Status Indicator */}
        {status && (
          <div
            className={statusVariants({
              size,
              status,
            })}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
