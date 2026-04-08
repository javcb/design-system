'use client';

import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { inputBase, inputStates, inputSizes, inputDisabledState } from '@/lib/input-variants';

// ─────────────────────────────────────────
// Textarea Variants
// ─────────────────────────────────────────
const textareaVariants = cva(inputBase, {
  variants: {
    size: inputSizes,
    state: inputStates,
  },
  defaultVariants: {
    size: 'md',
    state: 'default',
  },
});

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  showCharacterCount?: boolean;
  showResizeControl?: boolean;
}

// ─────────────────────────────────────────
// Textarea Component
// ─────────────────────────────────────────
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = 'md',
      state = 'default',
      showCharacterCount = false,
      showResizeControl = true,
      maxLength,
      className = '',
      onChange,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = useState(
      (defaultValue as string)?.length || 0
    );

    const baseClasses = textareaVariants({ size, state });
    const resizeClasses = showResizeControl ? 'resize-vertical' : 'resize-none';
    const combined = cn(baseClasses, inputDisabledState, resizeClasses, className);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      if (onChange) onChange(e);
    };

    const isOverLimit = maxLength && charCount > maxLength * 0.8;
    const isAtLimit = maxLength && charCount >= maxLength;

    const countColor = isAtLimit
      ? 'text-error'
      : isOverLimit
        ? 'text-warning'
        : 'text-neutral-400';

    return (
      <div className="flex flex-col gap-1.5">
        <textarea
          ref={ref}
          className={combined}
          maxLength={maxLength}
          onChange={handleChange}
          defaultValue={defaultValue}
          {...props}
        />
        {showCharacterCount && maxLength && (
          <div className={cn('text-xs font-medium', countColor)}>
            {charCount} / {maxLength}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
