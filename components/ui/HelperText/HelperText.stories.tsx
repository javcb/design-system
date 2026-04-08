import type { Meta, StoryObj } from '@storybook/nextjs';
import { HelperText } from './HelperText';
import { Label } from '../Label';

const meta = {
  title: 'Design System/Components/HelperText',
  component: HelperText,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Helper text displayed below form fields. Shows descriptions or error/success/warning messages with optional icons.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success', 'warning'],
      description: 'Helper text variant/color',
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Text size',
      table: { defaultValue: { summary: 'sm' } },
    },
    icon: {
      control: 'boolean',
      description: 'Show status icon (error/success/warning only)',
    },
    id: {
      control: 'text',
      description: 'HTML id for aria-describedby linkage',
    },
  },
} satisfies Meta<typeof HelperText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'This field is required.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Email is not valid.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Email verified successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'This field will be public.',
  },
};

export const WithIcon: Story = {
  render: () => (
    <div className="space-y-3">
      <div>
        <HelperText variant="error" icon>
          Email is not valid.
        </HelperText>
      </div>
      <div>
        <HelperText variant="success" icon>
          Email verified.
        </HelperText>
      </div>
      <div>
        <HelperText variant="warning" icon>
          This will be public.
        </HelperText>
      </div>
    </div>
  ),
};

export const FormFieldComposition: Story = {
  render: () => (
    <div className="space-y-2 max-w-sm">
      <Label htmlFor="email" required>
        Email Address
      </Label>
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        aria-describedby="email-helper"
        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
      />
      <HelperText id="email-helper" variant="default">
        We'll never share your email.
      </HelperText>
    </div>
  ),
};
