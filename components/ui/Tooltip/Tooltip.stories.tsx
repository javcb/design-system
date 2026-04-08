import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    tooltipVariant: {
      control: 'select',
      options: ['default', 'dark', 'light'],
    },
    tooltipSide: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    hideArrow: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tooltip: 'This is a tooltip',
    tooltipVariant: 'default',
    tooltipSide: 'top',
    children: <Button>Hover me</Button>,
  },
};

export const TopPlacement: Story = {
  args: {
    tooltip: 'Tooltip on top',
    tooltipVariant: 'default',
    tooltipSide: 'top',
    children: <Button>Top</Button>,
  },
};

export const BottomPlacement: Story = {
  args: {
    tooltip: 'Tooltip on bottom',
    tooltipVariant: 'default',
    tooltipSide: 'bottom',
    children: <Button>Bottom</Button>,
  },
};

export const LeftPlacement: Story = {
  args: {
    tooltip: 'Tooltip on left',
    tooltipVariant: 'default',
    tooltipSide: 'left',
    children: <Button>Left</Button>,
  },
};

export const RightPlacement: Story = {
  args: {
    tooltip: 'Tooltip on right',
    tooltipVariant: 'default',
    tooltipSide: 'right',
    children: <Button>Right</Button>,
  },
};

export const DarkVariant: Story = {
  args: {
    tooltip: 'Dark tooltip',
    tooltipVariant: 'dark',
    tooltipSide: 'top',
    children: <Button>Dark</Button>,
  },
};

export const LightVariant: Story = {
  args: {
    tooltip: 'Light tooltip',
    tooltipVariant: 'light',
    tooltipSide: 'top',
    children: <Button>Light</Button>,
  },
};

export const WithoutArrow: Story = {
  args: {
    tooltip: 'No arrow',
    tooltipVariant: 'default',
    tooltipSide: 'top',
    hideArrow: true,
    children: <Button>No Arrow</Button>,
  },
};

export const LongContent: Story = {
  args: {
    tooltip: 'This is a longer tooltip with more detailed information about the element.',
    tooltipVariant: 'default',
    tooltipSide: 'top',
    children: <Button>Long Text</Button>,
  },
};

export const WithLink: Story = {
  args: {
    tooltip: 'Click me for help',
    tooltipVariant: 'default',
    tooltipSide: 'top',
    children: (
      <button className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)] rounded">
        Help Icon
      </button>
    ),
  },
};

export const AllPositions: Story = {
  render: () => (
    <div className="flex flex-col gap-12 p-8 bg-neutral-50 rounded-lg">
      <div className="flex justify-center">
        <Tooltip tooltip="Top" tooltipSide="top">
          <Button>Top</Button>
        </Tooltip>
      </div>
      <div className="flex gap-12 justify-center">
        <Tooltip tooltip="Left" tooltipSide="left">
          <Button>Left</Button>
        </Tooltip>
        <Tooltip tooltip="Right" tooltipSide="right">
          <Button>Right</Button>
        </Tooltip>
      </div>
      <div className="flex justify-center">
        <Tooltip tooltip="Bottom" tooltipSide="bottom">
          <Button>Bottom</Button>
        </Tooltip>
      </div>
    </div>
  ),
};
