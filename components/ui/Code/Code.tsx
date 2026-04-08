'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Code Variants using CVA
// ─────────────────────────────────────────
const codeVariants = cva('font-mono text-sm', {
  variants: {
    variant: {
      inline: 'bg-neutral-100 text-neutral-900 px-1.5 py-0.5 rounded-md',
      block: 'bg-neutral-50 border border-neutral-300 rounded-lg p-4 overflow-x-auto block',
    },
  },
  defaultVariants: {
    variant: 'inline',
  },
});

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface CodeProps extends VariantProps<typeof codeVariants> {
  language?: string;
  children?: string | React.ReactNode;
  className?: string;
}

// ─────────────────────────────────────────
// Code Component
// ─────────────────────────────────────────
export const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ variant = 'inline', language, children, className = '' }, ref) => {
    const baseClasses = codeVariants({ variant });

    // Inline variant
    if (variant === 'inline') {
      const combined = cn(baseClasses, className);
      return (
        <code ref={ref as React.Ref<HTMLElement>} className={combined}>
          {children}
        </code>
      );
    }

    // Block variant
    const combined = cn(baseClasses, className);
    return (
      <div className="relative">
        {language && (
          <div className="absolute top-3 right-3">
            <span className="text-neutral-500 text-xs bg-neutral-100 px-2 py-1 rounded">
              {language}
            </span>
          </div>
        )}
        <pre ref={ref as React.Ref<HTMLPreElement>} className={combined}>
          <code>{children}</code>
        </pre>
      </div>
    );
  }
);

Code.displayName = 'Code';
