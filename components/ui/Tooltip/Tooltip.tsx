'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Tooltip Variants using CVA
// ─────────────────────────────────────────
export const tooltipVariants = cva(
  'absolute hidden group-hover:inline group-focus-visible:inline z-50 px-2 py-1 rounded text-sm font-medium whitespace-nowrap pointer-events-none animate-in fade-in duration-200',
  {
    variants: {
      variant: {
        default: 'bg-neutral-900 text-white',
        dark: 'bg-neutral-800 text-white',
        light: 'bg-neutral-100 text-neutral-900',
      },
      side: {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      side: 'top',
    },
  }
);

// ─────────────────────────────────────────
// Tooltip Arrow Styles
// ─────────────────────────────────────────
const getArrowClasses = (side: 'top' | 'bottom' | 'left' | 'right'): string => {
  const baseClasses = 'absolute w-2 h-2 pointer-events-none';
  const arrowClasses = {
    top: `bottom-[-4px] left-1/2 -translate-x-1/2 rotate-45`,
    bottom: `top-[-4px] left-1/2 -translate-x-1/2 rotate-45`,
    left: `right-[-4px] top-1/2 -translate-y-1/2 rotate-45`,
    right: `left-[-4px] top-1/2 -translate-y-1/2 rotate-45`,
  };
  return `${baseClasses} ${arrowClasses[side]}`;
};

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  children?: React.ReactNode;
  content: React.ReactNode;
  delayMs?: number;
  hideArrow?: boolean;
  className?: string;
}

// ─────────────────────────────────────────
// Tooltip Trigger Props (for wrapper element)
// ─────────────────────────────────────────
export interface TooltipTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  tooltip: React.ReactNode;
  tooltipVariant?: VariantProps<typeof tooltipVariants>['variant'];
  tooltipSide?: VariantProps<typeof tooltipVariants>['side'];
  hideArrow?: boolean;
  className?: string;
}

// ─────────────────────────────────────────
// Tooltip Content Component
// ─────────────────────────────────────────
export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      variant = 'default',
      side = 'top',
      children,
      content,
      hideArrow = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses = tooltipVariants({ variant, side });
    const combined = cn(baseClasses, className);

    // Get background color for arrow
    const getBgColorClass = (variant: string) => {
      switch (variant) {
        case 'dark':
          return 'bg-neutral-800';
        case 'light':
          return 'bg-neutral-100';
        default:
          return 'bg-neutral-900';
      }
    };

    return (
      <div ref={ref} className={combined} {...props}>
        {children || content}
        {!hideArrow && side && variant && (
          <div className={cn(getArrowClasses(side), getBgColorClass(variant))} />
        )}
      </div>
    );
  }
);

TooltipContent.displayName = 'TooltipContent';

// ─────────────────────────────────────────
// Tooltip Trigger Wrapper Component
// ─────────────────────────────────────────
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipTriggerProps>(
  (
    {
      children,
      tooltip,
      tooltipVariant = 'default',
      tooltipSide = 'top',
      hideArrow = false,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn('group relative inline-block', className)} {...props}>
        {children}
        <TooltipContent
          variant={tooltipVariant}
          side={tooltipSide}
          content={tooltip}
          hideArrow={hideArrow}
        />
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';
