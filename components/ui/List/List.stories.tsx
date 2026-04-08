import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  List,
  ListItem,
  ListItemLeading,
  ListItemContent,
  ListItemTitle,
  ListItemSubtitle,
  ListItemTrailing,
} from './List';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Divider } from '../Divider';
import { Text } from '../Text';

const meta: Meta<typeof List> = {
  title: 'Data Display/List',
  component: List,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <List>
      <ListItem>
        <ListItemLeading>📧</ListItemLeading>
        <ListItemContent>
          <ListItemTitle>Email Notifications</ListItemTitle>
          <ListItemSubtitle>Enabled</ListItemSubtitle>
        </ListItemContent>
      </ListItem>
      <ListItem>
        <ListItemLeading>🔔</ListItemLeading>
        <ListItemContent>
          <ListItemTitle>Push Notifications</ListItemTitle>
          <ListItemSubtitle>Disabled</ListItemSubtitle>
        </ListItemContent>
      </ListItem>
      <ListItem>
        <ListItemLeading>📱</ListItemLeading>
        <ListItemContent>
          <ListItemTitle>Mobile Alerts</ListItemTitle>
          <ListItemSubtitle>Enabled</ListItemSubtitle>
        </ListItemContent>
      </ListItem>
    </List>
  ),
};

export const WithAvatars: Story = {
  render: () => (
    <List>
      <ListItem>
        <ListItemLeading>
          <Avatar initials="JD" size="sm" />
        </ListItemLeading>
        <ListItemContent>
          <ListItemTitle>John Doe</ListItemTitle>
          <ListItemSubtitle>john@example.com</ListItemSubtitle>
        </ListItemContent>
      </ListItem>
      <ListItem>
        <ListItemLeading>
          <Avatar initials="AB" size="sm" />
        </ListItemLeading>
        <ListItemContent>
          <ListItemTitle>Alice Brown</ListItemTitle>
          <ListItemSubtitle>alice@example.com</ListItemSubtitle>
        </ListItemContent>
      </ListItem>
      <ListItem>
        <ListItemLeading>
          <Avatar initials="CS" size="sm" />
        </ListItemLeading>
        <ListItemContent>
          <ListItemTitle>Carol Smith</ListItemTitle>
          <ListItemSubtitle>carol@example.com</ListItemSubtitle>
        </ListItemContent>
      </ListItem>
    </List>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <List>
      <ListItem>
        <ListItemLeading>
          <Avatar initials="JD" size="sm" />
        </ListItemLeading>
        <ListItemContent>
          <ListItemTitle>John Doe</ListItemTitle>
          <ListItemSubtitle>Product Manager</ListItemSubtitle>
        </ListItemContent>
        <ListItemTrailing>
          <Badge variant="primary" size="sm">
            Online
          </Badge>
        </ListItemTrailing>
      </ListItem>
      <ListItem>
        <ListItemLeading>
          <Avatar initials="AB" size="sm" />
        </ListItemLeading>
        <ListItemContent>
          <ListItemTitle>Alice Brown</ListItemTitle>
          <ListItemSubtitle>Engineer</ListItemSubtitle>
        </ListItemContent>
        <ListItemTrailing>
          <Badge variant="warning" size="sm">
            Away
          </Badge>
        </ListItemTrailing>
      </ListItem>
      <ListItem>
        <ListItemLeading>
          <Avatar initials="CS" size="sm" />
        </ListItemLeading>
        <ListItemContent>
          <ListItemTitle>Carol Smith</ListItemTitle>
          <ListItemSubtitle>Designer</ListItemSubtitle>
        </ListItemContent>
        <ListItemTrailing>
          <Badge variant="neutral" size="sm">
            Offline
          </Badge>
        </ListItemTrailing>
      </ListItem>
    </List>
  ),
};

