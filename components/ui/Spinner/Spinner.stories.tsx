import type { Meta, StoryObj } from '@storybook/nextjs';
import { Spinner } from './Spinner';

const meta = {
  title: 'Design System/Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A loading indicator spinner. Use to show that an action or data load is in progress. Available in 5 sizes and 3 color variants.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Spinner size. xs: 12px, sm: 16px, md: 20px (default), lg: 24px, xl: 32px',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    variant: {
      control: 'select',
      options: ['primary', 'neutral', 'white'],
      description: 'Color variant. primary: primary token color, neutral: neutral-500, white: white (for dark backgrounds)',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    label: {
      control: 'text',
      description: 'Aria-label text for accessibility (screen readers only, default: "Loading")',
      table: {
        defaultValue: { summary: '"Loading"' },
      },
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─────────────────────────────────────────
// Default Story
// ─────────────────────────────────────────
export const Default: Story = {
  args: {
    size: 'md',
    variant: 'primary',
    label: 'Loading',
  },
};

// ─────────────────────────────────────────
// All Sizes
// ─────────────────────────────────────────
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-6 items-center">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="xs" />
        <span className="text-xs text-neutral-500">xs</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <span className="text-xs text-neutral-500">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <span className="text-xs text-neutral-500">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="text-xs text-neutral-500">lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="xl" />
        <span className="text-xs text-neutral-500">xl</span>
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────
// All Variants
// ─────────────────────────────────────────
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="primary" size="md" />
        <span className="text-xs text-neutral-500">primary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="neutral" size="md" />
        <span className="text-xs text-neutral-500">neutral</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="bg-neutral-900 p-4 rounded-md">
          <Spinner variant="white" size="md" />
        </div>
        <span className="text-xs text-neutral-500">white</span>
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────
// On Dark Background
// ─────────────────────────────────────────
export const OnDarkBackground: Story = {
  render: () => (
    <div className="bg-neutral-900 p-8 rounded-lg flex items-center justify-center min-h-40">
      <div className="flex flex-col items-center gap-4">
        <Spinner variant="white" size="lg" />
        <span className="text-neutral-400 text-sm">Loading on dark background...</span>
      </div>
    </div>
  ),
};
