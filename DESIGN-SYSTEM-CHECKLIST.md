# Design System — Build Checklist

## How to Use This File
- ✅ = complete and verified
- 🔲 = not started
- 🔄 = in progress
- After every implementation session, update status and add the
  verification date next to completed items.
- AI tools: read this file first. Do not rebuild completed items.
  Do not skip unchecked items without flagging it.

---

## Layer 0 — Token Foundation
- ✅ tokens/primitives.json — raw color palette (2026-04-07)
- ✅ tokens/roles.json — 27 semantic roles defined (2026-04-07)
- ✅ tokens/themes/light-default.json — active (2026-04-07)
- ✅ tokens/themes/dark-default.json — active (2026-04-07)
- ✅ tokens/themes/light-teal.json — stub (2026-04-07)
- ✅ tokens/themes/dark-blue.json — stub (2026-04-07)
- ✅ tokens/themes/light-neutral.json — stub (2026-04-07)
- ✅ tokens/themes/high-contrast.json — stub (2026-04-07)
- ✅ styles/tokens.css — Tailwind v4 @theme + data-theme switching (2026-04-07)
- ✅ tokens/README.md — architecture documentation + AI rules (2026-04-07)

---

## Layer 1 — Primitive Components
These are the atoms. No primitive component depends on another component.

### Actions
- ✅ Button — 5 variants, 3 sizes, loading/disabled/icon states (2026-04-07)
- ✅ IconButton — square button, icon-only, same variants as Button (2026-04-07)
- ✅ Link — styled anchor, inline and standalone variants (2026-04-07)

### Inputs
- 🔲 Input — text input, all states (default, focus, error, disabled)
- 🔲 Textarea — multiline input
- 🔲 Select — native select with custom styling
- 🔲 Checkbox — with label, indeterminate state
- 🔲 Radio — with label, group pattern
- 🔲 Toggle/Switch — boolean toggle
- 🔲 Label — form label, required indicator
- 🔲 HelperText — field description and error message

### Display
- 🔲 Badge — status, count, dot variants
- 🔲 Avatar — image, initials, fallback, sizes
- 🔲 Tag/Chip — dismissible, non-dismissible
- ✅ Spinner — standalone, 5 sizes, 3 variants, extracted from Button/IconButton (2026-04-07)
- ✅ Skeleton — loading placeholder, 4 variants (block/text/circle/avatar), multi-line support (2026-04-07)
- ✅ Divider — horizontal/vertical, 3 variants, optional label, spacing control (2026-04-07)

### Typography
- 🔲 Heading — h1–h6, mapped to type scale
- 🔲 Text — body copy, size and weight variants
- 🔲 Code — inline and block, monospace

---

## Layer 2 — Composite Components
These compose primitives. Build only after Layer 1 items they depend on are complete.

### Feedback
- 🔲 Alert — info/success/warning/error, dismissible (needs: Badge, Text)
- 🔲 Toast — transient notification (needs: Alert, Button)
- 🔲 Tooltip — on hover/focus (needs: Text)
- 🔲 Progress — bar and circular (needs: Skeleton pattern)

### Overlays
- 🔲 Modal/Dialog — with backdrop, focus trap (needs: Button, Heading, Text)
- 🔲 Drawer — side panel (needs: same as Modal)
- 🔲 Popover — anchored overlay (needs: Tooltip pattern)
- 🔲 DropdownMenu — anchored menu (needs: Button, Divider)

### Navigation
- 🔲 Tabs — horizontal and vertical (needs: Text)
- 🔲 Breadcrumb — with separator (needs: Link, Text)
- 🔲 Pagination — page number controls (needs: Button, IconButton)
- 🔲 Navbar — top navigation shell (needs: Button, Link, Avatar)
- 🔲 Sidebar — vertical nav (needs: Link, Badge, Avatar)

### Data Display
- 🔲 Card — surface container, header/body/footer slots (needs: Heading, Text, Button)
- 🔲 Table — sortable, with pagination (needs: Checkbox, Badge, Button, Pagination)
- 🔲 DataGrid — advanced table (needs: Table)
- 🔲 Stat — metric with label and trend (needs: Text, Badge)
- 🔲 List — vertical list with optional icons/avatars

### Forms
- 🔲 FormField — Label + Input + HelperText composition (needs: all Input primitives)
- 🔲 FormGroup — fieldset grouping
- 🔲 SearchInput — Input with leading icon and clear button (needs: Input, IconButton)
- 🔲 DatePicker — needs: Input, Popover, Button
- 🔲 FileUpload — drag and drop zone (needs: Button, Text)

---

## Layer 3 — Page Patterns
Templates composed from Layer 1 + 2 components.

- 🔲 AuthLayout — login/signup page shell
- 🔲 DashboardLayout — sidebar + topnav + content area
- 🔲 SettingsLayout — sidebar nav + content panel
- 🔲 EmptyState — zero-data placeholder (needs: Heading, Text, Button)
- 🔲 ErrorPage — 404/500 pattern
- 🔲 LandingHero — full-width hero section
- 🔲 FeatureGrid — feature cards in grid (needs: Card)
- 🔲 PricingTable — pricing tiers (needs: Card, Button, Badge)
- 🔲 TestimonialGrid — social proof section (needs: Card, Avatar)
- 🔲 CTABanner — full-width call to action (needs: Heading, Text, Button)

---

## Tooling
- ✅ package.json — Next.js 15, React 19, Tailwind v4 (2026-04-07)
- ✅ lib/utils.ts + clsx/cva/tailwind-merge — cn() utility + package.json updated (2026-04-07)
- 🔲 Storybook — install @storybook/nextjs, configure for Tailwind v4
- 🔲 Vitest + React Testing Library — install and configure
- 🔲 ESLint — with design system lint rules (no hardcoded colors rule)
- 🔲 Prettier — formatting config
- 🔲 GitHub Actions — CI: lint + test + storybook build on every PR
- 🔲 Storybook MCP server — configure for AI tool access to component manifest

---

## AI Instruction Files
- ✅ tokens/README.md — token architecture rules (2026-04-07)
- ✅ docs/usage-for-ai.md — usage guidance (review and verify contents)
- 🔲 docs/component-conventions.md — how components are structured,
     naming conventions, file structure per component
- 🔲 docs/do-not-do.md — explicit anti-patterns with examples
     (hardcoded colors, nested ternaries in JSX, etc.)
- 🔲 .cursorrules or CLAUDE.md — repo-root AI instruction file pointing
     to all docs above

---

## Decisions Log
| Date | Decision | Rationale |
|---|---|---|
| 2026-04-07 | Tailwind v4, not v3 | v3 would require migration within 6 months |
| 2026-04-07 | Next.js 15 + React 19 | Matches 9 of 16 audited kits |
| 2026-04-07 | Semantic token architecture | Brand-agnostic, theme-switchable |
| 2026-04-07 | data-theme attribute switching | Framework-agnostic, single HTML attribute |
| 2026-04-07 | light-default: blue primary + violet accent | Starting palette, easily swapped via theme file |
| 2026-04-07 | Components are "use client" by default | Simplicity first, RSC optimization is Phase 2 |
| 2026-04-07 | No clsx/cn in primitives yet | Add in utility setup step before Layer 2 |

---

## Session Resume Instructions
When picking up this project in a new session:
1. Read this file first
2. Read tokens/README.md
3. Read docs/usage-for-ai.md
4. Find the first 🔲 item in Layer 1
5. Do not proceed to Layer 2 until all Layer 1 items are ✅
6. Do not proceed to Layer 3 until all Layer 2 items are ✅
7. After completing any item, update its status in this file with today's date