export const Selectable: Story = {
  render: () => {
    const [selectedId, setSelectedId] = React.useState<number | null>(1);

    return (
      <List>
        {[
          { id: 1, name: 'John Doe', role: 'Manager' },
          { id: 2, name: 'Alice Brown', role: 'Engineer' },
          { id: 3, name: 'Carol Smith', role: 'Designer' },
        ].map((item) => (
          <ListItem
            key={item.id}
            selected={selectedId === item.id}
            onClick={() => setSelectedId(item.id)}
            style={{ cursor: 'pointer' }}
          >
            <ListItemLeading>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-semibold">
                {item.name.charAt(0)}
              </div>
            </ListItemLeading>
            <ListItemContent>
              <ListItemTitle>{item.name}</ListItemTitle>
              <ListItemSubtitle>{item.role}</ListItemSubtitle>
            </ListItemContent>
          </ListItem>
        ))}
      </List>
    );
  },
};

export const WithActions: Story = {
  render: () => (
    <List>
      <ListItem>
        <ListItemLeading>
          <Avatar initials="JD" size="sm" />
        </ListItemLeading>
        <ListItemContent>
          <ListItemTitle>John Doe</ListItemTitle>
          <ListItemSubtitle>john@example.com</ListItemSubtitle>
        </ListItemContent>
        <ListItemTrailing>
          <button className="text-primary hover:underline text-xs font-semibold">
            View
          </button>
        </ListItemTrailing>
      </ListItem>
      <ListItem>
        <ListItemLeading>
          <Avatar initials="AB" size="sm" />
        </ListItemLeading>
        <ListItemContent>
          <ListItemTitle>Alice Brown</ListItemTitle>
          <ListItemSubtitle>alice@example.com</ListItemSubtitle>
        </ListItemContent>
        <ListItemTrailing>
          <button className="text-primary hover:underline text-xs font-semibold">
            View
          </button>
        </ListItemTrailing>
      </ListItem>
      <ListItem>
        <ListItemLeading>
          <Avatar initials="CS" size="sm" />
        </ListItemLeading>
        <ListItemContent>
          <ListItemTitle>Carol Smith</ListItemTitle>
          <ListItemSubtitle>carol@example.com</ListItemSubtitle>
        </ListItemContent>
        <ListItemTrailing>
          <button className="text-primary hover:underline text-xs font-semibold">
            View
          </button>
        </ListItemTrailing>
      </ListItem>
    </List>
  ),
};

export const Ordered: Story = {
  render: () => (
    <List ordered>
      <ListItem>
        <ListItemContent>
          <ListItemTitle>Install dependencies</ListItemTitle>
          <ListItemSubtitle>npm install</ListItemSubtitle>
        </ListItemContent>
      </ListItem>
      <ListItem>
        <ListItemContent>
          <ListItemTitle>Start the dev server</ListItemTitle>
          <ListItemSubtitle>npm run dev</ListItemSubtitle>
        </ListItemContent>
      </ListItem>
      <ListItem>
        <ListItemContent>
          <ListItemTitle>Open in browser</ListItemTitle>
          <ListItemSubtitle>http://localhost:3000</ListItemSubtitle>
        </ListItemContent>
      </ListItem>
    </List>
  ),
};

export const WithDividers: Story = {
  render: () => (
    <div className="space-y-4">
      <List>
        <ListItem>
          <ListItemLeading>🎯</ListItemLeading>
          <ListItemContent>
            <ListItemTitle>Feature One</ListItemTitle>
            <ListItemSubtitle>Important update</ListItemSubtitle>
          </ListItemContent>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemLeading>✨</ListItemLeading>
          <ListItemContent>
            <ListItemTitle>Feature Two</ListItemTitle>
            <ListItemSubtitle>New capability</ListItemSubtitle>
          </ListItemContent>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemLeading>🚀</ListItemLeading>
          <ListItemContent>
            <ListItemTitle>Feature Three</ListItemTitle>
            <ListItemSubtitle>Performance improvement</ListItemSubtitle>
          </ListItemContent>
        </ListItem>
      </List>
    </div>
  ),
};
