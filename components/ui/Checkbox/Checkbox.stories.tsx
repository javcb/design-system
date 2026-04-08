import type { Meta, StoryObj } from '@storybook/nextjs';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Design System/Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Custom checkbox input with label, description, and indeterminate state support.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Checkbox label text',
    },
    description: {
      control: 'text',
      description: 'Helper text below the checkbox',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state (mixed)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms',
  },
};

export const Checked: Story = {
  args: {
    label: 'Subscribe to newsletter',
    checked: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Enable notifications',
    description: 'Receive updates about new features and changes',
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all items',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'This checkbox is disabled',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled and checked',
    checked: true,
    disabled: true,
  },
};

export const Group: Story = {
  render: () => (
    <div className="space-y-3">
      <Checkbox label="Option 1" />
      <Checkbox label="Option 2" />
      <Checkbox label="Option 3" />
    </div>
  ),
};

export const WithLongDescription: Story = {
  args: {
    label: 'I understand and agree',
    description:
      'This is a longer description that explains what the user is agreeing to in more detail.',
  },
};
