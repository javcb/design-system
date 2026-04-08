import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
} from './Card';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Text } from '../Text';

const meta: Meta<typeof Card> = {
  title: 'Data Display/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>A simple card with header and content</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>
          This is the main content area of the card. It can contain any content you need.
        </Text>
      </CardContent>
      <CardFooter>
        <Button variant="primary" size="sm">
          Action
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div>
        <Text className="text-sm font-semibold mb-2">Default</Text>
        <Card variant="default" className="w-80">
          <CardHeader>
            <CardTitle>Default Card</CardTitle>
            <CardDescription>Standard appearance</CardDescription>
          </CardHeader>
          <CardContent>
            <Text>Content goes here</Text>
          </CardContent>
        </Card>
      </div>

      <div>
        <Text className="text-sm font-semibold mb-2">Outlined</Text>
        <Card variant="outlined" className="w-80">
          <CardHeader>
            <CardTitle>Outlined Card</CardTitle>
            <CardDescription>Border-only style</CardDescription>
          </CardHeader>
          <CardContent>
            <Text>Content goes here</Text>
          </CardContent>
        </Card>
      </div>

      <div>
        <Text className="text-sm font-semibold mb-2">Elevated</Text>
        <Card variant="elevated" className="w-80">
          <CardHeader>
            <CardTitle>Elevated Card</CardTitle>
            <CardDescription>With shadow effect</CardDescription>
          </CardHeader>
          <CardContent>
            <Text>Content goes here</Text>
          </CardContent>
        </Card>
      </div>

      <div>
        <Text className="text-sm font-semibold mb-2">Ghost</Text>
        <Card variant="ghost" className="w-80 border border-dashed border-neutral-300">
          <CardHeader>
            <CardTitle>Ghost Card</CardTitle>
            <CardDescription>No background or border</CardDescription>
          </CardHeader>
          <CardContent>
            <Text>Content goes here</Text>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};

export const AllPaddings: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div>
        <Text className="text-sm font-semibold mb-2">No Padding</Text>
        <Card padding="none" className="w-80 bg-neutral-100">
          <CardContent className="p-4">
            <Text>No padding variant</Text>
          </CardContent>
        </Card>
      </div>

      <div>
        <Text className="text-sm font-semibold mb-2">Small</Text>
        <Card padding="sm" className="w-80">
          <CardHeader>
            <CardTitle>Small Padding</CardTitle>
          </CardHeader>
          <CardContent>
            <Text>Compact spacing</Text>
          </CardContent>
        </Card>
      </div>

      <div>
        <Text className="text-sm font-semibold mb-2">Medium (Default)</Text>
        <Card padding="md" className="w-80">
          <CardHeader>
            <CardTitle>Medium Padding</CardTitle>
          </CardHeader>
          <CardContent>
            <Text>Standard spacing</Text>
          </CardContent>
        </Card>
      </div>

      <div>
        <Text className="text-sm font-semibold mb-2">Large</Text>
        <Card padding="lg" className="w-80">
          <CardHeader>
            <CardTitle>Large Padding</CardTitle>
          </CardHeader>
          <CardContent>
            <Text>Generous spacing</Text>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Feature Card</CardTitle>
          <Badge variant="success" size="sm">New</Badge>
        </div>
        <CardDescription>This card highlights a new feature</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>
          The badge in the header indicates this is a recently added feature.
          You can mix any components in the header area.
        </Text>
      </CardContent>
    </Card>
  ),
};

export const WithFooterActions: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>User Card</CardTitle>
        <CardDescription>User profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <Text className="font-semibold">John Doe</Text>
            <Text className="text-neutral-500 text-sm">john@example.com</Text>
          </div>
          <Text className="text-sm">Active member since 2024</Text>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="primary" size="sm">Edit</Button>
        <Button variant="ghost" size="sm">Remove</Button>
      </CardFooter>
    </Card>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Card variant="elevated" className="w-full max-w-2xl">
      <div className="flex">
        <div className="w-40 h-40 bg-gradient-to-br from-primary to-accent rounded-l-lg flex items-center justify-center text-white text-3xl font-bold">
          JD
        </div>
        <div className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle>Horizontal Layout</CardTitle>
            <CardDescription>Image on left, content on right</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <Text>
              This card uses a horizontal layout combining an image/avatar section
              with content on the right side. Useful for product cards, user profiles, etc.
            </Text>
          </CardContent>
          <CardFooter>
            <Button variant="primary" size="sm">View</Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  ),
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>Card {i}</CardTitle>
            <CardDescription>Subtitle for card {i}</CardDescription>
          </CardHeader>
          <CardContent>
            <Text>Card content goes here. Cards are useful for organizing content into logical sections.</Text>
          </CardContent>
          <CardFooter>
            <Button variant="primary" size="sm">Action</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  ),
};
