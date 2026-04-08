# Claude AI Session Instructions

## Required Reading (IN ORDER)

Before any session begins, you MUST read these files in this exact order:

1. **DESIGN-SYSTEM-CHECKLIST.md** — Project status, completed items, pending tasks
2. **tokens/README.md** — Token architecture rules (DO NOT SKIP)
3. **docs/usage-for-ai.md** — How to use the design system (DO NOT SKIP)
4. **docs/component-conventions.md** — Component structure and patterns

---

## 8 Non-Negotiable Rules

These rules ALWAYS apply and cannot be overridden:

### 1. **Semantic Tokens Only**
- Use ONLY tokens defined in `tokens/roles.json` and `styles/tokens.css`
- **Forbidden**: Hardcoded hex colors, Tailwind arbitrary colors, design-token-like class names
- **Allowed**: `bg-primary`, `text-neutral-700`, `border-error`
- Check before writing: "Is this in tokens.css?"

### 2. **CVA (Class Variance Authority) for Variants**
- All component variants MUST use `cva()` from class-variance-authority
- CVA object name must be `[ComponentName]Variants` (e.g., `ButtonVariants`)
- No inline ternaries or conditional classes in JSX

### 3. **cn() for Class Composition**
- Use `cn()` from `lib/utils.ts` to compose Tailwind classes
- `cn()` is a wrapper around `clsx()` + `tailwind-merge()`
- Never use raw classNames or string concatenation for Tailwind classes

### 4. **forwardRef + displayName**
- Every component (except hooks) MUST use `React.forwardRef`
- Every component MUST have `Component.displayName = 'ComponentName'`
- Props interface MUST extend appropriate HTML attributes (e.g., `React.ButtonHTMLAttributes`)

### 5. **File Structure Per Component**
```
components/ui/ComponentName/
├── ComponentName.tsx          (component logic)
├── ComponentName.stories.tsx  (Storybook stories)
└── index.ts                   (export statement)
```
- No nested subdirectories
- Stories file MUST be named `ComponentName.stories.tsx`
- index.ts MUST export: `export { ComponentName, componentVariants } from './ComponentName'`

### 6. **Data-Theme Attribute for Theming**
- Theme switching uses `data-theme` attribute on `document.documentElement`
- Values: `light-default`, `dark-default`, (future: `light-teal`, `dark-blue`, etc.)
- CSS custom properties automatically respond to this attribute (set in tokens.css)
- No inline color overrides; let CSS variables handle light/dark

### 7. **Accessibility is Non-Optional**
- Form inputs use `sr-only` class (screen reader only) for native hidden inputs
- Custom visual elements use `aria-hidden="true"` (e.g., decorative checkboxes, icons)
- Interactive elements MUST have: `role`, `aria-label` or `aria-labelledby`, `aria-checked`/`aria-pressed` where applicable
- All color information must have non-color alternatives (e.g., icons, patterns, text)

### 8. **Do NOT Hardcode Colors in Components**
- Every color MUST come from a CSS custom property or semantic token
- Pattern: `className="bg-[var(--color-primary)]"` (if needed for dynamic colors)
- Better: Use semantic token class: `className="bg-primary"`
- Before writing ANY color, check `tokens/roles.json` first

---

## Technology Stack

| Layer | Tech | Version |
|-------|------|---------|
| Framework | Next.js | 15.0.0 |
| UI Library | React | 19.0.0 |
| Styling | Tailwind CSS | 4.0.0 (with @theme directive) |
| Component Variants | CVA | 0.7.0 |
| Class Utils | clsx + tailwind-merge | 2.1.0 + 2.5.0 |
| Storybook | @storybook/nextjs | 10.3.5 |
| Testing | Vitest + React Testing Library | Latest |
| TypeScript | Built-in | Strict mode enabled |

---

## Repository Structure

```
design-system/
├── .storybook/              # Storybook config
├── components/
│   └── ui/                  # 25+ primitive components
│       ├── Button/
│       ├── Toggle/
│       ├── ... (one dir per component)
│       └── index.ts         # Barrel export
├── styles/
│   ├── globals.css          # Global base styles
│   └── tokens.css           # @theme directive + color definitions
├── tokens/
│   ├── primitives.json      # Raw color palette
│   ├── roles.json           # Semantic role definitions
│   ├── themes/              # Theme files (light-default, dark-default, etc.)
│   └── README.md            # Token architecture guide
├── lib/
│   └── utils.ts             # cn() utility + path alias setup
├── docs/
│   ├── usage-for-ai.md      # AI tool usage guide
│   ├── component-conventions.md  # Component structure & patterns
│   └── do-not-do.md         # Anti-patterns (TBD)
├── CLAUDE.md                # THIS FILE
├── DESIGN-SYSTEM-CHECKLIST.md # Status + tasks
├── tsconfig.json            # TypeScript config with path aliases
├── vitest.config.ts         # Test runner config
└── vitest.setup.ts          # Test setup file

```

---

## Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| Semantic token architecture (primitives → roles → themes) | Brand-agnostic, easy theme swapping, clear intent |
| data-theme attribute switching | Framework-agnostic, works with any JS library, single HTML attribute |
| Components are "use client" by default | Simplicity first; RSC optimization is a Phase 2 improvement |
| Tailwind v4, not v3 | v3 EOL approaching; @theme directive eliminates need for config file |
| Path alias @/* → ./* | Makes imports cleaner, easier refactoring |

---

## Session Resume Checklist

When resuming work:

- [ ] Read DESIGN-SYSTEM-CHECKLIST.md first
- [ ] Read tokens/README.md (rules for tokens)
- [ ] Read docs/usage-for-ai.md (design system usage guide)
- [ ] Identify next unchecked item in checklist
- [ ] Do not rebuild completed items (marked ✅)
- [ ] Do not skip unchecked items without explicit user approval

---

## Quick Reference: Token Usage

### ✅ CORRECT
```tsx
<button className="bg-primary hover:bg-primary-hover text-white">Click me</button>
<div className="text-neutral-700 border border-neutral-300">
<span className={cn('px-2 py-1', isHighlight && 'bg-accent')}>
```

### ❌ FORBIDDEN
```tsx
<button className="bg-[#2563eb] hover:bg-[#1d4ed8]">            // Hardcoded hex
<div className="text-slate-700 border border-gray-300">       // Random Tailwind
<span className="bg-blue-500 text-white px-2 py-1">          // Design token name in class
const color = isHighlight ? '#7c3aed' : '#64748b';           // Hardcoded in JS
```

---

## FAQ for AI Tools

**Q: Can I use Tailwind utility classes directly?**
A: Yes, but only if they don't conflict with semantic tokens. `px-4`, `flex`, `gap-2` are fine. `text-blue-500` is not.

**Q: What if a component needs a color not in tokens?**
A: Stop. Read tokens/README.md and tokens/roles.json. The color is either already defined under a different name, or you need to add it to the token system before using it.

**Q: Can I modify an existing component if the user didn't explicitly ask?**
A: No. Only modify what the user requests. Mark completed items in the checklist but don't rebuild them.

**Q: Why forwardRef on every component?**
A: Enables parent components to access the DOM element (e.g., focus management, measurements). It's a best practice for reusable UI libraries.

---

## Related Documents

- **docs/usage-for-ai.md** — How to implement and use components
- **tokens/README.md** — Deep dive on token architecture
- **docs/component-conventions.md** — Detailed component file structure
- **DESIGN-SYSTEM-CHECKLIST.md** — Current project status
