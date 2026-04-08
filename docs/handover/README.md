# Design System v1 — Reference Implementation

## What This Repo Is

This is a hand-built React component library built with Next.js 15, React 19, TypeScript, Tailwind CSS v4, and Storybook. It serves as a learning reference for:
- Building a semantic token architecture from scratch (primitives → roles → themes)
- Establishing component conventions with CVA (Class Variance Authority) for variant management
- Configuring Storybook with Tailwind v4 and theme switching
- Implementing an audit and verification pipeline for component quality
- Writing accessible, forwarded components with proper TypeScript interfaces

The system includes 25 complete Layer 1 primitive components and 18 complete Layer 2 composite components across Feedback, Overlays, Navigation, and Data Display sections.

## What This Repo Is NOT

- **Not a production design system.** This implementation was a learning exercise and proof-of-concept before pivoting to shadcn/ui for speed and maintainability.
- **Not superseded by the current implementation.** The token architecture, component conventions, and audit processes here remain valuable IP and informed the shadcn/ui-based successor.

## Architecture Decisions Made Here

### Semantic Token Architecture
Three-layer system: Primitives (raw colors) → Semantic Roles (27 roles: primary, accent, neutral, success, warning, error, info) → Themes (light-default, dark-default, light-teal, dark-blue, light-neutral, high-contrast stubs).
- All colors defined in `tokens/` as JSON and compiled to CSS custom properties via Tailwind v4 `@theme` directive
- Theme switching via `data-theme` attribute on `<html>` element
- Framework-agnostic and swappable without code changes

### Component Conventions
- All components use `React.forwardRef` + `displayName` for proper ref forwarding and debuggability
- All variants use CVA with null coalescing operators to avoid undefined class merges
- All styling uses `cn()` utility for safe Tailwind class composition
- No hardcoded colors; all colors reference semantic tokens via `--color-*` CSS variables or Tailwind `text-primary`, `bg-accent`, etc.
- Barrel imports only for exports (in `index.ts`); component files use relative imports to prevent circular dependencies

### Storybook Configuration
- SWC-compatible TypeScript override at `.storybook/tsconfig.json`
- Global theme switcher toolbar in `preview.tsx` with `data-theme` decorator
- Preview file renamed to `.tsx` (JSX file) for proper SWC handling
- Component manifest auto-generated via `@storybook/nextjs` for rapid story authoring

### Barrel Import Rule (Critical)
Component files (`Button.tsx`, `Card.tsx`, etc.) MUST import from sibling files using relative paths (`../Input`, `../Button`), never from barrel exports (`@/components/ui/Button`). This prevents circular dependency errors at build time. Barrel imports (`@/components/ui/X`) are allowed ONLY in test files, story files, and application code—never in component implementation files.

### Audit Process
Pre-Layer-2 comprehensive audit identified 11 issues across TypeScript config, token definitions, accessibility, and infrastructure. All fixed before proceeding to composite components. Verification pipeline established: after each component, run `npm run build-storybook` (exit 0), `npm run typecheck` (zero errors), hex color scan (zero hardcoded colors), and update checklist with completion date.

## Why We Pivoted to shadcn/ui

After completing this reference implementation:
- **shadcn provides identical fundamentals:** Radix UI primitives, CVA variants, Tailwind styling, forwardRef components, same accessibility standards
- **Our token system is reusable:** The semantic token architecture and theme switching logic transplant directly into shadcn
- **Building composite components is faster:** Rather than building primitives from scratch, shadcn's pre-audited components let us focus on business logic and design tokens
- **No reinvention needed:** The audit process, component conventions, and CI/build pipeline apply equally to shadcn-based components

## What Was Completed

### Layer 1: Primitive Components (25/25 ✅)
**Actions:** Button (5 variants, 3 sizes, loading/disabled/icon), IconButton, Link
**Inputs:** Input, Textarea, Select, Checkbox, Radio, Toggle, Label, HelperText
**Display:** Badge, Avatar, Tag/Chip, Spinner, Skeleton, Divider
**Typography:** Heading (h1–h6 semantic, decoupled size), Text, Code

### Layer 2: Composite Components (18/23 ✅ — 78%)
**Feedback (4/4):** Alert, Toast, Tooltip, Progress
**Overlays (4/4):** Modal/Dialog, Drawer, Popover, DropdownMenu
**Navigation (5/5):** Tabs, Breadcrumb, Pagination, Navbar, Sidebar
**Data Display (5/5):** Card, Table, DataGrid, Stat, List
**Forms (0/5):** FormField, FormGroup, SearchInput, DatePicker, FileUpload — not started

### Layer 3: Page Patterns (0/10)
Not started. Depends on Layer 2 completion.

## Bugs Found and Fixed

1. **Missing TypeScript config** — Created `tsconfig.json` with ES2022 target, strict mode, path aliases
2. **Missing token definitions** — Added `neutral-400` and `neutral-600` to tokens, roles, and theme files (18 instances of undefined color)
3. **Toggle missing accessibility** — Added `role="switch"` and `aria-checked` attributes
4. **Checkbox missing aria-hidden** — Added to custom visual wrapper div (radio button and avatar similar)
5. **Storybook theme switcher missing** — Implemented global types, toolbar, and data-theme decorator for runtime theme switching
6. **Missing test configuration** — Created `vitest.config.ts` and `vitest.setup.ts` with proper React Testing Library setup
7. **Circular barrel imports** — 10 component and story files importing from `@/components/ui/` barrels, causing webpack runtime errors. Fixed by replacing with relative imports (`../Input`, `../Button`)
8. **Storybook port conflict on restart** — Interactive port prompt hung automation. Fixed by adding `--ci --no-open` flags to storybook dev script
9. **Sidebar Tooltip prop mismatch** — Used `side` instead of `tooltipSide` prop. Tooltip component expects `tooltipSide`, `tooltipVariant`, not generic `side`/`variant`

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 15 |
| UI Library | React | 19 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | v4 |
| Component Variants | Class Variance Authority (CVA) | latest |
| Component Stories | Storybook | 10.3.5+ (@storybook/nextjs) |
| Testing | Vitest + React Testing Library | latest |
| Build | Next.js built-in + Tailwind JIT | - |
