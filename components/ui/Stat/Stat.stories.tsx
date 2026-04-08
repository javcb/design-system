import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Stat,
  StatLabel,
  StatValue,
  StatHelpText,
  StatArrow,
} from './Stat';

const meta: Meta<typeof Stat> = {
  title: 'Data Display/Stat',
  component: Stat,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Stat>
      <StatLabel>Total Revenue</StatLabel>
      <StatValue>$24,582</StatValue>
      <StatHelpText>
        <StatArrow type="increase" />
        12% from last month
      </StatHelpText>
    </Stat>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <p className="text-sm font-semibold mb-4">Default</p>
        <Stat>
          <StatLabel>Total Users</StatLabel>
          <StatValue>1,234</StatValue>
          <StatHelpText>
            <StatArrow type="increase" />
            8% growth
          </StatHelpText>
        </Stat>
      </div>

      <div>
        <p className="text-sm font-semibold mb-4">Card</p>
        <Stat variant="card">
          <StatLabel>Active Sessions</StatLabel>
          <StatValue>342</StatValue>
          <StatHelpText>
            <StatArrow type="increase" />
            5% up from average
          </StatHelpText>
        </Stat>
      </div>
    </div>
  ),
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <Stat variant="card">
        <StatLabel>Revenue</StatLabel>
        <StatValue>$45,231</StatValue>
        <StatHelpText>
          <StatArrow type="increase" />
          23% vs last quarter
        </StatHelpText>
      </Stat>

      <Stat variant="card">
        <StatLabel>Conversion Rate</StatLabel>
        <StatValue>3.2%</StatValue>
        <StatHelpText>
          <StatArrow type="decrease" />
          0.5% from last week
        </StatHelpText>
      </Stat>

      <Stat variant="card">
        <StatLabel>Customer Churn</StatLabel>
        <StatValue>12</StatValue>
        <StatHelpText>
          <StatArrow type="decrease" />
          2 fewer than last month
        </StatHelpText>
      </Stat>

      <Stat variant="card">
        <StatLabel>Market Share</StatLabel>
        <StatValue>24.8%</StatValue>
        <StatHelpText>
          <StatArrow type="increase" />
          1.2% gain year-over-year
        </StatHelpText>
      </Stat>
    </div>
  ),
};

export const WithTrend: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Stat variant="card">
          <StatLabel>Orders This Month</StatLabel>
          <StatValue>1,456</StatValue>
          <StatHelpText>
            <StatArrow type="increase" />
            32% increase
          </StatHelpText>
        </Stat>

        <Stat variant="card">
          <StatLabel>Return Rate</StatLabel>
          <StatValue>2.1%</StatValue>
          <StatHelpText>
            <StatArrow type="decrease" />
            0.3% improvement
          </StatHelpText>
        </Stat>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Stat>
          <StatLabel>Positive Signal</StatLabel>
          <StatValue>+15.3%</StatValue>
          <StatHelpText>
            <StatArrow type="increase" />
            Strong performance
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Negative Signal</StatLabel>
          <StatValue>-8.7%</StatValue>
          <StatHelpText>
            <StatArrow type="decrease" />
            Needs attention
          </StatHelpText>
        </Stat>
      </div>
    </div>
  ),
};

export const NegativeValue: Story = {
  render: () => (
    <div className="space-y-6">
      <Stat variant="card">
        <StatLabel>Year-over-Year Change</StatLabel>
        <StatValue>-12.5%</StatValue>
        <StatHelpText>
          <StatArrow type="decrease" />
          Decline from previous year
        </StatHelpText>
      </Stat>

      <Stat variant="card">
        <StatLabel>Error Rate</StatLabel>
        <StatValue>0.08%</StatValue>
        <StatHelpText>
          <StatArrow type="decrease" />
          Down from 0.15%
        </StatHelpText>
      </Stat>

      <Stat variant="card">
        <StatLabel>Cost Reduction</StatLabel>
        <StatValue>$3,250</StatValue>
        <StatHelpText>
          <StatArrow type="decrease" />
          Monthly savings achieved
        </StatHelpText>
      </Stat>
    </div>
  ),
};

export const Dashboard: Story = {
  render: () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-neutral-900">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat variant="card">
          <StatLabel>Total Revenue</StatLabel>
          <StatValue>$125,430</StatValue>
          <StatHelpText>
            <StatArrow type="increase" />
            18% vs last month
          </StatHelpText>
        </Stat>

        <Stat variant="card">
          <StatLabel>Active Customers</StatLabel>
          <StatValue>3,456</StatValue>
          <StatHelpText>
            <StatArrow type="increase" />
            245 new this month
          </StatHelpText>
        </Stat>

        <Stat variant="card">
          <StatLabel>Avg. Order Value</StatLabel>
          <StatValue>$87.50</StatValue>
          <StatHelpText>
            <StatArrow type="decrease" />
            $2.30 from last month
          </StatHelpText>
        </Stat>

        <Stat variant="card">
          <StatLabel>Conversion Rate</StatLabel>
          <StatValue>4.2%</StatValue>
          <StatHelpText>
            <StatArrow type="increase" />
            0.3% improvement
          </StatHelpText>
        </Stat>
      </div>
    </div>
  ),
};
