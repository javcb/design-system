import type { Meta, StoryObj } from '@storybook/nextjs';
import { Radio } from './Radio';

const meta = {
  title: 'Design System/Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Custom radio input with label and description support. Works with RadioGroup for grouped selections.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Radio label text',
    },
    description: {
      control: 'text',
      description: 'Helper text below the radio',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    name: {
      control: 'text',
      description: 'Radio group name',
    },
    value: {
      control: 'text',
      description: 'Radio value',
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Option 1',
    name: 'example',
    value: 'option1',
  },
};

export const Checked: Story = {
  args: {
    label: 'Selected option',
    name: 'example',
    value: 'selected',
    checked: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Advanced settings',
    description: 'Enable advanced configuration options',
    name: 'settings',
    value: 'advanced',
  },
};

export const Disabled: Story = {
  args: {
    label: 'This option is disabled',
    name: 'example',
    value: 'disabled',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Selected but disabled',
    name: 'example',
    value: 'disabled-checked',
    checked: true,
    disabled: true,
  },
};

export const Group: Story = {
  render: () => (
    <fieldset className="space-y-3 border border-neutral-300 rounded-lg p-4">
      <legend className="text-sm font-semibold">Choose a frequency</legend>
      <Radio
        label="Daily"
        name="frequency"
        value="daily"
        defaultChecked
      />
      <Radio
        label="Weekly"
        name="frequency"
        value="weekly"
      />
      <Radio
        label="Monthly"
        name="frequency"
        value="monthly"
      />
    </fieldset>
  ),
};
