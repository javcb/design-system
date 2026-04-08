# Component Conventions & Structure

This document defines the structure, patterns, and anti-patterns for all components in the design system.

---

## File Structure

Every component follows this exact structure:

```
components/ui/ComponentName/
├── ComponentName.tsx              # Component logic + JSX
├── ComponentName.stories.tsx       # Storybook stories (1+ per variant/size)
└── index.ts                        # Barrel export
```

### Naming Rules

- **Directory name**: PascalCase (`Button`, `IconButton`, `TextInput`)
- **Component file**: Matches directory (`Button.tsx`)
- **Stories file**: `ComponentName.stories.tsx` (singular "stories")
- **CVA object**: camelCase with "Variants" suffix (`buttonVariants`, `badgeVariants`)
- **CSS classes**: Use Tailwind utilities (see Token Usage section)

### index.ts Pattern

```typescript
export { ComponentName, componentNameVariants } from './ComponentName';
```

**Important**: The export name for CVA variants MUST match this pattern:
- If component is `Button`, export `buttonVariants`
- If component is `IconButton`, export `iconButtonVariants`
- If component is `Toggle`, export `toggleVariants`

This enables external consumers to import and extend variants:
```tsx
import { Button, buttonVariants } from '@/components/ui/Button';
```

---

## Component File Structure Template

Every component file MUST follow this order:

```typescript
'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// CVA Variant Definitions
// ─────────────────────────────────────────
const componentNameVariants = cva('base-classes', {
  variants: {
    variant: {
      primary: 'primary-classes',
      secondary: 'secondary-classes',
    },
    size: {
      sm: 'small-classes',
      md: 'medium-classes',
      lg: 'large-classes',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
  compoundVariants: [
    {
      variant: 'primary',
      size: 'sm',
      class: 'override-classes',
    },
  ],
});

// ─────────────────────────────────────────
// TypeScript Interface
// ─────────────────────────────────────────
export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentNameVariants> {
  // Custom props
  label?: string;
  disabled?: boolean;
}

// ─────────────────────────────────────────
// Component
// ─────────────────────────────────────────
export const ComponentName = React.forwardRef<
  HTMLDivElement,
  ComponentNameProps
>(({ variant, size, className, label, disabled, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        componentNameVariants({ variant, size }),
        disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      {label}
    </div>
  );
});

ComponentName.displayName = 'ComponentName';
```

### Key Requirements

1. **'use client' directive**: At the very top (required for interactive components)
2. **CVA definition first**: Before TypeScript interfaces
3. **TypeScript interface second**: Props extending HTML attributes + VariantProps
4. **Component implementation third**: forwardRef + displayName
5. **Imports section**: Minimal, in order: React, CVA, utilities
6. **No trailing whitespace or stray divs**

---

## CVA (Class Variance Authority) Rules

### ✅ CORRECT

```typescript
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary-hover',
        secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
        destructive: 'bg-error text-white hover:bg-error',
      },
      size: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2.5 text-base',
        lg: 'px-5 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);
```

### ❌ FORBIDDEN

```typescript
// ❌ Inline ternary in JSX
<div className={isActive ? 'bg-primary' : 'bg-neutral-100'}>

// ❌ Conditional class spreading
const classes = disabled ? 'opacity-50 cursor-not-allowed' : '';
<button className={classes}>

// ❌ Missing CVA
<div className={cn('px-4 py-2', variant === 'primary' && 'bg-blue-500')}>
```

---

## Token Usage Rules

### ✅ ALLOWED: Semantic Token Classes

```tsx
<button className="bg-primary hover:bg-primary-hover text-white">
<div className="border border-neutral-300">
<span className="text-neutral-700">
<div className="bg-error-subtle text-error">
```

### ✅ ALLOWED: Layout & Spacing Utilities

```tsx
<div className="flex gap-4 px-4 py-3">
<span className="inline-flex items-center">
<div className="grid grid-cols-3 gap-2">
```

### ❌ FORBIDDEN: Hardcoded Colors

