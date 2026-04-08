import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataGrid } from './DataGrid';

const meta: Meta<typeof DataGrid> = {
  title: 'Data Display/DataGrid',
  component: DataGrid,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Engineer', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Designer', status: 'Active' },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Manager', status: 'On Leave' },
  { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Engineer', status: 'Active' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Product', status: 'Active' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Engineer', status: 'Inactive' },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Designer', status: 'Active' },
  { id: 8, name: 'Henry Wilson', email: 'henry@example.com', role: 'Manager', status: 'Active' },
];

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  { key: 'status', header: 'Status', sortable: true },
];

export const Default: Story = {
  args: {
    columns,
    data: sampleData,
  },
};

export const WithSearch: Story = {
  args: {
    columns,
    data: sampleData,
    searchable: true,
    searchPlaceholder: 'Search by name, email, role...',
  },
};

export const WithPagination: Story = {
  render: () => {
    const largeData = [
      ...sampleData,
      { id: 9, name: 'Ivy Taylor', email: 'ivy@example.com', role: 'Engineer', status: 'Active' },
      { id: 10, name: 'Jack Anderson', email: 'jack@example.com', role: 'Designer', status: 'Active' },
      { id: 11, name: 'Karen Thomas', email: 'karen@example.com', role: 'Manager', status: 'On Leave' },
      { id: 12, name: 'Leo Martinez', email: 'leo@example.com', role: 'Engineer', status: 'Active' },
      { id: 13, name: 'Mia Garcia', email: 'mia@example.com', role: 'Product', status: 'Active' },
      { id: 14, name: 'Noah Harris', email: 'noah@example.com', role: 'Engineer', status: 'Inactive' },
      { id: 15, name: 'Olivia White', email: 'olivia@example.com', role: 'Designer', status: 'Active' },
      { id: 16, name: 'Peter Clark', email: 'peter@example.com', role: 'Manager', status: 'Active' },
      { id: 17, name: 'Quinn Roberts', email: 'quinn@example.com', role: 'Engineer', status: 'Active' },
      { id: 18, name: 'Rachel Lewis', email: 'rachel@example.com', role: 'Designer', status: 'Active' },
      { id: 19, name: 'Samuel Walker', email: 'samuel@example.com', role: 'Manager', status: 'On Leave' },
      { id: 20, name: 'Tina Hall', email: 'tina@example.com', role: 'Engineer', status: 'Active' },
    ];

    return (
      <DataGrid
        columns={columns}
        data={largeData}
        pageSize={5}
      />
    );
  },
};

export const WithSelection: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

    return (
      <div className="space-y-4">
        <div className="text-sm text-neutral-600">
          Selected rows: {selectedRows.length}
          {selectedRows.length > 0 && ` (${selectedRows.join(', ')})`}
        </div>
        <DataGrid
          columns={columns}
          data={sampleData}
          selectable
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
        />
      </div>
    );
  },
};

export const Loading: Story = {
  args: {
    columns,
    data: sampleData,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: 'No users found. Create a new user to get started.',
  },
};

export const Combined: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

    const largeData = [
      ...sampleData,
      { id: 9, name: 'Ivy Taylor', email: 'ivy@example.com', role: 'Engineer', status: 'Active' },
      { id: 10, name: 'Jack Anderson', email: 'jack@example.com', role: 'Designer', status: 'Active' },
      { id: 11, name: 'Karen Thomas', email: 'karen@example.com', role: 'Manager', status: 'On Leave' },
      { id: 12, name: 'Leo Martinez', email: 'leo@example.com', role: 'Engineer', status: 'Active' },
      { id: 13, name: 'Mia Garcia', email: 'mia@example.com', role: 'Product', status: 'Active' },
      { id: 14, name: 'Noah Harris', email: 'noah@example.com', role: 'Engineer', status: 'Inactive' },
      { id: 15, name: 'Olivia White', email: 'olivia@example.com', role: 'Designer', status: 'Active' },
      { id: 16, name: 'Peter Clark', email: 'peter@example.com', role: 'Manager', status: 'Active' },
      { id: 17, name: 'Quinn Roberts', email: 'quinn@example.com', role: 'Engineer', status: 'Active' },
      { id: 18, name: 'Rachel Lewis', email: 'rachel@example.com', role: 'Designer', status: 'Active' },
      { id: 19, name: 'Samuel Walker', email: 'samuel@example.com', role: 'Manager', status: 'On Leave' },
      { id: 20, name: 'Tina Hall', email: 'tina@example.com', role: 'Engineer', status: 'Active' },
    ];

    return (
      <div className="space-y-4">
        <div className="text-sm text-neutral-600">
          Selected: {selectedRows.length} rows
        </div>
        <DataGrid
          columns={columns}
          data={largeData}
          searchable
          searchPlaceholder="Search users..."
          selectable
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          pageSize={5}
        />
      </div>
    );
  },
};
