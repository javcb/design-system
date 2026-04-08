'use client';

import React, { createContext, useContext } from 'react';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// RadioGroup Context
// ─────────────────────────────────────────
interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(
  undefined
);

export const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('useRadioGroup must be used within RadioGroup');
  }
  return context;
};

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface RadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  legend?: string;
  description?: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

// ─────────────────────────────────────────
// RadioGroup Component
// ─────────────────────────────────────────
export const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      name,
      value,
      onChange,
      legend,
      description,
      disabled = false,
      children,
      className = '',
    },
    ref
  ) => {
    const contextValue: RadioGroupContextValue = {
      name,
      value,
      onChange,
    };

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <fieldset
          ref={ref}
          disabled={disabled}
          className={cn('space-y-3', disabled && 'opacity-50', className)}
        >
          {legend && (
            <legend className="text-sm font-semibold text-default">
              {legend}
            </legend>
          )}
          {description && (
            <p className="text-xs text-neutral-500">{description}</p>
          )}
          <div className="space-y-3">{children}</div>
        </fieldset>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
