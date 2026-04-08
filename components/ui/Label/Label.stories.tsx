import type { Meta, StoryObj } from '@storybook/nextjs';
import { Label } from './Label';

const meta = {
  title: 'Design System/Components/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A form label component with support for required and optional indicators.',
      },
    },
  },
  argTypes: {
    htmlFor: {
      control: 'text',
      description: 'HTML for attribute (maps to input id)',
    },
    required: {
      control: 'boolean',
      description: 'Show red asterisk indicator',
    },
    optional: {
      control: 'boolean',
      description: 'Show "(optional)" text',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Label size',
      table: { defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Muted appearance',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    htmlFor: 'input-default',
    children: 'Label',
  },
};

export const Required: Story = {
  args: {
    htmlFor: 'input-required',
    required: true,
    children: 'Email Address',
  },
};

export const Optional: Story = {
  args: {
    htmlFor: 'input-optional',
    optional: true,
    children: 'Phone Number',
  },
};

export const Disabled: Story = {
  args: {
    htmlFor: 'input-disabled',
    disabled: true,
    children: 'Disabled Field',
  },
};

export const WithFormField: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email" required>
        Email Address
      </Label>
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
      />
    </div>
  ),
};
