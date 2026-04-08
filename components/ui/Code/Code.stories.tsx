import type { Meta, StoryObj } from '@storybook/nextjs';
import { Code } from './Code';
import { Text } from '../Text';

const meta = {
  title: 'Design System/Components/Code',
  component: Code,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A code component for displaying code snippets. Supports inline and block variants. No syntax highlighting (Layer 2 enhancement).',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['inline', 'block'],
      description: 'Inline renders as <code>, block renders as <pre><code>',
      table: { defaultValue: { summary: 'inline' } },
    },
    language: {
      control: 'text',
      description: 'Language label badge (block variant only)',
    },
    children: {
      control: 'text',
      description: 'Code content',
    },
  },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inline: Story = {
  args: {
    variant: 'inline',
    children: 'const greeting = "Hello World";',
  },
};

export const InlineInText: Story = {
  render: () => (
    <Text>
      Use the <Code variant="inline">const</Code> keyword to declare variables in JavaScript.
    </Text>
  ),
};

export const Block: Story = {
  args: {
    variant: 'block',
    children: `function add(a, b) {
  return a + b;
}

const result = add(2, 3);
console.log(result); // 5`,
  },
};

export const BlockWithLanguage: Story = {
  args: {
    variant: 'block',
    language: 'javascript',
    children: `export const greeting = (name: string) => {
  return \`Hello, \${name}!\`;
};`,
  },
};

export const LongCodeBlock: Story = {
  args: {
    variant: 'block',
    language: 'typescript',
    children: `interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) throw new Error('User not found');
  return response.json();
}

const user = await fetchUser('123');
console.log(user.name);`,
  },
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story />
      </div>
    ),
  ],
};
