import type { Preview } from '@storybook/react';
import '../styles/tokens.css';
import '../styles/globals.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme',
      defaultValue: 'light-default',
      toolbar: {
        icon: 'circlehollow',
        items: [
          {
            value: 'light-default',
            title: 'Light (Default)',
            icon: 'sun',
          },
          {
            value: 'dark-default',
            title: 'Dark (Default)',
            icon: 'moon',
          },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light-default';

      // Set theme on document root
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
      }

      return (
        <div data-theme={theme} style={{ minHeight: '100vh', padding: '2rem' }}>
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    layout: 'centered',
    docs: {
      canvas: { sourceState: 'shown' },
    },
  },
};

export default preview;
