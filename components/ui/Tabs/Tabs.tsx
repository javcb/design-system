'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Tabs Context
// ─────────────────────────────────────────
interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

const useTabs = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within Tabs');
  }
  return context;
};

// ─────────────────────────────────────────
// CVA Variants
// ─────────────────────────────────────────
export const tabsListVariants = cva(
  'inline-flex rounded-lg bg-surface-offset p-1',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row border-b border-neutral-300 bg-transparent p-0 w-full',
        vertical: 'flex-col gap-1',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

export const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded px-3 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]',
  {
    variants: {
      orientation: {
        horizontal: '',
        vertical: 'w-full justify-start',
      },
      state: {
        active: 'bg-surface text-neutral-900 shadow-sm border-b-2 border-primary',
        inactive: 'text-neutral-500 hover:text-neutral-700 hover:bg-surface',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed hover:bg-transparent hover:text-neutral-500',
        false: '',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      state: 'inactive',
      disabled: false,
    },
  }
);

// ─────────────────────────────────────────
// TypeScript Interfaces
// ─────────────────────────────────────────
export interface TabsProps {
  children?: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children?: React.ReactNode;
  className?: string;
}

// ─────────────────────────────────────────
// Tabs Root Component
// ─────────────────────────────────────────
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      children,
      defaultValue,
      value,
      onValueChange,
      orientation = 'horizontal',
      className = '',
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || '');
    const isControlled = value !== undefined;
    const activeValue = isControlled ? value : internalValue;

    const handleValueChange = (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <TabsContext.Provider
        value={{
          value: activeValue,
          onValueChange: handleValueChange,
          orientation,
        }}
      >
        <div ref={ref} className={className}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

// ─────────────────────────────────────────
// TabsList
// ─────────────────────────────────────────
export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className, ...props }, ref) => {
    const { orientation } = useTabs();
    const triggerRefs = React.useRef<HTMLButtonElement[]>([]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const triggers = triggerRefs.current.filter(t => t && !t.disabled);
      if (triggers.length === 0) return;

      const currentIndex = triggers.findIndex(t => document.activeElement === t);
      let nextIndex = currentIndex;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          nextIndex = (currentIndex + 1) % triggers.length;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
          break;
        case 'Home':
          e.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          nextIndex = triggers.length - 1;
          break;
        default:
          return;
      }

      triggers[nextIndex]?.focus();
    };

    const listClasses = tabsListVariants({ orientation });

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={orientation}
        className={cn(listClasses, className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === TabsTrigger) {
            return React.cloneElement(child, {
              ref: (el: HTMLButtonElement) => {
                if (el) triggerRefs.current[index] = el;
              },
            } as React.Attributes);
          }
          return child;
        })}
      </div>
    );
  }
);

TabsList.displayName = 'TabsList';

// ─────────────────────────────────────────
// TabsTrigger
// ─────────────────────────────────────────
export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, disabled = false, children, className, ...props }, ref) => {
    const { value: activeValue, onValueChange, orientation } = useTabs();
    const isActive = activeValue === value;
    const state = isActive ? ('active' as const) : ('inactive' as const);

    const triggerClasses = tabsTriggerVariants({
      orientation,
      state,
      disabled,
    });

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        aria-controls={`panel-${value}`}
        id={`tab-${value}`}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        onClick={() => !disabled && onValueChange(value)}
        className={cn(triggerClasses, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

// ─────────────────────────────────────────
// TabsContent
// ─────────────────────────────────────────
export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, children, className, ...props }, ref) => {
    const { value: activeValue } = useTabs();
    const isActive = activeValue === value;

    return (
      <div
        ref={ref}
        role="tabpanel"
        aria-labelledby={`tab-${value}`}
        id={`panel-${value}`}
        tabIndex={0}
        hidden={!isActive}
        className={cn('pt-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = 'TabsContent';
