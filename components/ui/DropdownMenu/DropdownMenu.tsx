'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// DropdownMenu Context
// ─────────────────────────────────────────
interface DropdownMenuContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onClose: () => void;
  contentRef: React.RefObject<HTMLDivElement | null>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextType | undefined>(undefined);

const useDropdownMenu = () => {
  const context = React.useContext(DropdownMenuContext);
  if (!context) {
    throw new Error('DropdownMenu components must be used within DropdownMenu');
  }
  return context;
};

// ─────────────────────────────────────────
// DropdownMenu Item Variants
// ─────────────────────────────────────────
export const dropdownMenuItemVariants = cva(
  'w-full text-left px-3 py-2 text-sm rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]',
  {
    variants: {
      variant: {
        default: 'text-neutral-700 hover:bg-primary-subtle',
        destructive: 'text-error hover:bg-error-subtle',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed hover:bg-transparent',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'default',
      disabled: false,
    },
  }
);

// ─────────────────────────────────────────
// DropdownMenu Content Variants
// ─────────────────────────────────────────
export const dropdownMenuContentVariants = cva(
  'absolute min-w-max z-50 rounded-lg bg-surface-overlay border border-neutral-300 shadow-lg animate-in fade-in duration-200',
  {
    variants: {
      side: {
        top: 'bottom-full mb-2',
        bottom: 'top-full mt-2',
        left: 'right-full mr-2',
        right: 'left-full ml-2',
      },
      align: {
        start: 'left-0',
        center: 'left-1/2 -translate-x-1/2',
        end: 'right-0',
      },
    },
    defaultVariants: {
      side: 'bottom',
      align: 'start',
    },
  }
);

// ─────────────────────────────────────────
// TypeScript Interfaces
// ─────────────────────────────────────────
export interface DropdownMenuProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  asChild?: boolean;
}

export interface DropdownMenuContentProps extends VariantProps<typeof dropdownMenuContentVariants> {
  children?: React.ReactNode;
  className?: string;
}

export interface DropdownMenuItemProps
  extends VariantProps<typeof dropdownMenuItemVariants> {
  children?: React.ReactNode;
  onSelect?: () => void;
  className?: string;
}

export interface DropdownMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

// ─────────────────────────────────────────
// DropdownMenu Root Component
// ─────────────────────────────────────────
export const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ children, open, onOpenChange }, ref) => {
    const [internalOpen, setInternalOpen] = React.useState(open ?? false);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;

    const setIsOpen = (newOpen: boolean) => {
      if (isControlled) {
        onOpenChange?.(newOpen);
      } else {
        setInternalOpen(newOpen);
      }
    };

    const onClose = () => setIsOpen(false);

    const contentRef = React.useRef<HTMLDivElement>(null);
    const triggerRef = React.useRef<HTMLButtonElement>(null);

    // Handle outside click
    React.useEffect(() => {
      if (!isOpen) return;

      const handleMouseDown = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          contentRef.current &&
          triggerRef.current &&
          !contentRef.current.contains(target) &&
          !triggerRef.current.contains(target)
        ) {
          onClose();
        }
      };

      document.addEventListener('mousedown', handleMouseDown);
      return () => document.removeEventListener('mousedown', handleMouseDown);
    }, [isOpen]);

    // Handle escape key
    React.useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    return (
      <DropdownMenuContext.Provider
        value={{
          isOpen,
          setIsOpen,
          onClose,
          contentRef,
          triggerRef,
        }}
      >
        <div ref={ref} className="relative inline-block">
          {children}
        </div>
      </DropdownMenuContext.Provider>
    );
  }
);

DropdownMenu.displayName = 'DropdownMenu';

// ─────────────────────────────────────────
// DropdownMenu Trigger
// ─────────────────────────────────────────
export const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ children, className, ...props }, ref) => {
    const { isOpen, setIsOpen, triggerRef } = useDropdownMenu();

    React.useImperativeHandle(ref, () => triggerRef.current as HTMLButtonElement);

    return (
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className={cn(className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

// ─────────────────────────────────────────
// DropdownMenu Content
// ─────────────────────────────────────────
export const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ side = 'bottom', align = 'start', children, className }, ref) => {
    const { isOpen, contentRef, onClose } = useDropdownMenu();
    const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);

    const contentClasses = dropdownMenuContentVariants({ side, align });
    const disabled = false;

    // Get all menu items
    const menuItemsRef = React.useRef<HTMLButtonElement[]>([]);

    // Handle arrow key navigation
    React.useEffect(() => {
      if (!isOpen || menuItemsRef.current.length === 0) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        const items = menuItemsRef.current;

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            setFocusedIndex((prev) => {
              const next = (prev + 1) % items.length;
              items[next]?.focus();
              return next;
            });
            break;
          case 'ArrowUp':
            e.preventDefault();
            setFocusedIndex((prev) => {
              const next = prev <= 0 ? items.length - 1 : prev - 1;
              items[next]?.focus();
              return next;
            });
            break;
          case 'Enter':
          case ' ':
            e.preventDefault();
            if (focusedIndex >= 0) {
              items[focusedIndex]?.click();
            }
            break;
          case 'Tab':
            onClose();
            break;
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, focusedIndex, onClose]);

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={cn(contentClasses, className)}
        role="menu"
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              ...(child.type === DropdownMenuItem && {
                ref: (el: HTMLButtonElement) => {
                  if (el) menuItemsRef.current[index] = el;
                },
                onFocus: () => setFocusedIndex(index),
              }),
            } as React.Attributes);
          }
          return child;
        })}
      </div>
    );
  }
);

DropdownMenuContent.displayName = 'DropdownMenuContent';

// ─────────────────────────────────────────
// DropdownMenu Item
// ─────────────────────────────────────────
export const DropdownMenuItem = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  ({ variant = 'default', disabled = false, onSelect, children, className, ...props }, ref) => {
    const { onClose } = useDropdownMenu();

    const itemClasses = dropdownMenuItemVariants({ variant, disabled });

    const handleClick = () => {
      if (!disabled) {
        onSelect?.();
        onClose();
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        disabled={disabled ?? false}
        aria-disabled={disabled ?? false}
        tabIndex={-1}
        onClick={handleClick}
        className={cn(itemClasses, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

DropdownMenuItem.displayName = 'DropdownMenuItem';

// ─────────────────────────────────────────
// DropdownMenu Separator
// ─────────────────────────────────────────
export const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      className={cn('h-px bg-neutral-300 my-1', className)}
      {...props}
    />
  )
);

DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

// ─────────────────────────────────────────
// DropdownMenu Label
// ─────────────────────────────────────────
export const DropdownMenuLabel = React.forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-3 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider', className)}
      {...props}
    >
      {children}
    </div>
  )
);

DropdownMenuLabel.displayName = 'DropdownMenuLabel';
