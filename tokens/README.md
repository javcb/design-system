# Design System — Token Architecture

## How This Works

The token system uses a three-layer model to separate concerns and enable flexible theming:

### Layer 1: Primitives (`tokens/primitives.json`)
Raw color values that form the palette. These are never referenced directly in components. They exist only to be mapped by themes. Examples: `blue-500`, `slate-800`, `red-600`.

### Layer 2: Roles (`tokens/roles.json`)
Semantic token names that describe purpose and context. Each role has a description of when and where it's used. Examples: `primary`, `neutral-700`, `error-subtle`, `text-on-primary`. This file contains **no color values** — only names and descriptions.

### Layer 3: Themes (`tokens/themes/*.json`)
Each theme file maps every role to a specific primitive value. Different themes can use the same role name but assign different colors. This allows switching themes without changing component code.

## How Themes Work

Theme switching is controlled by the `data-theme` attribute on `<html>`:

```html
<!-- Light theme (default) -->
<html>

<!-- Explicit light theme -->
<html data-theme="light-default">

<!-- Dark theme -->
<html data-theme="dark-default">
```

If no `data-theme` attribute is set, the default theme (`light-default`) is applied. If the user's system prefers dark mode and no `data-theme` is explicitly set, the system falls back to dark colors via `@media (prefers-color-scheme: dark)`.

All themes are wired together in `styles/tokens.css` using Tailwind CSS v4's `@theme` directive with CSS custom properties (CSS variables). This is the **single source of truth** for token output.

## Available Themes

| Theme | Mode | Status | Description |
|-------|------|--------|-------------|
| `light-default` | Light | Active | Default light theme. Blue primary, violet accent, slate neutrals. |
| `dark-default` | Dark | Active | Default dark theme. Lightened blues for contrast. |
| `light-teal` | Light | Stub | Light theme with teal primary. Tokens not yet defined. |
| `dark-blue` | Dark | Stub | Dark theme with navy surfaces. Tokens not yet defined. |
| `light-neutral` | Light | Stub | Neutral-first (no chromatic primary). Ideal for dashboards. Tokens not yet defined. |
| `high-contrast` | Light | Stub | Accessibility-first. WCAG AAA target. Tokens not yet defined. |

## How to Add a New Theme

1. **Copy a stub file** matching your desired mode (light or dark):
   ```bash
   cp tokens/themes/light-teal.json tokens/themes/your-theme.json
   ```

2. **Map all roles to primitive values**. Open your new file and fill in all 27 token roles:
   ```json
   {
     "theme": "your-theme",
     "mode": "light",
     "description": "Your theme description.",
     "tokens": {
       "brand": "#...",
       "primary": "#...",
       ...
     }
   }
   ```

3. **Add the theme block to `styles/tokens.css`**. Add a new `[data-theme="your-theme"]` block with all token assignments:
   ```css
   [data-theme="your-theme"] {
     --color-brand: #...;
     --color-primary: #...;
     ...
   }
   ```

4. **Verify no roles are missing**. Count your `tokens` object and ensure it has exactly 27 entries. Compare against `tokens/roles.json`.

## How to Add a New Token Role

1. **Add to `tokens/roles.json`** with a description:
   ```json
   "new-role": "Description of when and where this role is used."
   ```

2. **Add to ALL theme files**. Update every file in `tokens/themes/` to include the new role:
   ```json
   "new-role": "#value"
   ```
   For stub files, use a placeholder value from the corresponding primitive palette.

3. **Add to `styles/tokens.css`**.
   - Add to the `@theme` block (default light theme)
   - Add to `[data-theme="dark-default"]`
   - Add to `@media (prefers-color-scheme: dark)` fallback
   - Add to any other active (non-stub) theme blocks

4. **Verify consistency**. Ensure the role exists in:
   - `tokens/roles.json` with description ✓
   - `tokens/themes/light-default.json` ✓
   - `tokens/themes/dark-default.json` ✓
   - `styles/tokens.css` (3 places: @theme, [data-theme="dark-default"], @media) ✓
   - All other active theme files ✓

## Rules for AI Tools and Contributors

1. **Components NEVER reference primitive values directly**. No hardcoded hex values, no concrete Tailwind color names like `blue-600` or `slate-900` in component code.

2. **Components ALWAYS use semantic role classes**. Use `bg-primary`, `text-neutral-900`, `border-neutral-300`, etc. Let the theme system handle the actual color.

3. **Never add a token role to fewer than ALL theme files**. A role must exist in `roles.json`, `light-default.json`, `dark-default.json`, and `styles/tokens.css` or the system is broken.

4. **Never modify `tokens/primitives.json` to solve a theme problem**. If a theme needs a different color, add a new theme file instead. Primitives are the palette; themes do the mapping.

5. **`styles/tokens.css` is the single source of truth for CSS output**. Do not create other CSS files that define color variables. All token output flows through this file.

6. **Stub theme files have empty `tokens` objects**. Do not add placeholder colors to stubs — they exist as structure only. When ready to activate a stub, populate all 27 roles.

## Components Built Against This Token Layer

| Component | Path | Variants | Storybook |
|---|---|---|---|
| Button | components/ui/Button | primary, secondary, ghost, destructive, accent | Button.stories.tsx |
