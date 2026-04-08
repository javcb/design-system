import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from './DropdownMenu';

// ─────────────────────────────────────────
// Meta
// ─────────────────────────────────────────
const meta: Meta = {
  title: 'Overlays/DropdownMenu',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

// ─────────────────────────────────────────
// Story: Default
// ─────────────────────────────────────────
export const Default: StoryObj = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Help</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// ─────────────────────────────────────────
// Story: With Destructive Item
// ─────────────────────────────────────────
export const WithDestructiveItem: StoryObj = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Delete Account</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// ─────────────────────────────────────────
// Story: With Disabled Item
// ─────────────────────────────────────────
export const WithDisabledItem: StoryObj = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem disabled>Premium Feature (Upgrade)</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// ─────────────────────────────────────────
// Story: With Labels and Grouped Items
// ─────────────────────────────────────────
export const WithLabelsAndGroups: StoryObj = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Help</DropdownMenuLabel>
        <DropdownMenuItem>Documentation</DropdownMenuItem>
        <DropdownMenuItem>Contact Support</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// ─────────────────────────────────────────
// Story: Positioned Bottom-Right
// ─────────────────────────────────────────
export const PositionedBottomRight: StoryObj = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// ─────────────────────────────────────────
// Story: All Variants and States
// ─────────────────────────────────────────
export const AllVariantsAndStates: StoryObj = {
  render: () => (
    <div className="flex gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="primary">Primary Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start">
          <DropdownMenuLabel>Primary Variant</DropdownMenuLabel>
          <DropdownMenuItem>Option 1</DropdownMenuItem>
          <DropdownMenuItem>Option 2</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          <DropdownMenuItem disabled>Disabled Option</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">Secondary Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start">
          <DropdownMenuLabel>Secondary Variant</DropdownMenuLabel>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Copy</DropdownMenuItem>
          <DropdownMenuItem>Paste</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};

// ─────────────────────────────────────────
// Story: Controlled Open State
// ─────────────────────────────────────────
export const ControlledOpenState: StoryObj = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-neutral-700">
          Menu is currently: <strong>{open ? 'open' : 'closed'}</strong>
        </p>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button>Controlled Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start">
            <DropdownMenuItem onSelect={() => setOpen(false)}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setOpen(false)}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setOpen(false)}>
              Close Menu
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};
