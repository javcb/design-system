import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar, ProgressCircle } from './Progress';

const meta = {
  title: 'Components/Progress',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    showLabel: {
      control: 'boolean',
    },
    animated: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type StoryBar = StoryObj<typeof meta>;

// ─────────────────────────────────────────
// Progress Bar Stories
// ─────────────────────────────────────────

export const ProgressBarDefault: StoryBar = {
  args: {
    value: 45,
    max: 100,
    variant: 'default',
    size: 'md',
    showLabel: false,
    animated: false,
  },
};

export const ProgressBarWithLabel: StoryBar = {
  args: {
    value: 65,
    max: 100,
    variant: 'default',
    size: 'md',
    showLabel: true,
    animated: false,
  },
};

export const ProgressBarSmall: StoryBar = {
  args: {
    value: 30,
    max: 100,
    variant: 'default',
    size: 'sm',
    showLabel: false,
    animated: false,
  },
};

export const ProgressBarLarge: StoryBar = {
  args: {
    value: 75,
    max: 100,
    variant: 'default',
    size: 'lg',
    showLabel: true,
    animated: false,
  },
};

export const ProgressBarSuccess: StoryBar = {
  args: {
    value: 100,
    max: 100,
    variant: 'success',
    size: 'md',
    showLabel: true,
    animated: false,
  },
};

export const ProgressBarWarning: StoryBar = {
  args: {
    value: 50,
    max: 100,
    variant: 'warning',
    size: 'md',
    showLabel: true,
    animated: false,
  },
};

export const ProgressBarError: StoryBar = {
  args: {
    value: 25,
    max: 100,
    variant: 'error',
    size: 'md',
    showLabel: true,
    animated: false,
  },
};

export const ProgressBarInfo: StoryBar = {
  args: {
    value: 60,
    max: 100,
    variant: 'info',
    size: 'md',
    showLabel: true,
    animated: false,
  },
};

export const ProgressBarAnimated: StoryBar = {
  args: {
    value: 40,
    max: 100,
    variant: 'default',
    size: 'md',
    showLabel: true,
    animated: true,
  },
};

export const ProgressBarIndeterminate: StoryBar = {
  render: () => (
    <ProgressBar
      value={undefined}
      max={100}
      variant="info"
      size="md"
      animated={true}
    />
  ),
};

// ─────────────────────────────────────────
// Progress Circle Stories
// ─────────────────────────────────────────

export const ProgressCircleDefault: StoryObj<typeof ProgressCircle> = {
  render: () => (
    <ProgressCircle value={45} max={100} variant="default" size="md" />
  ),
};

export const ProgressCircleSmall: StoryObj<typeof ProgressCircle> = {
  render: () => (
    <ProgressCircle value={30} max={100} variant="default" size="sm" />
  ),
};

export const ProgressCircleLarge: StoryObj<typeof ProgressCircle> = {
  render: () => (
    <ProgressCircle value={75} max={100} variant="default" size="lg" />
  ),
};

export const ProgressCircleSuccess: StoryObj<typeof ProgressCircle> = {
  render: () => (
    <ProgressCircle value={100} max={100} variant="success" size="md" />
  ),
};

export const ProgressCircleWarning: StoryObj<typeof ProgressCircle> = {
  render: () => (
    <ProgressCircle value={50} max={100} variant="warning" size="md" />
  ),
};

export const ProgressCircleError: StoryObj<typeof ProgressCircle> = {
  render: () => (
    <ProgressCircle value={25} max={100} variant="error" size="md" />
  ),
};

export const ProgressCircleInfo: StoryObj<typeof ProgressCircle> = {
  render: () => (
    <ProgressCircle value={60} max={100} variant="info" size="md" />
  ),
};

export const ProgressCircleWithoutLabel: StoryObj<typeof ProgressCircle> = {
  render: () => (
    <ProgressCircle
      value={70}
      max={100}
      variant="info"
      size="md"
      showLabel={false}
    />
  ),
};

export const AllProgressBars: StoryBar = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium mb-2">Default - 45%</p>
        <ProgressBar value={45} />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Success - 100%</p>
        <ProgressBar value={100} variant="success" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Warning - 50%</p>
        <ProgressBar value={50} variant="warning" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Error - 25%</p>
        <ProgressBar value={25} variant="error" />
      </div>
    </div>
  ),
};

export const AllProgressCircles: StoryObj<typeof ProgressCircle> = {
  render: () => (
    <div className="flex gap-12">
      <div>
        <p className="text-sm font-medium text-center mb-4">Default</p>
        <ProgressCircle value={45} />
      </div>
      <div>
        <p className="text-sm font-medium text-center mb-4">Success</p>
        <ProgressCircle value={100} variant="success" />
      </div>
      <div>
        <p className="text-sm font-medium text-center mb-4">Warning</p>
        <ProgressCircle value={50} variant="warning" />
      </div>
      <div>
        <p className="text-sm font-medium text-center mb-4">Error</p>
        <ProgressCircle value={25} variant="error" />
      </div>
    </div>
  ),
};
