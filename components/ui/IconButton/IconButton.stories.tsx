import type { Meta, StoryObj } from '@storybook/nextjs';
import { IconButton } from './IconButton';

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const MoreIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

const meta = {
  title: 'Design System/Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A square icon-only button that reuses Button variants. Used for toolbar actions, icon menus, and compact action buttons.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive', 'accent'],
      description: 'Button variant. Inherits all variants from Button.',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size. sm: 8×8, md: 10×10, lg: 12×12 (in rem units)',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows a spinner, disables pointer events.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    icon: {
      description: 'Icon or element to render (required).',
    },
    label: {
      control: 'text',
      description: 'Aria-label for accessibility (required, not visible).',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback fired when the button is clicked.',
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─────────────────────────────────────────
// Default Story
// ─────────────────────────────────────────
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    icon: <TrashIcon />,
    label: 'Delete',
  },
};

// ─────────────────────────────────────────
// All Variants
// ─────────────────────────────────────────
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap items-center">
      <IconButton variant="primary" icon={<MoreIcon />} label="Options" />
      <IconButton variant="secondary" icon={<MoreIcon />} label="Options" />
      <IconButton variant="ghost" icon={<MoreIcon />} label="Options" />
      <IconButton variant="destructive" icon={<TrashIcon />} label="Delete" />
      <IconButton variant="accent" icon={<MoreIcon />} label="Options" />
    </div>
  ),
};

// ─────────────────────────────────────────
// All Sizes
// ─────────────────────────────────────────
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap items-center">
      <IconButton size="sm" icon={<MoreIcon />} label="Options" />
      <IconButton size="md" icon={<MoreIcon />} label="Options" />
      <IconButton size="lg" icon={<MoreIcon />} label="Options" />
    </div>
  ),
};

// ─────────────────────────────────────────
// Loading State
// ─────────────────────────────────────────
export const Loading: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    isLoading: true,
    icon: <MoreIcon />,
    label: 'Loading',
  },
};

// ─────────────────────────────────────────
// Disabled State
// ─────────────────────────────────────────
export const Disabled: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap items-center">
      <IconButton variant="primary" disabled icon={<MoreIcon />} label="Options" />
      <IconButton variant="secondary" disabled icon={<MoreIcon />} label="Options" />
      <IconButton variant="ghost" disabled icon={<MoreIcon />} label="Options" />
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
    size: 'md',
    icon: <MoreIcon />,
    label: 'Menu',
  },
};
