import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    dismissible: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'This is an informational alert message.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'This is an informational alert message.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    children: 'Your operation completed successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Please be careful with this action.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'Something went wrong. Please try again.',
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: 'info',
    children: 'This alert has no title, just a message.',
  },
};

export const Dismissible: Story = {
  render: (args) => {
    const [isDismissed, setIsDismissed] = React.useState(false);

    if (isDismissed) {
      return <div className="text-neutral-500">Alert dismissed. Refresh to see it again.</div>;
    }

    return (
      <Alert
        {...args}
        dismissible={true}
        onDismiss={() => setIsDismissed(true)}
      />
    );
  },
  args: {
    variant: 'info',
    title: 'Dismissible Alert',
    children: 'Click the X button to dismiss this alert.',
  },
};

export const LongContent: Story = {
  args: {
    variant: 'warning',
    title: 'Important Notice',
    children:
      'This is a longer alert message that may span multiple lines. It provides more detailed information about what the user should know or do in response to this alert.',
  },
};
