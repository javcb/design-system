import type { Meta, StoryObj } from '@storybook/nextjs';
import { Avatar } from './Avatar';

const meta = {
  title: 'Design System/Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'User avatar with image, initials fallback, and icon fallback. Supports 6 sizes, circle/square shapes, and status indicators.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Avatar size',
      table: { defaultValue: { summary: 'md' } },
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
      description: 'Avatar shape',
      table: { defaultValue: { summary: 'circle' } },
    },
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    name: {
      control: 'text',
      description: 'User name (used for initials)',
    },
    initials: {
      control: 'text',
      description: 'Custom initials override',
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'away', 'busy'],
      description: 'Status indicator',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'John Doe',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    alt: 'User avatar',
    name: 'John Doe',
  },
};

export const WithInitials: Story = {
  args: {
    initials: 'AB',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <Avatar size="xs" name="John Doe" />
      <Avatar size="sm" name="John Doe" />
      <Avatar size="md" name="John Doe" />
      <Avatar size="lg" name="John Doe" />
      <Avatar size="xl" name="John Doe" />
      <Avatar size="2xl" name="John Doe" />
    </div>
  ),
};

export const AllShapes: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar shape="circle" size="lg" name="John Doe" />
        <span className="text-xs text-neutral-600">Circle</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar shape="square" size="lg" name="John Doe" />
        <span className="text-xs text-neutral-600">Square</span>
      </div>
    </div>
  ),
};

export const WithStatusOnline: Story = {
  args: {
    name: 'John Doe',
    status: 'online',
    size: 'lg',
  },
};

export const WithStatusOffline: Story = {
  args: {
    name: 'Jane Smith',
    status: 'offline',
    size: 'lg',
  },
};

export const WithStatusAway: Story = {
  args: {
    name: 'Bob Johnson',
    status: 'away',
    size: 'lg',
  },
};

export const WithStatusBusy: Story = {
  args: {
    name: 'Alice Williams',
    status: 'busy',
    size: 'lg',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar name="John" status="online" size="lg" />
        <span className="text-xs text-neutral-600">Online</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar name="Jane" status="offline" size="lg" />
        <span className="text-xs text-neutral-600">Offline</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar name="Bob" status="away" size="lg" />
        <span className="text-xs text-neutral-600">Away</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar name="Alice" status="busy" size="lg" />
        <span className="text-xs text-neutral-600">Busy</span>
      </div>
    </div>
  ),
};

export const IconFallback: Story = {
  args: {
    size: 'lg',
  },
};

export const Group: Story = {
  render: () => (
    <div className="flex gap-2">
      <Avatar name="Alice" size="md" />
      <Avatar name="Bob" size="md" />
      <Avatar name="Charlie" size="md" />
      <Avatar name="Diana" size="md" />
    </div>
  ),
};
