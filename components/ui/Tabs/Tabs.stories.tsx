import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
import { Text } from '../Text';

// ─────────────────────────────────────────
// Meta
// ─────────────────────────────────────────
const meta: Meta = {
  title: 'Navigation/Tabs',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// ─────────────────────────────────────────
// Story: Default (Horizontal)
// ─────────────────────────────────────────
export const Default: StoryObj = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Text>Account settings and profile information go here.</Text>
      </TabsContent>
      <TabsContent value="settings">
        <Text>General application settings and preferences.</Text>
      </TabsContent>
      <TabsContent value="notifications">
        <Text>Manage email and push notification preferences.</Text>
      </TabsContent>
    </Tabs>
  ),
};

// ─────────────────────────────────────────
// Story: Vertical
// ─────────────────────────────────────────
export const Vertical: StoryObj = {
  render: () => (
    <Tabs defaultValue="overview" orientation="vertical">
      <div className="flex gap-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <div className="flex-1">
          <TabsContent value="overview">
            <Text>Overview of your dashboard and key metrics.</Text>
          </TabsContent>
          <TabsContent value="analytics">
            <Text>Detailed analytics and performance data.</Text>
          </TabsContent>
          <TabsContent value="reports">
            <Text>Generate and view reports.</Text>
          </TabsContent>
        </div>
      </div>
    </Tabs>
  ),
};

// ─────────────────────────────────────────
// Story: With Disabled Tab
// ─────────────────────────────────────────
export const WithDisabledTab: StoryObj = {
  render: () => (
    <Tabs defaultValue="available">
      <TabsList>
        <TabsTrigger value="available">Available</TabsTrigger>
        <TabsTrigger value="premium" disabled>
          Premium (Upgrade)
        </TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>
      <TabsContent value="available">
        <Text>Free tier features available to all users.</Text>
      </TabsContent>
      <TabsContent value="advanced">
        <Text>Advanced features for authenticated users.</Text>
      </TabsContent>
    </Tabs>
  ),
};

// ─────────────────────────────────────────
// Story: Controlled (External State)
// ─────────────────────────────────────────
export const Controlled: StoryObj = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState('first');

    return (
      <div className="flex flex-col gap-4">
        <div>
          <Text className="text-sm text-neutral-700">
            Active tab: <strong>{activeTab}</strong>
          </Text>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="first">First</TabsTrigger>
            <TabsTrigger value="second">Second</TabsTrigger>
            <TabsTrigger value="third">Third</TabsTrigger>
          </TabsList>
          <TabsContent value="first">
            <Text>This is the first tab content.</Text>
          </TabsContent>
          <TabsContent value="second">
            <Text>This is the second tab content.</Text>
          </TabsContent>
          <TabsContent value="third">
            <Text>This is the third tab content.</Text>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
};

// ─────────────────────────────────────────
// Story: Long Tab List (Wrapping)
// ─────────────────────────────────────────
export const LongTabList: StoryObj = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        <TabsTrigger value="tab4">Tab 4</TabsTrigger>
        <TabsTrigger value="tab5">Tab 5</TabsTrigger>
        <TabsTrigger value="tab6">Tab 6</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <Text>Content for tab 1.</Text>
      </TabsContent>
      <TabsContent value="tab2">
        <Text>Content for tab 2.</Text>
      </TabsContent>
      <TabsContent value="tab3">
        <Text>Content for tab 3.</Text>
      </TabsContent>
      <TabsContent value="tab4">
        <Text>Content for tab 4.</Text>
      </TabsContent>
      <TabsContent value="tab5">
        <Text>Content for tab 5.</Text>
      </TabsContent>
      <TabsContent value="tab6">
        <Text>Content for tab 6.</Text>
      </TabsContent>
    </Tabs>
  ),
};
