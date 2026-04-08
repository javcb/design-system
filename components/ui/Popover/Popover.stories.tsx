import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverContent } from './Popover';
import { Button } from '../Button';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    hideArrow: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    side: 'top',
    children: <Button>Hover me</Button>,
    content: (
      <div className="p-4 max-w-xs">
        <h3 className="font-semibold mb-2">Popover Title</h3>
        <p className="text-sm text-neutral-600">
          This is a popover content that appears on hover or focus.
        </p>
      </div>
    ),
  },
};

export const TopPopover: Story = {
  args: {
    side: 'top',
    children: <Button>Top</Button>,
    content: (
      <div className="p-3">
        <p className="text-sm">Popover on top</p>
      </div>
    ),
  },
};

export const BottomPopover: Story = {
  args: {
    side: 'bottom',
    children: <Button>Bottom</Button>,
    content: (
      <div className="p-3">
        <p className="text-sm">Popover on bottom</p>
      </div>
    ),
  },
};

export const LeftPopover: Story = {
  args: {
    side: 'left',
    children: <Button>Left</Button>,
    content: (
      <div className="p-3">
        <p className="text-sm">Popover on left</p>
      </div>
    ),
  },
};

export const RightPopover: Story = {
  args: {
    side: 'right',
    children: <Button>Right</Button>,
    content: (
      <div className="p-3">
        <p className="text-sm">Popover on right</p>
      </div>
    ),
  },
};

export const WithoutArrow: Story = {
  args: {
    side: 'top',
    hideArrow: true,
    children: <Button>No Arrow</Button>,
    content: (
      <div className="p-4">
        <p className="text-sm">Popover without arrow</p>
      </div>
    ),
  },
};

export const RichContent: Story = {
  args: {
    side: 'top',
    children: <Button>Rich Content</Button>,
    content: (
      <div className="p-4 max-w-sm space-y-3">
        <h3 className="font-semibold text-neutral-900">Settings</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="accent-primary" />
            <span className="text-sm">Option 1</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-primary" />
            <span className="text-sm">Option 2</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-primary" />
            <span className="text-sm">Option 3</span>
          </label>
        </div>
      </div>
    ),
  },
};

export const WithButton: Story = {
  args: {
    side: 'top',
    children: <Button>Click for popover</Button>,
    content: (
      <div className="p-4 max-w-sm space-y-3">
        <p className="text-sm">Are you sure you want to proceed?</p>
        <div className="flex gap-2 justify-end">
          <button className="px-3 py-1 text-sm rounded border border-neutral-300 hover:bg-neutral-50">
            Cancel
          </button>
          <button className="px-3 py-1 text-sm rounded bg-primary text-white hover:opacity-90">
            Confirm
          </button>
        </div>
      </div>
    ),
  },
};

export const AllPositions: Story = {
  render: () => (
    <div className="flex flex-col gap-16 p-8 bg-neutral-50 rounded-lg">
      <div className="flex justify-center">
        <Popover side="top" content={<div className="p-2 text-sm">Top position</div>}>
          <Button>Top</Button>
        </Popover>
      </div>
      <div className="flex gap-16 justify-center">
        <Popover side="left" content={<div className="p-2 text-sm">Left position</div>}>
          <Button>Left</Button>
        </Popover>
        <Popover side="right" content={<div className="p-2 text-sm">Right position</div>}>
          <Button>Right</Button>
        </Popover>
      </div>
      <div className="flex justify-center">
        <Popover side="bottom" content={<div className="p-2 text-sm">Bottom position</div>}>
          <Button>Bottom</Button>
        </Popover>
      </div>
    </div>
  ),
};
