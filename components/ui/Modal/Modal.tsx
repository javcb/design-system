'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Modal Variants using CVA
// ─────────────────────────────────────────
export const modalVariants = cva('bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto', {
  variants: {
    size: {
      sm: 'w-full max-w-sm',
      md: 'w-full max-w-md',
      lg: 'w-full max-w-lg',
      xl: 'w-full max-w-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// ─────────────────────────────────────────
// TypeScript Interfaces
// ─────────────────────────────────────────
export interface ModalProps extends VariantProps<typeof modalVariants> {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  showBackdrop?: boolean;
}

export interface ModalHeaderProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  onClose?: () => void;
  className?: string;
  [key: string]: any;
}

export interface ModalBodyProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export interface ModalFooterProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

// ─────────────────────────────────────────
// Modal Header Component
// ─────────────────────────────────────────
export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
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
            aria-label="Close modal"
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

ModalHeader.displayName = 'ModalHeader';

// ─────────────────────────────────────────
// Modal Body Component
// ─────────────────────────────────────────
export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
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

ModalBody.displayName = 'ModalBody';

// ─────────────────────────────────────────
// Modal Footer Component
// ─────────────────────────────────────────
export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
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

ModalFooter.displayName = 'ModalFooter';

// ─────────────────────────────────────────
// Modal Backdrop Component
// ─────────────────────────────────────────
interface ModalBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClick?: () => void;
}

const ModalBackdrop = React.forwardRef<HTMLDivElement, ModalBackdropProps>(
  ({ isOpen, onClick, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          'fixed inset-0 bg-black/50 transition-opacity duration-300 z-40',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
          className
        )}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

ModalBackdrop.displayName = 'ModalBackdrop';

// ─────────────────────────────────────────
// Modal Component
// ─────────────────────────────────────────
export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      size = 'md',
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
    const modalClasses = modalVariants({ size });

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

    // Prevent body scroll when modal is open
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

    // Focus trap: manage focus inside modal
    const modalRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (!isOpen || !modalRef.current) return;

      // Find all focusable elements
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      // Auto-focus first element
      firstElement?.focus();

      document.addEventListener('keydown', handleTabKey);
      return () => document.removeEventListener('keydown', handleTabKey);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <>
        {showBackdrop && (
          <ModalBackdrop
            isOpen={isOpen}
            onClick={closeOnBackdropClick ? onClose : undefined}
          />
        )}
        <div
          ref={ref}
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-hidden={!isOpen}
          {...props}
        >
          <div className={cn(modalClasses, className)}>
            {children}
          </div>
        </div>
      </>
    );
  }
);

Modal.displayName = 'Modal';
