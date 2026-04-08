'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { IconButton } from '../IconButton';

// ─────────────────────────────────────────
// TypeScript Interfaces
// ─────────────────────────────────────────
export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  sticky?: boolean;
  bordered?: boolean;
  children?: React.ReactNode;
}

export interface NavbarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface NavbarContentProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface NavbarItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
}

export interface NavbarLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  isActive?: boolean;
  children?: React.ReactNode;
}

export interface NavbarActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface NavbarMobileToggleProps {
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
  className?: string;
  [key: string]: any;
}

export interface NavbarMobileMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

// ─────────────────────────────────────────
// Navbar Root
// ─────────────────────────────────────────
export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ sticky = true, bordered = true, children, className, ...props }, ref) => (
    <header
      ref={ref}
      role="banner"
      className={cn(
        'bg-surface',
        sticky && 'sticky top-0 z-40',
        bordered && 'border-b border-neutral-300',
        'transition-all duration-200',
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-6">{children}</div>
    </header>
  )
);

Navbar.displayName = 'Navbar';

// ─────────────────────────────────────────
// NavbarBrand
// ─────────────────────────────────────────
export const NavbarBrand = React.forwardRef<HTMLDivElement, NavbarBrandProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-2 font-semibold text-neutral-900', className)}
      {...props}
    >
      {children}
    </div>
  )
);

NavbarBrand.displayName = 'NavbarBrand';

// ─────────────────────────────────────────
// NavbarContent
// ─────────────────────────────────────────
export const NavbarContent = React.forwardRef<HTMLElement, NavbarContentProps>(
  ({ children, className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="main navigation"
      className={cn('hidden md:flex md:flex-1 md:justify-center', className)}
      {...props}
    >
      <ul className="flex items-center gap-6">{children}</ul>
    </nav>
  )
);

NavbarContent.displayName = 'NavbarContent';

// ─────────────────────────────────────────
// NavbarItem
// ─────────────────────────────────────────
export const NavbarItem = React.forwardRef<HTMLLIElement, NavbarItemProps>(
  ({ children, className, ...props }, ref) => (
    <li ref={ref} className={cn('inline-flex', className)} {...props}>
      {children}
    </li>
  )
);

NavbarItem.displayName = 'NavbarItem';

// ─────────────────────────────────────────
// NavbarLink
// ─────────────────────────────────────────
export const NavbarLink = React.forwardRef<HTMLAnchorElement, NavbarLinkProps>(
  ({ href, isActive, className, children, ...props }, ref) => (
    <a
      ref={ref}
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'text-neutral-700 transition-colors hover:text-neutral-900',
        isActive && 'text-primary font-medium',
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
);

NavbarLink.displayName = 'NavbarLink';

// ─────────────────────────────────────────
// NavbarActions
// ─────────────────────────────────────────
export const NavbarActions = React.forwardRef<HTMLDivElement, NavbarActionsProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-3', className)}
      {...props}
    >
      {children}
    </div>
  )
);

NavbarActions.displayName = 'NavbarActions';

// ─────────────────────────────────────────
// NavbarMobileToggle
// ─────────────────────────────────────────
export const NavbarMobileToggle = React.forwardRef<HTMLButtonElement, NavbarMobileToggleProps>(
  ({ isOpen = false, onToggle, className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      onClick={() => onToggle?.(!isOpen)}
      className={cn(
        'md:hidden inline-flex items-center justify-center rounded p-2 text-neutral-700 hover:bg-surface-offset focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]',
        className
      )}
      {...props}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {isOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>
  )
);

NavbarMobileToggle.displayName = 'NavbarMobileToggle';

// ─────────────────────────────────────────
// NavbarMobileMenu
// ─────────────────────────────────────────
export const NavbarMobileMenu = React.forwardRef<HTMLDivElement, NavbarMobileMenuProps>(
  ({ isOpen, onClose, children, className, ...props }, ref) => {
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

    if (!isOpen) return null;

    return (
      <>
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
        <div
          ref={ref}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className={cn(
            'fixed left-0 right-0 top-16 bg-surface border-b border-neutral-300 z-40 md:hidden overflow-y-auto max-h-[calc(100vh-64px)]',
            className
          )}
          {...props}
        >
          <nav className="px-4 py-4 flex flex-col gap-2">{children}</nav>
        </div>
      </>
    );
  }
);

NavbarMobileMenu.displayName = 'NavbarMobileMenu';
