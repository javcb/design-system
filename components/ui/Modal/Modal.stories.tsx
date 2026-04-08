import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';
import { Button } from '../Button';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    isOpen: {
      control: 'boolean',
    },
    closeOnBackdropClick: {
      control: 'boolean',
    },
    closeOnEscape: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const BasicModalContent = ({ onClose }: { onClose: () => void }) => (
  <>
    <ModalHeader title="Confirm Action" onClose={onClose} />
    <ModalBody>
      <p>Are you sure you want to continue with this action?</p>
    </ModalBody>
    <ModalFooter>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={onClose}>
        Confirm
      </Button>
    </ModalFooter>
  </>
);

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
          <BasicModalContent onClose={() => setIsOpen(false)} />
        </Modal>
      </>
    );
  },
};

export const SmallModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Small Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
          <BasicModalContent onClose={() => setIsOpen(false)} />
        </Modal>
      </>
    );
  },
};

export const LargeModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Large Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
          <ModalHeader title="Large Modal" onClose={() => setIsOpen(false)} />
          <ModalBody>
            <p className="mb-4">
              This is a large modal with more space for content.
            </p>
            <p className="mb-4">
              It provides plenty of room for forms, detailed information, or other
              substantial content.
            </p>
            <p>
              The modal will automatically manage focus and handle escape key to close.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const WithoutCloseButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModalHeader title="Confirmation" showCloseButton={false} />
          <ModalBody>
            <p>Please confirm your action. You can only use the buttons below.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              No
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const NoBackdropClick: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          closeOnBackdropClick={false}
        >
          <ModalHeader title="Important" onClose={() => setIsOpen(false)} />
          <ModalBody>
            <p>This modal cannot be closed by clicking the backdrop.</p>
            <p>You must use the Close or X button to dismiss it.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
          <ModalHeader
            title="Enter Your Information"
            onClose={() => setIsOpen(false)}
          />
          <ModalBody>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Submit
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
          <ModalHeader
            title="Terms and Conditions"
            onClose={() => setIsOpen(false)}
          />
          <ModalBody>
            <div className="space-y-3 text-sm text-neutral-600">
              {[...Array(5)].map((_, i) => (
                <p key={i}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Decline
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Accept
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};
