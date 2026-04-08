import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from './Drawer';
import { Button } from '../Button';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
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
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

const DrawerContent = ({ onClose }: { onClose: () => void }) => (
  <>
    <DrawerHeader title="Navigation" onClose={onClose} />
    <DrawerBody>
      <nav className="space-y-2">
        <a href="#" className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded">
          Home
        </a>
        <a href="#" className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded">
          About
        </a>
        <a href="#" className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded">
          Services
        </a>
        <a href="#" className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded">
          Contact
        </a>
      </nav>
    </DrawerBody>
  </>
);

export const LeftDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Left Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} side="left">
          <DrawerContent onClose={() => setIsOpen(false)} />
        </Drawer>
      </>
    );
  },
};

export const RightDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Right Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} side="right">
          <DrawerContent onClose={() => setIsOpen(false)} />
        </Drawer>
      </>
    );
  },
};

export const TopDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Top Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} side="top">
          <DrawerContent onClose={() => setIsOpen(false)} />
        </Drawer>
      </>
    );
  },
};

export const BottomDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Bottom Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} side="bottom">
          <DrawerContent onClose={() => setIsOpen(false)} />
        </Drawer>
      </>
    );
  },
};

export const WithActions: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} side="left">
          <DrawerHeader title="Confirm Action" onClose={() => setIsOpen(false)} />
          <DrawerBody>
            <p>Are you sure you want to continue?</p>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
};

export const NoBackdropClick: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          side="left"
          closeOnBackdropClick={false}
        >
          <DrawerHeader title="Important" onClose={() => setIsOpen(false)} />
          <DrawerBody>
            <p>This drawer cannot be closed by clicking the backdrop.</p>
            <p>Use the X button or close button to dismiss.</p>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} side="left">
          <DrawerHeader title="Settings" onClose={() => setIsOpen(false)} />
          <DrawerBody>
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <label className="text-sm font-medium">Setting {i + 1}</label>
                  <input
                    type="checkbox"
                    defaultChecked={i % 2 === 0}
                    className="accent-primary"
                  />
                </div>
              ))}
            </div>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Save
            </Button>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
};
