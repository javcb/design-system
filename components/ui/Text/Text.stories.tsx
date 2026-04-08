import type { Meta, StoryObj } from '@storybook/nextjs';
import { Text } from './Text';

const meta = {
  title: 'Design System/Components/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A generic text component that renders as p, span, div, label, strong, or em. Provides size, weight, color, and line clamp variants.',
      },
    },
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'label', 'strong', 'em'],
      description: 'HTML element to render',
      table: { defaultValue: { summary: 'p' } },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Font size',
      table: { defaultValue: { summary: 'md' } },
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
      table: { defaultValue: { summary: 'normal' } },
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'subtle', 'primary', 'error', 'success', 'warning'],
      description: 'Text color',
      table: { defaultValue: { summary: 'default' } },
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
    },
    truncate: {
      control: 'boolean',
      description: 'Single-line truncation',
    },
    clamp: {
      control: 'select',
      options: [1, 2, 3, 4],
      description: 'Line clamp (multi-line truncation)',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    as: 'p',
    children: 'This is a paragraph of body text.',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-3">
      <Text size="xs">Extra small text (12px)</Text>
      <Text size="sm">Small text (14px)</Text>
      <Text size="md">Medium text (16px)</Text>
      <Text size="lg">Large text (18px)</Text>
      <Text size="xl">Extra large text (20px)</Text>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div className="space-y-2">
      <Text color="default">Default color</Text>
      <Text color="muted">Muted color</Text>
      <Text color="subtle">Subtle color</Text>
      <Text color="primary">Primary color</Text>
      <Text color="error">Error color</Text>
      <Text color="success">Success color</Text>
      <Text color="warning">Warning color</Text>
    </div>
  ),
};

export const AsPropVariants: Story = {
  render: () => (
    <div className="space-y-2">
      <Text as="p">Paragraph element</Text>
      <Text as="span">Span element</Text>
      <Text as="div">Div element</Text>
      <Text as="strong">Strong element</Text>
      <Text as="em">Emphasis element</Text>
    </div>
  ),
};

export const Truncated: Story = {
  args: {
    truncate: true,
    children: 'This is a very long line of text that will be truncated with an ellipsis when it exceeds the width of its container.',
  },
  decorators: [
    (Story) => (
      <div className="w-48">
        <Story />
      </div>
    ),
  ],
};

export const Clamped: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Text size="sm" color="muted" className="mb-2 block">
          2-line clamp
        </Text>
        <Text clamp={2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation.
        </Text>
      </div>
      <div>
        <Text size="sm" color="muted" className="mb-2 block">
          4-line clamp
        </Text>
        <Text clamp={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      </div>
    </div>
  ),
};
