import type { Meta, StoryObj } from '@storybook/nextjs';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Design System/Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A placeholder component that mimics the layout of content while it loads. Available in block, text, circle, and avatar variants.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['block', 'text', 'circle', 'avatar'],
      description: 'Skeleton variant. block: arbitrary size, text: full width text line(s), circle: equal dimensions, avatar: preset avatar sizes',
      table: {
        defaultValue: { summary: 'block' },
      },
    },
    width: {
      control: 'text',
      description: 'Width as CSS value (e.g. "100%", 200, "12rem") or preset size for avatar (sm/md/lg)',
    },
    height: {
      control: 'text',
      description: 'Height as CSS value (e.g. 100, "4rem")',
    },
    lines: {
      control: 'number',
      description: 'Number of text lines (only for variant="text")',
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─────────────────────────────────────────
// Block Story
// ─────────────────────────────────────────
export const Block: Story = {
  args: {
    variant: 'block',
    width: 200,
    height: 100,
  },
};

// ─────────────────────────────────────────
// Text - Single Line
// ─────────────────────────────────────────
export const TextSingleLine: Story = {
  args: {
    variant: 'text',
    height: '1rem',
  },
};

// ─────────────────────────────────────────
// Text - Multiple Lines
// ─────────────────────────────────────────
export const TextMultipleLines: Story = {
  args: {
    variant: 'text',
    height: '1rem',
    lines: 4,
  },
};

// ─────────────────────────────────────────
// Circle
// ─────────────────────────────────────────
export const Circle: Story = {
  args: {
    variant: 'circle',
    width: 60,
    height: 60,
  },
};

// ─────────────────────────────────────────
// Avatar Sizes
// ─────────────────────────────────────────
export const AvatarSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="flex flex-col items-center gap-2">
        <Skeleton variant="avatar" width="sm" />
        <span className="text-xs text-neutral-500">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Skeleton variant="avatar" width="md" />
        <span className="text-xs text-neutral-500">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Skeleton variant="avatar" width="lg" />
        <span className="text-xs text-neutral-500">lg</span>
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────
// Card Skeleton
// ─────────────────────────────────────────
export const CardSkeleton: Story = {
  render: () => (
    <div className="bg-surface p-6 rounded-lg max-w-sm space-y-4 border border-neutral-300">
      {/* Card header image */}
      <Skeleton variant="block" width="100%" height={200} />

      {/* Card title */}
      <Skeleton variant="text" height="1.5rem" width="75%" />

      {/* Card description */}
      <Skeleton variant="text" height="1rem" lines={3} />

      {/* Button skeleton */}
      <div className="flex gap-2 pt-2">
        <Skeleton variant="block" width={100} height={40} />
        <Skeleton variant="block" width={100} height={40} />
      </div>
    </div>
  ),
};
