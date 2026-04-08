import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { RadioGroup } from './RadioGroup';
import { Radio } from '../Radio';

const meta = {
  title: 'Design System/Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Container for grouped radio buttons with shared name and optional legend. Provides fieldset semantics and state management.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Radio group name attribute',
    },
    legend: {
      control: 'text',
      description: 'Fieldset legend text',
    },
    description: {
      control: 'text',
      description: 'Helper text below legend',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all radios in group',
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'example',
    legend: 'Choose an option',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio label="Option 1" name={args.name} value="option1" />
      <Radio label="Option 2" name={args.name} value="option2" />
      <Radio label="Option 3" name={args.name} value="option3" />
    </RadioGroup>
  ),
};

export const WithDescription: Story = {
  args: {
    name: 'frequency',
    legend: 'Update frequency',
    description: 'How often would you like to receive updates?',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio
        label="Daily"
        name={args.name}
        value="daily"
        description="Receive updates every day"
      />
      <Radio
        label="Weekly"
        name={args.name}
        value="weekly"
        description="Receive updates once a week"
      />
      <Radio
        label="Monthly"
        name={args.name}
        value="monthly"
        description="Receive updates once a month"
      />
    </RadioGroup>
  ),
};

export const PreSelected: Story = {
  args: {
    name: 'size',
    legend: 'Select size',
    value: 'medium',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio label="Small" name={args.name} value="small" />
      <Radio label="Medium" name={args.name} value="medium" defaultChecked />
      <Radio label="Large" name={args.name} value="large" />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  args: {
    name: 'disabled',
    legend: 'Disabled group',
    disabled: true,
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio label="Option 1" name={args.name} value="option1" />
      <Radio label="Option 2" name={args.name} value="option2" defaultChecked />
      <Radio label="Option 3" name={args.name} value="option3" />
    </RadioGroup>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState('option1');

    return (
      <RadioGroup
        name="controlled"
        legend="Controlled radio group"
        value={selected}
        onChange={setSelected}
      >
        <Radio
          label="Option 1"
          name="controlled"
          value="option1"
          checked={selected === 'option1'}
          onChange={() => setSelected('option1')}
        />
        <Radio
          label="Option 2"
          name="controlled"
          value="option2"
          checked={selected === 'option2'}
          onChange={() => setSelected('option2')}
        />
        <Radio
          label="Option 3"
          name="controlled"
          value="option3"
          checked={selected === 'option3'}
          onChange={() => setSelected('option3')}
        />
      </RadioGroup>
    );
  },
};
