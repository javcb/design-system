import type { Meta, StoryObj } from '@storybook/nextjs';
import { Heading } from './Heading';

const meta = {
  title: 'Design System/Components/Heading',
  component: Heading,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A semantic heading component (h1–h6) with decoupled size and styling. Size is independent from level, allowing flexible typography.',
      },
    },
  },
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'HTML heading level (h1–h6, default: h2)',
      table: { defaultValue: { summary: '2' } },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Font size. Overrides level default when provided.',
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
      table: { defaultValue: { summary: 'semibold' } },
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'error'],
      description: 'Text color',
      table: { defaultValue: { summary: 'default' } },
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
      table: { defaultValue: { summary: 'left' } },
    },
    truncate: {
      control: 'boolean',
      description: 'Single-line truncation with ellipsis',
      table: { defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultH1: Story = {
  args: {
    level: 1,
    children: 'Heading Level 1',
  },
};

export const AllLevels: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading level={1}>Heading 1 (h1)</Heading>
      <Heading level={2}>Heading 2 (h2)</Heading>
      <Heading level={3}>Heading 3 (h3)</Heading>
      <Heading level={4}>Heading 4 (h4)</Heading>
      <Heading level={5}>Heading 5 (h5)</Heading>
      <Heading level={6}>Heading 6 (h6)</Heading>
    </div>
  ),
};

export const DecoupledSizing: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading level={2} size="3xl">
        h2 rendered at 3xl size
      </Heading>
      <Heading level={3} size="xs">
        h3 rendered at xs size
      </Heading>
      <Heading level={4} size="xl">
        h4 rendered at xl size
      </Heading>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading color="default">Default color</Heading>
      <Heading color="muted">Muted color</Heading>
      <Heading color="primary">Primary color</Heading>
      <Heading color="error">Error color</Heading>
    </div>
  ),
};

export const Truncated: Story = {
  args: {
    level: 2,
    truncate: true,
    children:
      'This is a very long heading that will be truncated to a single line and show an ellipsis',
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};

export const Aligned: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading align="left">Left aligned</Heading>
      <Heading align="center">Center aligned</Heading>
      <Heading align="right">Right aligned</Heading>
    </div>
  ),
};
