import type { Meta, StoryObj } from '@storybook/nextjs';
import { Link } from './Link';

const meta = {
  title: 'Design System/Components/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A styled anchor element for inline and standalone navigation. Supports internal and external links with optional icon. Renders as disabled text when disabled=true.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['inline', 'standalone', 'nav'],
      description: 'Link variant. inline: underlined for body text. standalone: no underline, stands alone. nav: for navigation contexts.',
      table: {
        defaultValue: { summary: 'inline' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Font size. sm: small, md: medium (default), lg: large.',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    href: {
      control: 'text',
      description: 'URL the link points to.',
    },
    external: {
      control: 'boolean',
      description: 'If true, opens in new tab and adds external link icon.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'If true, renders as <span>, not clickable.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: 'Link text content.',
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─────────────────────────────────────────
// Default Story
// ─────────────────────────────────────────
export const Default: Story = {
  args: {
    variant: 'inline',
    size: 'md',
    href: '#',
    children: 'Click here',
  },
};

// ─────────────────────────────────────────
// All Variants
// ─────────────────────────────────────────
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Link variant="inline" href="#">
          Inline variant
        </Link>
        {' — for links inside body text'}
      </div>
      <div>
        <Link variant="standalone" href="#">
          Standalone variant
        </Link>
        {' — for standalone links like "View all"'}
      </div>
      <div>
        <Link variant="nav" href="#">
          Nav variant
        </Link>
        {' — for navigation menus'}
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────
// External Link
// ─────────────────────────────────────────
export const External: Story = {
  args: {
    variant: 'standalone',
    size: 'md',
    href: 'https://example.com',
    external: true,
    children: 'Open in new tab',
  },
};

// ─────────────────────────────────────────
// Disabled State
// ─────────────────────────────────────────
export const Disabled: Story = {
  render: () => (
    <div className="space-y-2">
      <div>
        <Link variant="inline" href="#" disabled>
          Disabled inline link
        </Link>
      </div>
      <div>
        <Link variant="standalone" href="#" disabled>
          Disabled standalone
        </Link>
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────
// Inside Text (Inline Variant in Context)
// ─────────────────────────────────────────
export const InsideText: Story = {
  render: () => (
    <p className="text-base text-neutral-700 max-w-prose">
      This paragraph contains{' '}
      <Link variant="inline" href="#">
        an inline link
      </Link>
      {' '}that sits naturally within body copy. The underline makes it discoverable, and hovering changes the color to show it is interactive.
    </p>
  ),
};
