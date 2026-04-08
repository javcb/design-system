import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from './Table';
import { Checkbox } from '../Checkbox';
import { Text } from '../Text';

const meta: Meta<typeof Table> = {
  title: 'Data Display/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  { id: 1, name: 'Alice Johnson', role: 'Engineer', status: 'Active' },
  { id: 2, name: 'Bob Smith', role: 'Designer', status: 'Active' },
  { id: 3, name: 'Carol Williams', role: 'Manager', status: 'On Leave' },
  { id: 4, name: 'David Brown', role: 'Engineer', status: 'Active' },
  { id: 5, name: 'Eve Davis', role: 'Product', status: 'Active' },
];

export const Default: Story = {
  render: () => (
    <Table aria-label="Sample table">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((row, idx) => (
          <TableRow key={row.id} isEven={idx % 2 === 0}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>
              <button className="text-primary hover:underline text-sm">Edit</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Striped: Story = {
  render: () => (
    <Table striped aria-label="Striped table with alternating row colors">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((row, idx) => (
          <TableRow key={row.id} isEven={idx % 2 === 0}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>
              <button className="text-primary hover:underline text-sm">Edit</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithSorting: Story = {
  render: () => {
    const [sortColumn, setSortColumn] = React.useState<string | null>('name');
    const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

    const handleSort = (column: string) => {
      if (sortColumn === column) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(column);
        setSortDirection('asc');
      }
    };

    return (
      <Table striped hoverable aria-label="Sortable table">
        <TableHeader>
          <TableRow>
            <TableHead
              sortable
              sortDirection={sortColumn === 'name' ? sortDirection : null}
              onSort={() => handleSort('name')}
            >
              Name
            </TableHead>
            <TableHead
              sortable
              sortDirection={sortColumn === 'role' ? sortDirection : null}
              onSort={() => handleSort('role')}
            >
              Role
            </TableHead>
            <TableHead
              sortable
              sortDirection={sortColumn === 'status' ? sortDirection : null}
              onSort={() => handleSort('status')}
            >
              Status
            </TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((row, idx) => (
            <TableRow key={row.id} isEven={idx % 2 === 0}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                <button className="text-primary hover:underline text-sm">Edit</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

export const WithCheckboxSelection: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = React.useState<number[]>([]);

    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        setSelectedRows(sampleData.map((row) => row.id));
      } else {
        setSelectedRows([]);
      }
    };

    const handleSelectRow = (id: number, checked: boolean) => {
      if (checked) {
        setSelectedRows([...selectedRows, id]);
      } else {
        setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
      }
    };

    const selectAllChecked = selectedRows.length === sampleData.length;

    return (
      <Table striped hoverable aria-label="Table with row selection">
        <TableHeader>
          <TableRow>
            <TableHead style={{ width: '40px' }}>
              <Checkbox
                name="select-all"
                checked={selectAllChecked}
                onChange={(e) => handleSelectAll(e.currentTarget.checked)}
                aria-label="Select all rows"
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((row, idx) => (
            <TableRow
              key={row.id}
              isEven={idx % 2 === 0}
              aria-selected={selectedRows.includes(row.id)}
            >
              <TableCell style={{ width: '40px' }}>
                <Checkbox
                  name={`select-row-${row.id}`}
                  checked={selectedRows.includes(row.id)}
                  onChange={(e) => handleSelectRow(row.id, e.currentTarget.checked)}
                  aria-label={`Select ${row.name}`}
                />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                <button className="text-primary hover:underline text-sm">Edit</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

export const StickyHeader: Story = {
  render: () => (
    <div className="h-80 border border-neutral-300 rounded-lg overflow-auto">
      <Table aria-label="Table with sticky header">
        <TableHeader className="sticky top-0 z-10">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...sampleData, ...sampleData, ...sampleData, ...sampleData].map((row, idx) => (
            <TableRow key={`${row.id}-${idx}`} isEven={idx % 2 === 0}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                <button className="text-primary hover:underline text-sm">Edit</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};
