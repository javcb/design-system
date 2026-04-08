import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error', 'default'],
    },
    open: {
      control: 'boolean',
    },
    duration: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    title: 'Notification',
    message: 'This is a default toast notification.',
    open: true,
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    message: 'This is an informational toast.',
    open: true,
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    message: 'Your operation completed successfully.',
    open: true,
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    message: 'Please be careful with this action.',
    open: true,
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    message: 'Something went wrong. Please try again.',
    open: true,
  },
};

export const WithAction: Story = {
  args: {
    variant: 'info',
    title: 'Undo Available',
    message: 'Your file has been deleted.',
    action: {
      label: 'Undo',
      onClick: () => console.log('Undo clicked'),
    },
    open: true,
  },
};

export const Dismissible: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
      <Toast
        {...args}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    );
  },
  args: {
    variant: 'success',
    title: 'Success',
    message: 'Toast notification with close button.',
  },
};

export const AutoDismiss: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
      <>
        <Toast
          {...args}
          open={isOpen}
          onClose={() => setIsOpen(false)}
          duration={3000}
        />
        <p className="text-sm text-neutral-500 mt-4">
          Toast will auto-dismiss after 3 seconds
        </p>
      </>
    );
  },
  args: {
    variant: 'info',
    title: 'Auto-dismissing',
    message: 'This toast will close automatically.',
  },
};

export const LongMessage: Story = {
  args: {
    variant: 'warning',
    title: 'Important Notice',
    message:
      'This is a longer toast message that may span multiple lines. It provides more detailed information about what the user should know.',
    open: true,
  },
};
