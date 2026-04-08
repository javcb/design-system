'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Drawer Variants using CVA
// ─────────────────────────────────────────
export const drawerVariants = cva(
  'fixed bg-white shadow-xl max-h-screen overflow-y-auto transition-transform duration-300 ease-out z-50',
  {
    variants: {
      side: {
        left: 'left-0 top-0 h-screen w-80 translate-x-0 data-[open=false]:-translate-x-full',
        right: 'right-0 top-0 h-screen w-80 translate-x-0 data-[open=false]:translate-x-full',
        top: 'top-0 left-0 w-screen h-64 translate-y-0 data-[open=false]:-translate-y-full',
        bottom: 'bottom-0 left-0 w-screen h-64 translate-y-0 data-[open=false]:translate-y-full',
      },
    },
    defaultVariants: {
      side: 'left',
    },
  }
);

// ─────────────────────────────────────────
// TypeScript Interfaces
// ─────────────────────────────────────────
export interface DrawerProps extends VariantProps<typeof drawerVariants> {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  showBackdrop?: boolean;
}

export interface DrawerHeaderProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  onClose?: () => void;
  className?: string;
  [key: string]: any;
}

export interface DrawerBodyProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export interface DrawerFooterProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

// ─────────────────────────────────────────
// Drawer Header Component
// ─────────────────────────────────────────
export const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  (
    { title, children, showCloseButton = true, onClose, className = '', ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between gap-4 border-b border-neutral-200 px-6 py-4', className)}
        {...props}
      >
        <div className="flex-1">
          {title && <div className="text-lg font-semibold text-neutral-900">{title}</div>}
          {children && <div>{children}</div>}
        </div>
        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 text-neutral-400 hover:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)] rounded"
            aria-label="Close drawer"
            type="button"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

DrawerHeader.displayName = 'DrawerHeader';

// ─────────────────────────────────────────
// Drawer Body Component
// ─────────────────────────────────────────
export const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('px-6 py-4 text-neutral-700', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DrawerBody.displayName = 'DrawerBody';

// ─────────────────────────────────────────
// Drawer Footer Component
// ─────────────────────────────────────────
export const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-end gap-3 border-t border-neutral-200 px-6 py-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DrawerFooter.displayName = 'DrawerFooter';

// ─────────────────────────────────────────
// Drawer Backdrop Component
// ─────────────────────────────────────────
interface DrawerBackdropProps {
  isOpen: boolean;
  onClick?: () => void;
}

const DrawerBackdrop = React.forwardRef<HTMLDivElement, DrawerBackdropProps>(
  ({ isOpen, onClick }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          'fixed inset-0 bg-black/50 transition-opacity duration-300 z-40',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        aria-hidden="true"
      />
    );
  }
);

DrawerBackdrop.displayName = 'DrawerBackdrop';

// ─────────────────────────────────────────
// Drawer Component
// ─────────────────────────────────────────
export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      side = 'left',
      isOpen,
      onClose,
      children,
      className = '',
      closeOnBackdropClick = true,
      closeOnEscape = true,
      showBackdrop = true,
      ...props
    },
    ref
  ) => {
    // Handle escape key
    React.useEffect(() => {
      if (!isOpen || !closeOnEscape) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, closeOnEscape, onClose]);

    // Prevent body scroll when drawer is open
    React.useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }

      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isOpen]);

    // Get width/height based on side
    const getSizeClasses = (side: string) => {
      switch (side) {
        case 'right':
        case 'left':
          return 'w-80';
        case 'top':
        case 'bottom':
          return 'h-64';
        default:
          return 'w-80';
      }
    };

    // Get position and transform classes
    const getPositionClasses = (side: string, isOpen: boolean) => {
      const baseClasses = `fixed ${getSizeClasses(side)} bg-white shadow-xl max-h-screen overflow-y-auto transition-transform duration-300 ease-out z-50`;

      switch (side) {
        case 'left':
          return `${baseClasses} left-0 top-0 h-screen ${isOpen ? 'translate-x-0' : '-translate-x-full'}`;
        case 'right':
          return `${baseClasses} right-0 top-0 h-screen ${isOpen ? 'translate-x-0' : 'translate-x-full'}`;
        case 'top':
          return `${baseClasses} top-0 left-0 w-screen ${isOpen ? 'translate-y-0' : '-translate-y-full'}`;
        case 'bottom':
          return `${baseClasses} bottom-0 left-0 w-screen ${isOpen ? 'translate-y-0' : 'translate-y-full'}`;
        default:
          return baseClasses;
      }
    };

    return (
      <>
        {showBackdrop && (
          <DrawerBackdrop
            isOpen={isOpen}
            onClick={closeOnBackdropClick ? onClose : undefined}
          />
        )}
        <div
          ref={ref}
          className={cn(getPositionClasses(side || 'left', isOpen), className)}
          role="dialog"
          aria-modal="true"
          aria-hidden={!isOpen}
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);

Drawer.displayName = 'Drawer';
