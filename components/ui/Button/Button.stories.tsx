import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from './Button';

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const meta = {
  title: 'Design System/Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A versatile button component that supports multiple variants, sizes, and states. Use primary for main actions, secondary for alternative actions, ghost for subtle interactions, destructive for dangerous actions, and accent for secondary highlights.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive', 'accent'],
      description: 'Button variant/style. Primary: main action. Secondary: alternative. Ghost: subtle. Destructive: dangerous action. Accent: secondary highlight.',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size. sm: small, md: medium (default), lg: large.',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button, preventing interaction.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows a loading spinner and disables the button.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Makes the button fill its container width.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    leftIcon: {
      description: 'Icon or element to render before the label. Replaced by spinner when isLoading=true.',
    },
    rightIcon: {
      description: 'Icon or element to render after the label.',
    },
    children: {
      control: 'text',
      description: 'Button label text or content.',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback fired when the button is clicked.',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─────────────────────────────────────────
// Default Story
// ─────────────────────────────────────────
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Button',
  },
};

// ─────────────────────────────────────────
// All Variants
// ─────────────────────────────────────────
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="accent">Accent</Button>
    </div>
  ),
};

// ─────────────────────────────────────────
// All Sizes
// ─────────────────────────────────────────
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap items-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// ─────────────────────────────────────────
// With Icons
// ─────────────────────────────────────────
export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap items-center">
      <Button leftIcon={<ArrowIcon />}>Left Icon</Button>
      <Button rightIcon={<ArrowIcon />}>Right Icon</Button>
      <Button leftIcon={<ArrowIcon />} rightIcon={<ArrowIcon />}>
        Both Icons
      </Button>
    </div>
  ),
};

// ─────────────────────────────────────────
// Loading State
// ─────────────────────────────────────────
export const Loading: Story = {
  args: {
    variant: 'primary',
    isLoading: true,
    children: 'Loading...',
  },
};

// ─────────────────────────────────────────
// Disabled States
// ─────────────────────────────────────────
export const Disabled: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap items-center">
      <Button variant="primary" disabled>
        Primary Disabled
      </Button>
      <Button variant="secondary" disabled>
        Secondary Disabled
      </Button>
      <Button variant="ghost" disabled>
        Ghost Disabled
      </Button>
    </div>
  ),
};

// ─────────────────────────────────────────
// As Link
// ─────────────────────────────────────────
export const AsLink: Story = {
  args: {
    as: 'a',
    href: '#',
    variant: 'primary',
    children: 'Link Button',
  },
};

// ─────────────────────────────────────────
// Full Width
// ─────────────────────────────────────────
export const FullWidth: Story = {
  args: {
    variant: 'primary',
    fullWidth: true,
    children: 'Full Width Button',
  },
};

// ─────────────────────────────────────────
// Destructive Variant
// ─────────────────────────────────────────
export const DestructiveVariant: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
};
