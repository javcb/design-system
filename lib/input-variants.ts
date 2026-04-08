// ─────────────────────────────────────────
// Shared Input Base & State Classes
// ─────────────────────────────────────────
// Reused across Input, Textarea, Select to maintain consistency

export const inputBase = `
  w-full px-3 py-2
  rounded-lg border border-neutral-300
  bg-surface text-default
  placeholder-neutral-400
  transition-colors duration-200
  focus:outline-none focus-visible:ring-2 ring-[var(--color-focus-ring)]
`;

export const inputStates = {
  default: 'border-neutral-300',
  error: 'border-error focus-visible:ring-error/20',
  success: 'border-success focus-visible:ring-success/20',
};

export const inputSizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export const inputDisabledState = 'disabled:bg-neutral-50 disabled:text-neutral-400 disabled:border-neutral-200 disabled:cursor-not-allowed';

export const inputFocusState = 'focus-visible:ring-2 focus-visible:ring-offset-0';
