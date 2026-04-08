# Explicit Anti-Patterns: What NOT To Do

This file documents patterns that break the design system. **Do not commit code with these patterns.**

## 1. Hardcoded Colors

❌ **WRONG:**
```tsx
export const Card = ({ children }) => (
  <div className="bg-blue-500 text-white border-2 border-gray-300">
    {children}
  </div>
);
```

✅ **CORRECT:**
```tsx
export const Card = ({ children }) => (
  <div className="bg-primary text-primary-foreground border border-border">
    {children}
  </div>
);
```

**Why:** Hardcoded Tailwind colors (blue-500, gray-300) don't respect theme switching. Semantic tokens (primary, border) automatically adapt when `data-theme` changes. The build pipeline scans for hardcoded color patterns and will reject PRs.

## 2. Nested Ternaries in JSX

❌ **WRONG:**
```tsx
export const Button = ({ variant, size, disabled }) => (
  <button className={
    variant === 'primary'
      ? size === 'sm'
        ? 'px-2 py-1 text-sm'
        : size === 'md'
          ? 'px-4 py-2 text-base'
          : 'px-6 py-3 text-lg'
      : variant === 'secondary'
        ? size === 'sm'
          ? 'px-2 py-1 text-sm bg-gray-200'
          : // ... more nesting
        : // ...
  }>
    Click me
  </button>
);
```

✅ **CORRECT:**
```tsx
const buttonVariants = cva('inline-flex items-center justify-center', {
  variants: {
    variant: {
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
    },
    size: {
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
  },
});

export const Button = ({ variant = 'primary', size = 'md', ...props }) => (
  <button className={buttonVariants({ variant, size })} {...props}>
    Click me
  </button>
);
```

**Why:** CVA separates variant logic from JSX, making it readable, testable, and maintainable. Nested ternaries are a code smell that leads to bugs and makes changes harder.

## 3. Direct Barrel Imports in Component Files

❌ **WRONG (in Button.tsx):**
```tsx
// Button.tsx — component implementation file
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';

export const Button = ({ ... }) => {
  // ...
};
```

✅ **CORRECT:**
```tsx
// Button.tsx — component implementation file
import { Input } from '../Input';
import { Text } from '../Text';

export const Button = ({ ... }) => {
  // ...
};
```

**Why:** Barrel imports (`@/components/ui/X`) create circular dependencies when multiple components import from the same barrel. Relative imports bypass this. Barrels are safe in:
- Test files (`Button.test.tsx`)
- Story files (`Button.stories.tsx`)
- Application code (`app/page.tsx`)

But NEVER in component implementation files (`Button.tsx`, `Card.tsx`, etc.).

## 4. Missing React.forwardRef or displayName

❌ **WRONG:**
```tsx
export const Input = ({ placeholder, ...props }) => (
  <input placeholder={placeholder} {...props} />
);
```

✅ **CORRECT:**
```tsx
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, ...props }, ref) => (
    <input ref={ref} placeholder={placeholder} {...props} />
  )
);
Input.displayName = 'Input';
```

**Why:** forwardRef allows parent components to access the DOM node (for focus management, value access, etc.). displayName makes debugging and Storybook docs clearer. All components must have both.

## 5. Skipping TypeScript Interfaces

❌ **WRONG:**
```tsx
export const Button = ({ variant, size, children, ...props }) => (
  <button className={buttonVariants({ variant, size })} {...props}>
    {children}
  </button>
);
```

✅ **CORRECT:**
```tsx
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, ...props }, ref) => (
    <button ref={ref} className={buttonVariants({ variant, size })} {...props}>
      {children}
    </button>
  )
);
Button.displayName = 'Button';
```

**Why:** TypeScript interfaces enable IDE autocomplete, prevent prop typos, and make component contracts explicit. Without them, `variant="wrnog"` won't error until runtime.

## 6. Missing Accessibility Attributes

❌ **WRONG:**
```tsx
export const Checkbox = ({ checked, onChange }) => (
  <div
    onClick={() => onChange(!checked)}
    style={{ width: '20px', height: '20px', border: '1px solid black' }}
  >
    {checked && '✓'}
  </div>
);
```

✅ **CORRECT:**
```tsx
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, onChange, ariaLabel, ...props }, ref) => (
    <>
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={ariaLabel}
        className="sr-only"
        {...props}
      />
      <div
        className="w-5 h-5 border-2 border-border rounded flex items-center justify-center"
        aria-hidden="true"
      >
        {checked && <Check size={16} />}
      </div>
    </>
  )
);
Checkbox.displayName = 'Checkbox';
```

