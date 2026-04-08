'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Popover Variants using CVA
// ─────────────────────────────────────────
export const popoverVariants = cva(
  'absolute hidden group-hover:block group-focus-visible:block z-50 min-w-max rounded-lg shadow-lg bg-white border border-neutral-200 animate-in fade-in duration-200',
  {
    variants: {
      side: {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-3',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-3',
        left: 'right-full top-1/2 -translate-y-1/2 mr-3',
        right: 'left-full top-1/2 -translate-y-1/2 ml-3',
      },
    },
    defaultVariants: {
      side: 'top',
    },
  }
);

// ─────────────────────────────────────────
// TypeScript Interfaces
// ─────────────────────────────────────────
export interface PopoverProps extends VariantProps<typeof popoverVariants> {
  children?: React.ReactNode;
  content: React.ReactNode;
  hideArrow?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

export interface PopoverContentProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

// ─────────────────────────────────────────
// Popover Content Component
// ─────────────────────────────────────────
export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('rounded-lg bg-white border border-neutral-200 shadow-lg', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PopoverContent.displayName = 'PopoverContent';

// ─────────────────────────────────────────
// Get Arrow Styles
// ─────────────────────────────────────────
const getArrowClasses = (side: 'top' | 'bottom' | 'left' | 'right'): string => {
  const baseClasses = 'absolute w-2 h-2 pointer-events-none bg-white border-r border-b border-neutral-200';
  const arrowClasses = {
    top: `bottom-[-5px] left-1/2 -translate-x-1/2 rotate-45`,
    bottom: `top-[-5px] left-1/2 -translate-x-1/2 rotate-45`,
    left: `right-[-5px] top-1/2 -translate-y-1/2 rotate-45`,
    right: `left-[-5px] top-1/2 -translate-y-1/2 rotate-45`,
  };
  return `${baseClasses} ${arrowClasses[side]}`;
};

// ─────────────────────────────────────────
// Popover Trigger Component
// ─────────────────────────────────────────
export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      side = 'top',
      children,
      content,
      hideArrow = false,
      className = '',
      triggerClassName = '',
      contentClassName = '',
      ...props
    },
    ref
  ) => {
    const contentClasses = popoverVariants({ side });

    return (
      <div
        ref={ref}
        className={cn('group relative inline-block', className)}
        {...props}
      >
        <div className={cn('cursor-pointer', triggerClassName)}>
          {children}
        </div>
        <div className={cn(contentClasses, contentClassName)}>
          {content}
          {!hideArrow && side && <div className={getArrowClasses(side)} />}
        </div>
      </div>
    );
  }
);

Popover.displayName = 'Popover';
