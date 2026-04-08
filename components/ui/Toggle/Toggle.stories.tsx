import type { Meta, StoryObj } from '@storybook/nextjs';
import { Toggle } from './Toggle';

const meta = {
  title: 'Design System/Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Switch toggle component with optional label and description. Available in 3 sizes (sm/md/lg).',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Toggle size',
      table: { defaultValue: { summary: 'md' } },
    },
    label: {
      control: 'text',
      description: 'Toggle label text',
    },
    description: {
      control: 'text',
      description: 'Helper text below toggle',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Enable feature',
  },
};

export const Checked: Story = {
  args: {
    label: 'Feature enabled',
    checked: true,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small toggle',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large toggle',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Dark mode',
    description: 'Enable dark theme for the interface',
  },
};

export const WithDescriptionChecked: Story = {
  args: {
    label: 'Dark mode',
    description: 'Dark theme is currently enabled',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'This toggle is disabled',
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

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <Toggle size="sm" label="Small toggle" />
      <Toggle size="md" label="Medium toggle" />
      <Toggle size="lg" label="Large toggle" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Toggle label="Unchecked" checked={false} />
      <Toggle label="Checked" checked={true} />
      <Toggle label="Disabled unchecked" disabled />
      <Toggle label="Disabled checked" checked={true} disabled />
    </div>
  ),
};