**Why:** ARIA attributes make custom components accessible to screen readers. `role`, `aria-label`, `aria-hidden`, `aria-checked`, etc. are not optional—they're required by WCAG 2.1 Level AA.

## 7. Using Inline Styles Instead of Tailwind

❌ **WRONG:**
```tsx
<div style={{ padding: '16px', backgroundColor: 'rgb(59, 130, 246)', color: '#fff' }}>
  Content
</div>
```

✅ **CORRECT:**
```tsx
<div className="p-4 bg-primary text-primary-foreground">
  Content
</div>
```

**Why:** Inline styles:
- Can't be overridden with data-theme
- Don't benefit from Tailwind's design system (spacing scale, color palette)
- Are harder to maintain (magic numbers, RGB values, inconsistency)

Use Tailwind classes for all styling.

## 8. Conditional Rendering That Breaks Compound Components

❌ **WRONG:**
```tsx
<Card>
  {isLoading && <p>Loading...</p>}
  {!isLoading && (
    <>
      <CardHeader>Title</CardHeader>
      <CardContent>Content</CardContent>
    </>
  )}
</Card>
```

✅ **CORRECT:**
```tsx
<Card>
  {isLoading ? (
    <Skeleton className="w-full h-64" />
  ) : (
    <>
      <CardHeader>Title</CardHeader>
      <CardContent>Content</CardContent>
    </>
  )}
</Card>
```

**Why:** Compound components (Card, CardHeader, CardContent) rely on React Context or ref arrays to find child components. Conditional rendering can break this if children aren't always rendered. Keep the structure stable and swap content instead.

## 9. Not Testing Accessibility

❌ **WRONG:**
```tsx
// Dialog.test.tsx — no accessibility testing
test('dialog opens and closes', () => {
  render(<Dialog open={true}>Content</Dialog>);
  expect(screen.getByText('Content')).toBeInTheDocument();
});
```

✅ **CORRECT:**
```tsx
// Dialog.test.tsx — accessibility tested
test('dialog opens and closes with proper ARIA', () => {
  const { rerender } = render(<Dialog open={true}>Content</Dialog>);
  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveAttribute('role', 'dialog');
  expect(dialog).toHaveAttribute('aria-modal', 'true');
});

test('dialog closes on Escape key', () => {
  const onClose = vi.fn();
  render(<Dialog open={true} onClose={onClose}>Content</Dialog>);
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(onClose).toHaveBeenCalled();
});
```

**Why:** Accessibility is not a "nice to have"—it's a core requirement. Test that:
- Proper ARIA roles are present
- Keyboard navigation works (Tab, Enter, Space, Escape, arrow keys)
- Focus is managed correctly (focus trap, focus restoration)
- Screen readers can identify interactive elements

## 10. Prop Drilling Instead of Context

❌ **WRONG:**
```tsx
// App → Page → Section → Card → CardContent
<Page isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
  <Section isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
    <Card isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
      <CardContent isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </Card>
  </Section>
</Page>
```

✅ **CORRECT:**
```tsx
// App
const ThemeContext = React.createContext<ThemeContextType | null>(null);

<ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
  <Page>
    <Section>
      <Card>
        <CardContent />
      </Card>
    </Section>
  </Page>
</ThemeContext.Provider>

// In any child component
const { isDarkMode, setIsDarkMode } = useContext(ThemeContext)!;
```

**Why:** Prop drilling makes components verbose and hard to refactor. Context is designed for this—use it for theme, layout state, form state, etc.

---

## Quick Checklist Before Committing

- [ ] No hardcoded Tailwind colors (blue-500, gray-300, etc.)
- [ ] No nested ternaries in JSX (use CVA instead)
- [ ] All components use `React.forwardRef` + `displayName`
- [ ] All component files use relative imports (`../Input`), not barrels (`@/components/ui/Input`)
- [ ] All components have TypeScript interfaces for props
- [ ] All custom/interactive components have ARIA attributes (role, aria-label, aria-checked, etc.)
- [ ] All styling uses Tailwind classes, no inline styles
- [ ] Compound components maintain stable structure (swap content, don't conditionally render structure)
- [ ] Accessibility tests exist (ARIA, keyboard nav, focus management)
- [ ] No prop drilling; use Context for shared state