```tsx
// ❌ Hex colors
<div className="bg-[#2563eb]">

// ❌ Tailwind color scales
<div className="bg-blue-500 text-gray-700">

// ❌ Arbitrary values
<div className="[background-color:rgb(100,200,300)]">

// ❌ Not in tokens.css
<div className="bg-cyan-400 border-purple-900">
```

### ❌ FORBIDDEN: Design-Token-Like Names in Classes

```tsx
// ❌ These look like tokens but aren't valid Tailwind
<div className="color-neutral-400">        // 'color-' prefix isn't valid
<div className="bg-primary-dark-hover">   // This exact variant doesn't exist
```

### Color Classes Cheat Sheet

Valid semantic token classes:

**Brand/Primary**:
- `text-primary`, `bg-primary`, `border-primary`
- `hover:bg-primary-hover`
- `bg-primary-subtle`

**Accent**:
- `text-accent`, `bg-accent`, `border-accent`
- `hover:bg-accent-hover`
- `bg-accent-subtle`

**Neutrals**:
- `text-neutral-{50, 100, 300, 400, 500, 600, 700, 900}`
- `border-neutral-{50, 100, 300, 400, 500, 600, 700, 900}`
- `bg-neutral-{50, 100, 300, 400, 500, 600, 700, 900}`

**Semantic States**:
- `text-error`, `bg-error`, `bg-error-subtle`
- `text-success`, `bg-success`, `bg-success-subtle`
- `text-warning`, `bg-warning`, `bg-warning-subtle`
- `text-info`, `bg-info`, `bg-info-subtle`

**Surfaces**:
- `bg-surface`, `bg-surface-raised`, `bg-surface-overlay`

---

## Accessibility Requirements

Every component MUST meet these standards:

### 1. Form Inputs
```tsx
// ✅ Visually hidden native input
<input type="checkbox" className="sr-only" checked={isChecked} />

// Custom visual wrapper gets aria-hidden (it's decorative)
<div aria-hidden="true" className="w-5 h-5 border-2 border-neutral-300">
  {isChecked && <CheckIcon />}
</div>
```

### 2. Semantic HTML
- Use correct elements: `<button>`, `<input>`, `<label>`, `<a>`
- Never use `<div>` for clickable actions (unless role="button")
- Form labels MUST have `htmlFor` attribute

### 3. ARIA Attributes
```tsx
// Required for custom components:
// - role: switch, checkbox, tab, etc.
// - aria-label or aria-labelledby: describe purpose
// - aria-checked / aria-pressed: state for toggle-like components
// - aria-hidden="true": decorative elements only

// ✅ CORRECT
<input type="checkbox" aria-checked={isChecked} role="checkbox" />
<div aria-hidden="true" className="custom-checkbox-visual" />
<button aria-label="Close menu">×</button>

// ❌ WRONG
<div role="button" onClick={handleClick}>  // Use <button> instead
<span aria-hidden="true">{userInitials}</span>  // Content shouldn't be hidden
<CustomButton>  {/* No aria-label, unlabeled */}
```

### 4. Focus Management
```tsx
// All interactive elements must be keyboard accessible
<button className="focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)]">

// For custom focus styles, use focus-visible (not :focus)
// Never remove default focus styles without replacing them
```

### 5. Color Contrast
- All text must meet WCAG AA contrast ratios (4.5:1 for normal, 3:1 for large)
- Don't rely on color alone to convey information
- Use icons, patterns, or text alongside colors

---

## Storybook Stories Requirements

Every component MUST have stories demonstrating:

### 1. File Naming
```
ComponentName.stories.tsx
```

### 2. Story Format
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story (show primary variant)
export const Default: Story = {
  args: {
    label: 'Click me',
  },
};

// One story per variant
export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary Button',
  },
};

// One story per size
export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large',
  },
};

