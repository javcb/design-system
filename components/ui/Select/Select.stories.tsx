import type { Meta, StoryObj } from '@storybook/nextjs';
import { Select } from './Select';

const meta = {
  title: 'Design System/Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Native select dropdown with custom styling and optional placeholder.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Select size',
      table: { defaultValue: { summary: 'md' } },
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Select state/validation',
      table: { defaultValue: { summary: 'default' } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder option text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Select an option',
  },
  render: (args) => (
    <Select {...args}>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  ),
};

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Choose...',
  },
  render: (args) => (
    <Select {...args}>
      <option value="small1">Small Option 1</option>
      <option value="small2">Small Option 2</option>
    </Select>
  ),
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Select a large option',
  },
  render: (args) => (
    <Select {...args}>
      <option value="large1">Large Option 1</option>
      <option value="large2">Large Option 2</option>
      <option value="large3">Large Option 3</option>
    </Select>
  ),
};

export const WithDefaultValue: Story = {
  args: {
    placeholder: 'Select a country',
  },
  render: (args) => (
    <Select {...args} defaultValue="usa">
      <option value="usa">United States</option>
      <option value="canada">Canada</option>
      <option value="mexico">Mexico</option>
    </Select>
  ),
};

export const ErrorState: Story = {
  args: {
    state: 'error',
    placeholder: 'Invalid selection',
  },
  render: (args) => (
    <Select {...args} defaultValue="invalid">
      <option value="valid1">Valid Option 1</option>
      <option value="valid2">Valid Option 2</option>
    </Select>
  ),
};

export const SuccessState: Story = {
  args: {
    state: 'success',
    placeholder: 'Choose an option',
  },
  render: (args) => (
    <Select {...args} defaultValue="success">
      <option value="success">Selected Successfully</option>
      <option value="other">Other Option</option>
    </Select>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled select',
    disabled: true,
  },
  render: (args) => (
    <Select {...args} defaultValue="disabled">
      <option value="disabled">This field is disabled</option>
      <option value="other">Other option</option>
    </Select>
  ),
};
