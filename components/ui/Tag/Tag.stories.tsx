import type { Meta, StoryObj } from '@storybook/nextjs';
import { Tag } from './Tag';
import React from 'react';

const meta = {
  title: 'Design System/Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A dismissible tag component for user-generated content, filters, or selected items. Supports dismiss callback.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'accent'],
      description: 'Tag variant',
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Tag size',
      table: { defaultValue: { summary: 'md' } },
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Callback when dismiss button clicked',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable dismiss button',
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Tag',
  },
};

export const WithDismiss: Story = {
  args: {
    variant: 'default',
    onDismiss: () => console.log('Dismissed'),
    children: 'Dismissible Tag',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Tag variant="default" onDismiss={() => {}}>
        Default
      </Tag>
      <Tag variant="primary" onDismiss={() => {}}>
        Primary
      </Tag>
      <Tag variant="accent" onDismiss={() => {}}>
        Accent
      </Tag>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Tag variant="default" onDismiss={() => {}} disabled>
        Disabled Default
      </Tag>
      <Tag variant="primary" onDismiss={() => {}} disabled>
        Disabled Primary
      </Tag>
    </div>
  ),
};

export const TagGroup: Story = {
  render: () => {
    const [tags, setTags] = React.useState(['React', 'TypeScript', 'Tailwind', 'Design System']);

    return (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag
            key={tag}
            variant="primary"
            onDismiss={() => setTags(tags.filter((t) => t !== tag))}
          >
            {tag}
          </Tag>
        ))}
      </div>
    );
  },
};