// One story showing disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled',
  },
};
```

### 3. Story Requirements Checklist
- [ ] File named `ComponentName.stories.tsx`
- [ ] Meta object with `title`, `component`, `tags: ['autodocs']`
- [ ] At least one Default story
- [ ] One story per variant option
- [ ] One story per size option
- [ ] Disabled state story (if applicable)
- [ ] Interactive state story (if applicable)

---

## Anti-Patterns: DO NOT DO

### ❌ Hardcoded Colors in Components

```typescript
// WRONG
const Button = ({ isActive }) => (
  <button style={{ backgroundColor: isActive ? '#2563eb' : '#f1f5f9' }}>
    Click
  </button>
);

// CORRECT
const Button = ({ variant = 'primary' }) => (
  <button className={cn(buttonVariants({ variant }))}>
    Click
  </button>
);
```

### ❌ Nested Ternaries in JSX

```typescript
// WRONG
<div className={cn(
  disabled
    ? 'opacity-50 cursor-not-allowed'
    : isActive
      ? 'bg-primary text-white'
      : 'bg-neutral-100'
)}>

// CORRECT (use CVA + compoundVariants)
const variants = cva('base', {
  variants: {
    state: {
      active: 'bg-primary text-white',
      inactive: 'bg-neutral-100',
      disabled: 'opacity-50 cursor-not-allowed',
    },
  },
});
```

### ❌ Inline Event Handlers (in Stories)

```typescript
// WRONG
export const Interactive: Story = {
  args: {
    onClick: () => console.log('clicked'),  // Don't inline
  },
};

// CORRECT
export const Interactive: Story = {
  render: (args) => <ComponentName {...args} />,
  args: {
    onClick: () => {},  // Storybook actions will handle this
  },
};
```

### ❌ Missing forwardRef on Reusable Components

```typescript
// WRONG
const MyButton = (props) => <button {...props} />;

// CORRECT
const MyButton = React.forwardRef<HTMLButtonElement, MyButtonProps>(
  (props, ref) => <button ref={ref} {...props} />
);
MyButton.displayName = 'MyButton';
```

### ❌ Dynamic Color Strings

```typescript
// WRONG
const colorMap = { success: 'bg-success', error: 'bg-error' };
const color = colorMap[status];
<div className={color}>  {/* String built dynamically */}

// CORRECT (use CVA variants)
const variants = cva('base', {
  variants: {
    status: {
      success: 'bg-success',
      error: 'bg-error',
    },
  },
});
```

### ❌ Modifying Global Styles from Components

```typescript
// WRONG
const Component = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#f1f5f9';
  }, []);
  return <div>...</div>;
};

// CORRECT (use data-theme attribute, managed globally)
// Components should NOT modify global state
```

### ❌ Component-Specific Theme Logic

```typescript
// WRONG
const Button = ({ theme = 'light' }) => {
  const bgColor = theme === 'light' ? '#ffffff' : '#0f172a';
  return <button style={{ backgroundColor: bgColor }} />;
};

// CORRECT (let CSS custom properties handle it)
// The data-theme attribute on root handles all theming
const Button = () => <button className="bg-surface" />;
// CSS automatically applies correct color based on data-theme
```

---

## Quick Checklist: Before Submitting a Component

- [ ] File structure matches template (3 files: .tsx, .stories.tsx, index.ts)
- [ ] Component uses `React.forwardRef`
- [ ] Component has `displayName` set
- [ ] All variants defined in CVA object
- [ ] Props interface extends HTML attributes + VariantProps
- [ ] No hardcoded colors (all from tokens)
- [ ] No inline ternaries in JSX (use CVA)
- [ ] Uses `cn()` for class composition
- [ ] Accessibility: sr-only + aria-hidden where needed
- [ ] Stories cover all variants and sizes
- [ ] Disabled state story included
- [ ] Component exported from barrel export (components/ui/index.ts)

---

## Examples: Reference Implementation

See these components as gold-standard implementations:
- **Button** — All states, variants, sizes, loading, disabled
- **Checkbox** — Custom visual + native input, sr-only, aria-hidden
- **Toggle** — Switch role, aria-checked, smooth animation
- **Avatar** — Image fallback logic, status indicator, multiple shapes/sizes

Copy their structure and patterns when building new components.
