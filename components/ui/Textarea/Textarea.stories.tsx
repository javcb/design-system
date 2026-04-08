import type { Meta, StoryObj } from '@storybook/nextjs';
import { Textarea } from './Textarea';

const meta = {
  title: 'Design System/Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Multiline text input field with optional character counter and resize control.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Textarea size',
      table: { defaultValue: { summary: 'md' } },
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Textarea state/validation',
      table: { defaultValue: { summary: 'default' } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    showCharacterCount: {
      control: 'boolean',
      description: 'Show character counter',
    },
    showResizeControl: {
      control: 'boolean',
      description: 'Allow vertical resizing',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Small textarea',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Large textarea',
    size: 'lg',
  },
};

export const WithCharacterCount: Story = {
  args: {
    placeholder: 'Enter message (max 200 chars)',
    showCharacterCount: true,
    maxLength: 200,
  },
};

export const WithCharacterCountOverLimit: Story = {
  args: {
    placeholder: 'Character count warning at 80%',
    showCharacterCount: true,
    maxLength: 100,
    defaultValue: 'This is a very long message that is approaching the character limit to demonstrate the warning state...',
  },
};

export const NoResize: Story = {
  args: {
    placeholder: 'Fixed height textarea',
    showResizeControl: false,
  },
};

export const ErrorState: Story = {
  args: {
    placeholder: 'Invalid input',
    state: 'error',
    defaultValue: 'This field has an error',
  },
};

export const SuccessState: Story = {
  args: {
    placeholder: 'Valid input',
    state: 'success',
    defaultValue: 'This field is valid',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled textarea',
    disabled: true,
    defaultValue: 'This field is disabled',
  },
};
