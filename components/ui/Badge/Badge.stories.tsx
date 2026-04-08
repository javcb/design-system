import type { Meta, StoryObj } from '@storybook/nextjs';
import { Badge } from './Badge';
import { Text } from '../Text';

const meta = {
  title: 'Design System/Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A badge component for displaying status, counts, or labels. Supports 7 variants and optional status dot.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'accent', 'neutral', 'success', 'warning', 'error', 'info'],
      description: 'Badge variant/color',
      table: { defaultValue: { summary: 'neutral' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Badge size',
      table: { defaultValue: { summary: 'md' } },
    },
    dot: {
      control: 'boolean',
      description: 'Show a colored dot before the text',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="primary" dot>
        Active
      </Badge>
      <Badge variant="success" dot>
        Completed
      </Badge>
      <Badge variant="warning" dot>
        Pending
      </Badge>
      <Badge variant="error" dot>
        Failed
      </Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </div>
  ),
};

export const InlineWithText: Story = {
  render: () => (
    <Text>
      This feature is{' '}
      <Badge variant="primary" size="sm">
        New
      </Badge>{' '}
      and still in{' '}
      <Badge variant="warning" size="sm">
        Beta
      </Badge>
      .
    </Text>
  ),
};
