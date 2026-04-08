'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Tooltip } from '@/components/ui/Tooltip';

// ─────────────────────────────────────────
// CVA Variants
// ─────────────────────────────────────────
export const sidebarVariants = cva(
  'flex flex-col bg-surface border-r border-neutral-300 transition-all duration-200 overflow-y-auto',
  {
    variants: {
      width: {
        sm: 'w-48',
        md: 'w-60',
        lg: 'w-72',
      },
    },
    defaultVariants: {
      width: 'md',
    },
  }
);

export const sidebarItemVariants = cva(
  'flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]',
  {
    variants: {
      state: {
        active: 'bg-primary-subtle text-primary font-medium',
        inactive: 'text-neutral-700 hover:bg-surface-offset hover:text-neutral-900',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      state: 'inactive',
      disabled: false,
    },
  }
);

// ─────────────────────────────────────────
// TypeScript Interfaces
// ─────────────────────────────────────────
export interface SidebarProps extends VariantProps<typeof sidebarVariants> {
  children?: React.ReactNode;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  className?: string;
}

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface SidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface SidebarSectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  isActive?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

export interface SidebarItemIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface SidebarItemLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface SidebarItemBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface SidebarCollapseToggleProps {
  collapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
  className?: string;
  [key: string]: any;
}

// ─────────────────────────────────────────
// Sidebar Root
// ─────────────────────────────────────────
export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      width = 'md',
      collapsed,
      defaultCollapsed,
      onCollapsedChange,
      children,
      className,
    },
    ref
  ) => {
    const [internalCollapsed, setInternalCollapsed] = React.useState(defaultCollapsed || false);
    const isControlled = collapsed !== undefined;
    const isCollapsedValue = isControlled ? collapsed : internalCollapsed;

    const handleCollapsedChange = (newCollapsed: boolean) => {
      if (!isControlled) {
        setInternalCollapsed(newCollapsed);
      }
      onCollapsedChange?.(newCollapsed);
    };

    const sidebarClasses = sidebarVariants({
      width: isCollapsedValue ? undefined : width,
    });

    return (
      <SidebarContext.Provider value={{ collapsed: isCollapsedValue, onCollapsedChange: handleCollapsedChange }}>
        <aside
          ref={ref}
          className={cn(
            sidebarClasses,
            isCollapsedValue && 'w-16',
            className
          )}
        >
          {children}
        </aside>
      </SidebarContext.Provider>
    );
  }
);

Sidebar.displayName = 'Sidebar';

// ─────────────────────────────────────────
// Sidebar Context
// ─────────────────────────────────────────
interface SidebarContextType {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('Sidebar components must be used within Sidebar');
  }
  return context;
};

// ─────────────────────────────────────────
// SidebarHeader
// ─────────────────────────────────────────
export const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-4 py-4 border-b border-neutral-300', className)}
      {...props}
    >
      {children}
    </div>
  )
);

SidebarHeader.displayName = 'SidebarHeader';

// ─────────────────────────────────────────
// SidebarContent
// ─────────────────────────────────────────
export const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-1 overflow-y-auto px-2 py-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);

SidebarContent.displayName = 'SidebarContent';

// ─────────────────────────────────────────
// SidebarSection
// ─────────────────────────────────────────
export const SidebarSection = React.forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ children, className, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn('flex flex-col gap-1 mb-4', className)}
      {...props}
    >
      {children}
    </nav>
  )
);

SidebarSection.displayName = 'SidebarSection';

// ─────────────────────────────────────────
// SidebarSectionLabel
// ─────────────────────────────────────────
export const SidebarSectionLabel = React.forwardRef<HTMLDivElement, SidebarSectionLabelProps>(
  ({ children, className, ...props }, ref) => {
    const { collapsed } = useSidebar();

    return (
      <div
        ref={ref}
        className={cn(
          'text-xs uppercase tracking-wider text-neutral-500 font-semibold px-3 py-2',
          collapsed && 'hidden'
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarSectionLabel.displayName = 'SidebarSectionLabel';

// ─────────────────────────────────────────
// SidebarItem
// ─────────────────────────────────────────
export const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ isActive, disabled, onClick, children, className, ...props }, ref) => {
    const { collapsed } = useSidebar();
    const state = isActive ? ('active' as const) : ('inactive' as const);
    const itemClasses = sidebarItemVariants({ state, disabled });

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        onClick={onClick}
        aria-current={isActive ? 'page' : undefined}
        className={cn(itemClasses, className, 'w-full text-left')}
        {...props}
      >
        {collapsed ? (
          <Tooltip tooltip={children} tooltipSide="right" hideArrow>
            <span className="flex-1">{children}</span>
          </Tooltip>
        ) : (
          children
        )}
      </button>
    );
  }
);

SidebarItem.displayName = 'SidebarItem';

// ─────────────────────────────────────────
// SidebarItemIcon
// ─────────────────────────────────────────
export const SidebarItemIcon = React.forwardRef<HTMLDivElement, SidebarItemIconProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-shrink-0 w-5 h-5 flex items-center justify-center', className)}
      {...props}
    >
      {children}
    </div>
  )
);

SidebarItemIcon.displayName = 'SidebarItemIcon';

// ─────────────────────────────────────────
// SidebarItemLabel
// ─────────────────────────────────────────
export const SidebarItemLabel = React.forwardRef<HTMLDivElement, SidebarItemLabelProps>(
  ({ children, className, ...props }, ref) => {
    const { collapsed } = useSidebar();

    return (
      <div
        ref={ref}
        className={cn(
          'flex-1 truncate',
          collapsed && 'hidden'
        )}
        aria-hidden={collapsed}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarItemLabel.displayName = 'SidebarItemLabel';

// ─────────────────────────────────────────
// SidebarItemBadge
// ─────────────────────────────────────────
export const SidebarItemBadge = React.forwardRef<HTMLDivElement, SidebarItemBadgeProps>(
  ({ children, className, ...props }, ref) => {
    const { collapsed } = useSidebar();

    return (
      <div
        ref={ref}
        className={cn(
          'flex-shrink-0 text-xs font-medium',
          collapsed && 'hidden'
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarItemBadge.displayName = 'SidebarItemBadge';

// ─────────────────────────────────────────
// SidebarFooter
// ─────────────────────────────────────────
export const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('border-t border-neutral-300 px-4 py-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);

SidebarFooter.displayName = 'SidebarFooter';

// ─────────────────────────────────────────
// SidebarCollapseToggle
// ─────────────────────────────────────────
export const SidebarCollapseToggle = React.forwardRef<
  HTMLButtonElement,
  SidebarCollapseToggleProps
>(({ collapsed, onToggle, className, ...props }, ref) => {
  const { collapsed: sidebarCollapsed, onCollapsedChange } = useSidebar();
  const isCollapsed = collapsed ?? sidebarCollapsed;

  return (
    <button
      ref={ref}
      type="button"
      aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      aria-expanded={!isCollapsed}
      onClick={() => {
        onToggle?.(!isCollapsed);
        onCollapsedChange(!isCollapsed);
      }}
      className={cn(
        'flex items-center justify-center rounded p-2 text-neutral-700 hover:bg-surface-offset focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]',
        className
      )}
      {...props}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {isCollapsed ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7M5 5l7 7-7 7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7M19 19l-7-7 7-7" />
        )}
      </svg>
    </button>
  );
});

SidebarCollapseToggle.displayName = 'SidebarCollapseToggle';
