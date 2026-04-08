import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarSection,
  SidebarSectionLabel,
  SidebarItem,
  SidebarItemIcon,
  SidebarItemLabel,
  SidebarItemBadge,
  SidebarFooter,
  SidebarCollapseToggle,
} from './Sidebar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

// ─────────────────────────────────────────
// Meta
// ─────────────────────────────────────────
const meta: Meta = {
  title: 'Navigation/Sidebar',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// ─────────────────────────────────────────
// Story: Default (Full Width)
// ─────────────────────────────────────────
export const Default: StoryObj = {
  render: () => {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
      <div className="flex h-screen bg-neutral-50">
        <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed}>
          <SidebarHeader>
            <div className="text-sm font-semibold text-neutral-900">MyApp</div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarSection>
              <SidebarSectionLabel>Navigation</SidebarSectionLabel>
              <SidebarItem isActive>
                <SidebarItemIcon>📊</SidebarItemIcon>
                <SidebarItemLabel>Dashboard</SidebarItemLabel>
              </SidebarItem>
              <SidebarItem>
                <SidebarItemIcon>📈</SidebarItemIcon>
                <SidebarItemLabel>Analytics</SidebarItemLabel>
              </SidebarItem>
              <SidebarItem>
                <SidebarItemIcon>⚙️</SidebarItemIcon>
                <SidebarItemLabel>Settings</SidebarItemLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSection>
              <SidebarSectionLabel>Help</SidebarSectionLabel>
              <SidebarItem>
                <SidebarItemIcon>📚</SidebarItemIcon>
                <SidebarItemLabel>Docs</SidebarItemLabel>
              </SidebarItem>
              <SidebarItem>
                <SidebarItemIcon>💬</SidebarItemIcon>
                <SidebarItemLabel>Support</SidebarItemLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarContent>

          <SidebarFooter>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-neutral-900 truncate">John Doe</div>
                <div className="text-xs text-neutral-500 truncate">john@example.com</div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-neutral-300">
            <SidebarCollapseToggle collapsed={collapsed} onToggle={setCollapsed} />
          </div>
          <div className="flex-1 p-8">
            <p className="text-neutral-700">Main content area</p>
          </div>
        </div>
      </div>
    );
  },
};

// ─────────────────────────────────────────
// Story: Collapsed (Icon Only)
// ─────────────────────────────────────────
export const Collapsed: StoryObj = {
  render: () => {
    const [collapsed, setCollapsed] = React.useState(true);

    return (
      <div className="flex h-screen bg-neutral-50">
        <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} width="md">
          <SidebarHeader>
            <div className="text-sm font-semibold text-neutral-900">M</div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarSection>
              <SidebarItem isActive>
                <SidebarItemIcon>📊</SidebarItemIcon>
                <SidebarItemLabel>Dashboard</SidebarItemLabel>
              </SidebarItem>
              <SidebarItem>
                <SidebarItemIcon>📈</SidebarItemIcon>
                <SidebarItemLabel>Analytics</SidebarItemLabel>
              </SidebarItem>
              <SidebarItem>
                <SidebarItemIcon>⚙️</SidebarItemIcon>
                <SidebarItemLabel>Settings</SidebarItemLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarContent>

          <SidebarFooter>
            <SidebarCollapseToggle collapsed={collapsed} onToggle={setCollapsed} />
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 p-8">
          <p className="text-neutral-700">Hover over icons to see tooltips</p>
        </div>
      </div>
    );
  },
};

// ─────────────────────────────────────────
// Story: With Badges
// ─────────────────────────────────────────
export const WithBadges: StoryObj = {
  render: () => {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
      <div className="flex h-screen bg-neutral-50">
        <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed}>
          <SidebarHeader>
            <div className="text-sm font-semibold text-neutral-900">MyApp</div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarSection>
              <SidebarSectionLabel>Main</SidebarSectionLabel>
              <SidebarItem isActive>
                <SidebarItemIcon>📧</SidebarItemIcon>
                <SidebarItemLabel>Inbox</SidebarItemLabel>
                <SidebarItemBadge>
                  <Badge variant="primary" size="sm">5</Badge>
                </SidebarItemBadge>
              </SidebarItem>
              <SidebarItem>
                <SidebarItemIcon>⭐</SidebarItemIcon>
                <SidebarItemLabel>Starred</SidebarItemLabel>
                <SidebarItemBadge>
                  <Badge variant="accent" size="sm">3</Badge>
                </SidebarItemBadge>
              </SidebarItem>
              <SidebarItem>
                <SidebarItemIcon>🗂️</SidebarItemIcon>
                <SidebarItemLabel>Archive</SidebarItemLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarContent>

          <SidebarFooter>
            <SidebarCollapseToggle collapsed={collapsed} onToggle={setCollapsed} />
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 p-8">
          <p className="text-neutral-700">Badges hidden when collapsed</p>
        </div>
      </div>
    );
  },
};

// ─────────────────────────────────────────
// Story: With Disabled Item
// ─────────────────────────────────────────
export const WithDisabledItem: StoryObj = {
  render: () => {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
      <div className="flex h-screen bg-neutral-50">
        <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed}>
          <SidebarHeader>
            <div className="text-sm font-semibold text-neutral-900">MyApp</div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarSection>
              <SidebarItem isActive>
                <SidebarItemIcon>🏠</SidebarItemIcon>
                <SidebarItemLabel>Home</SidebarItemLabel>
              </SidebarItem>
              <SidebarItem disabled>
                <SidebarItemIcon>🔒</SidebarItemIcon>
                <SidebarItemLabel>Premium (Upgrade)</SidebarItemLabel>
              </SidebarItem>
              <SidebarItem>
                <SidebarItemIcon>📞</SidebarItemIcon>
                <SidebarItemLabel>Support</SidebarItemLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarContent>

          <SidebarFooter>
            <SidebarCollapseToggle collapsed={collapsed} onToggle={setCollapsed} />
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 p-8">
          <p className="text-neutral-700">Some items can be disabled</p>
        </div>
      </div>
    );
  },
};

// ─────────────────────────────────────────
// Story: With Footer
// ─────────────────────────────────────────
export const WithFooter: StoryObj = {
  render: () => {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
      <div className="flex h-screen bg-neutral-50">
        <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed}>
          <SidebarHeader>
            <div className="font-semibold">MyApp</div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarSection>
              <SidebarItem isActive>
                <SidebarItemIcon>📊</SidebarItemIcon>
                <SidebarItemLabel>Dashboard</SidebarItemLabel>
              </SidebarItem>
              <SidebarItem>
                <SidebarItemIcon>⚙️</SidebarItemIcon>
                <SidebarItemLabel>Settings</SidebarItemLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarContent>

          <SidebarFooter>
            <div className="flex flex-col gap-3">
              <Button variant="secondary" size="sm" className="w-full">
                Logout
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 p-8">
          <p className="text-neutral-700">Sidebar with user info and logout button</p>
        </div>
      </div>
    );
  },
};
