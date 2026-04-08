import type { Meta, StoryObj } from '@storybook/nextjs';
import { Divider } from './Divider';

const meta = {
  title: 'Design System/Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A visual separator element. Use to break content into sections. Supports horizontal and vertical orientations, with optional label for horizontal dividers.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Divider direction',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'Line style',
      table: {
        defaultValue: { summary: 'solid' },
      },
    },
    spacing: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Margin above/below (horizontal) or left/right (vertical)',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    label: {
      control: 'text',
      description: 'Optional center label text (only for horizontal dividers)',
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─────────────────────────────────────────
// Default Story
// ─────────────────────────────────────────
export const Default: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
  },
};

// ─────────────────────────────────────────
// With Label
// ─────────────────────────────────────────
export const WithLabel: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    label: 'or continue with',
  },
};

// ─────────────────────────────────────────
// Dashed
// ─────────────────────────────────────────
export const Dashed: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'dashed',
    label: 'optional section',
  },
};

// ─────────────────────────────────────────
// Dotted
// ─────────────────────────────────────────
export const Dotted: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'dotted',
  },
};

// ─────────────────────────────────────────
// Vertical
// ─────────────────────────────────────────
export const Vertical: Story = {
  render: () => (
    <div className="flex gap-8 items-center h-32">
      <div className="text-center">
        <p className="text-sm font-medium text-neutral-900">Section 1</p>
        <p className="text-xs text-neutral-500 mt-1">Some content here</p>
      </div>

      <Divider orientation="vertical" variant="solid" />

      <div className="text-center">
        <p className="text-sm font-medium text-neutral-900">Section 2</p>
        <p className="text-xs text-neutral-500 mt-1">More content here</p>
      </div>

      <Divider orientation="vertical" variant="dashed" />

      <div className="text-center">
        <p className="text-sm font-medium text-neutral-900">Section 3</p>
        <p className="text-xs text-neutral-500 mt-1">Even more content</p>
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────
// All Spacings
// ─────────────────────────────────────────
export const AllSpacings: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-neutral-500 mb-2">sm spacing</p>
        <Divider spacing="sm" />
      </div>

      <div>
        <p className="text-sm text-neutral-500 mb-2">md spacing (default)</p>
        <Divider spacing="md" />
      </div>

      <div>
        <p className="text-sm text-neutral-500 mb-2">lg spacing</p>
        <Divider spacing="lg" />
      </div>
    </div>
  ),
};
