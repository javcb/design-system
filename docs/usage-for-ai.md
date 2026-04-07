# How to use this design system in AI-assisted development

## Rule

Do not create new UI components from scratch unless a component does not exist in this system.
Always use existing atoms, molecules, and organisms by their documented names and variants.

## How to reference

When prompting an AI tool, use exact names:
- "Use the PrimaryButton atom with the large variant"
- "Use the DataTable organism with sortable columns"
- "Apply the DashboardLayout template"

## Foundations

Use only the documented color tokens, type scale, and spacing scale.
Do not introduce arbitrary colors, font sizes, or spacing values.

## If a component is missing

Flag it. Do not invent it. Add a note to docs/future-components.md.