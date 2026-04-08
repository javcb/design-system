import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationController,
} from './Pagination';
import { Text } from '../Text';

// ─────────────────────────────────────────
// Meta
// ─────────────────────────────────────────
const meta: Meta = {
  title: 'Navigation/Pagination',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// ─────────────────────────────────────────
// Story: Default (First Page)
// ─────────────────────────────────────────
export const Default: StoryObj = {
  render: () => {
    const [page, setPage] = React.useState(1);
    const totalPages = 10;

    return (
      <div className="flex flex-col gap-4">
        <Text className="text-sm text-neutral-700">
          Showing page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </Text>
        <PaginationController
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          siblingCount={1}
          showFirstLast={true}
        />
      </div>
    );
  },
};

// ─────────────────────────────────────────
// Story: Middle Page
// ─────────────────────────────────────────
export const MiddlePage: StoryObj = {
  render: () => {
    const [page, setPage] = React.useState(5);
    const totalPages = 10;

    return (
      <div className="flex flex-col gap-4">
        <Text className="text-sm text-neutral-700">
          Showing page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </Text>
        <PaginationController
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          siblingCount={1}
          showFirstLast={true}
        />
      </div>
    );
  },
};

// ─────────────────────────────────────────
// Story: Last Page
// ─────────────────────────────────────────
export const LastPage: StoryObj = {
  render: () => {
    const [page, setPage] = React.useState(10);
    const totalPages = 10;

    return (
      <div className="flex flex-col gap-4">
        <Text className="text-sm text-neutral-700">
          Showing page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </Text>
        <PaginationController
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          siblingCount={1}
          showFirstLast={true}
        />
      </div>
    );
  },
};

// ─────────────────────────────────────────
// Story: Few Pages (No Ellipsis)
// ─────────────────────────────────────────
export const FewPages: StoryObj = {
  render: () => {
    const [page, setPage] = React.useState(2);
    const totalPages = 5;

    return (
      <div className="flex flex-col gap-4">
        <Text className="text-sm text-neutral-700">
          Only <strong>{totalPages}</strong> pages total (no ellipsis needed)
        </Text>
        <PaginationController
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          siblingCount={1}
          showFirstLast={true}
        />
      </div>
    );
  },
};

// ─────────────────────────────────────────
// Story: Controlled with Custom Siblings
// ─────────────────────────────────────────
export const CustomSiblings: StoryObj = {
  render: () => {
    const [page, setPage] = React.useState(5);
    const totalPages = 15;

    return (
      <div className="flex flex-col gap-4">
        <Text className="text-sm text-neutral-700">
          Showing page <strong>{page}</strong> of <strong>{totalPages}</strong> (siblingCount=2)
        </Text>
        <PaginationController
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          siblingCount={2}
          showFirstLast={true}
        />
      </div>
    );
  },
};

// ─────────────────────────────────────────
// Story: Manual Pagination
// ─────────────────────────────────────────
export const Manual: StoryObj = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink page={1} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink page={2} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink page={3} isActive />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink page={4} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink page={5} />
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink page={10} />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};
