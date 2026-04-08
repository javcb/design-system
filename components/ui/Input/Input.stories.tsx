import type { Meta, StoryObj } from '@storybook/nextjs';
import { Input } from './Input';

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const meta = {
  title: 'Design System/Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Text input field with support for icons, addons, and multiple states (default, error, success).',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
      table: { defaultValue: { summary: 'md' } },
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Input state/validation',
      table: { defaultValue: { summary: 'default' } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    size: 'md',
    state: 'default',
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Small input',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Large input',
    size: 'lg',
  },
};

export const WithLeftIcon: Story = {
  args: {
    placeholder: 'Search...',
    leftIcon: <SearchIcon />,
    size: 'md',
  },
};

export const WithLeftAddon: Story = {
  args: {
    placeholder: 'https://example.com',
    leftAddon: 'https://',
    size: 'md',
  },
};

export const WithRightAddon: Story = {
  args: {
    placeholder: 'Enter amount',
    rightAddon: 'USD',
    size: 'md',
  },
};

export const ErrorState: Story = {
  args: {
    placeholder: 'Invalid input',
    state: 'error',
    defaultValue: 'invalid@',
  },
};

export const SuccessState: Story = {
  args: {
    placeholder: 'Valid input',
    state: 'success',
    defaultValue: 'valid@example.com',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};
