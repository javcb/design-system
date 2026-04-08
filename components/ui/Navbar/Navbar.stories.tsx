import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarLink,
  NavbarActions,
  NavbarMobileToggle,
  NavbarMobileMenu,
} from './Navbar';
import { Button } from '../Button';

// ─────────────────────────────────────────
// Meta
// ─────────────────────────────────────────
const meta: Meta = {
  title: 'Navigation/Navbar',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// ─────────────────────────────────────────
// Story: Default
// ─────────────────────────────────────────
export const Default: StoryObj = {
  render: () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    return (
      <>
        <Navbar>
          <NavbarBrand>MyApp</NavbarBrand>
          <NavbarContent>
            <NavbarItem>
              <NavbarLink href="#home" isActive>
                Home
              </NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink href="#features">Features</NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink href="#pricing">Pricing</NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink href="#docs">Docs</NavbarLink>
            </NavbarItem>
          </NavbarContent>
          <NavbarActions>
            <Button variant="secondary" size="sm">
              Login
            </Button>
            <Button variant="primary" size="sm">
              Sign Up
            </Button>
          </NavbarActions>
          <NavbarMobileToggle isOpen={mobileOpen} onToggle={setMobileOpen} />
        </Navbar>

        <NavbarMobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
          <NavbarLink href="#home" isActive>
            Home
          </NavbarLink>
          <NavbarLink href="#features">Features</NavbarLink>
          <NavbarLink href="#pricing">Pricing</NavbarLink>
          <NavbarLink href="#docs">Docs</NavbarLink>
          <div className="mt-4 flex flex-col gap-2">
            <Button variant="secondary" size="sm" className="w-full">
              Login
            </Button>
            <Button variant="primary" size="sm" className="w-full">
              Sign Up
            </Button>
          </div>
        </NavbarMobileMenu>

        <div className="p-8 bg-neutral-50">
          <p className="text-neutral-700">Main content area. Resize to see mobile menu.</p>
        </div>
      </>
    );
  },
};

// ─────────────────────────────────────────
// Story: With Active Link
// ─────────────────────────────────────────
export const WithActiveLink: StoryObj = {
  render: () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [active, setActive] = React.useState('features');

    return (
      <>
        <Navbar>
          <NavbarBrand>MyApp</NavbarBrand>
          <NavbarContent>
            <NavbarItem>
              <NavbarLink href="#home" isActive={active === 'home'} onClick={() => setActive('home')}>
                Home
              </NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink href="#features" isActive={active === 'features'} onClick={() => setActive('features')}>
                Features
              </NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink href="#pricing" isActive={active === 'pricing'} onClick={() => setActive('pricing')}>
                Pricing
              </NavbarLink>
            </NavbarItem>
          </NavbarContent>
          <NavbarActions>
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </NavbarActions>
          <NavbarMobileToggle isOpen={mobileOpen} onToggle={setMobileOpen} />
        </Navbar>

        <NavbarMobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
          <NavbarLink href="#home" isActive={active === 'home'} onClick={() => setActive('home')}>
            Home
          </NavbarLink>
          <NavbarLink href="#features" isActive={active === 'features'} onClick={() => setActive('features')}>
            Features
          </NavbarLink>
          <NavbarLink href="#pricing" isActive={active === 'pricing'} onClick={() => setActive('pricing')}>
            Pricing
          </NavbarLink>
        </NavbarMobileMenu>

        <div className="p-8 bg-neutral-50">
          <p className="text-neutral-700">Currently on: {active}</p>
        </div>
      </>
    );
  },
};

// ─────────────────────────────────────────
// Story: Minimal (Brand Only)
// ─────────────────────────────────────────
export const Minimal: StoryObj = {
  render: () => (
    <>
      <Navbar>
        <NavbarBrand>Logo</NavbarBrand>
      </Navbar>
      <div className="p-8 bg-neutral-50">
        <p className="text-neutral-700">Minimal navbar with just brand.</p>
      </div>
    </>
  ),
};

// ─────────────────────────────────────────
// Story: Not Sticky
// ─────────────────────────────────────────
export const NotSticky: StoryObj = {
  render: () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    return (
      <>
        <Navbar sticky={false}>
          <NavbarBrand>MyApp</NavbarBrand>
          <NavbarContent>
            <NavbarItem>
              <NavbarLink href="#home" isActive>
                Home
              </NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink href="#about">About</NavbarLink>
            </NavbarItem>
          </NavbarContent>
          <NavbarActions>
            <Button variant="primary" size="sm">
              CTA
            </Button>
          </NavbarActions>
          <NavbarMobileToggle isOpen={mobileOpen} onToggle={setMobileOpen} />
        </Navbar>

        <NavbarMobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
          <NavbarLink href="#home" isActive>
            Home
          </NavbarLink>
          <NavbarLink href="#about">About</NavbarLink>
        </NavbarMobileMenu>

        <div className="p-8 bg-neutral-50 min-h-screen">
          <p className="text-neutral-700">Navbar is NOT sticky (can scroll away)</p>
          <p className="mt-4 text-neutral-600">Scroll down to see.</p>
          {[...Array(20)].map((_, i) => (
            <p key={i} className="mt-4 text-neutral-500">
              Content line {i + 1}
            </p>
          ))}
        </div>
      </>
    );
  },
};
