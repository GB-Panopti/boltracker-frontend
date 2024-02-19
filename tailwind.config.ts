import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const gillBatesHouseStyle = {
  dark_green: { DEFAULT: '#16302b', 100: '#040a09', 200: '#091411', 300: '#0d1d1a', 400: '#122723', 500: '#16302b', 600: '#326d61', 700: '#4ea997', 800: '#87c8bb', 900: '#c3e3dd' }, 
  english_violet: { DEFAULT: '#694873', 100: '#150f17', 200: '#2a1d2e', 300: '#402c46', 400: '#553a5d', 500: '#694873', 600: '#8e619c', 700: '#aa88b5', 800: '#c7b0ce', 900: '#e3d7e6' }, 
  periwinkle: { DEFAULT: '#dcd6f7', 100: '#1a0f4d', 200: '#351e99', 300: '#583bd8', 400: '#9988e7', 500: '#dcd6f7', 600: '#e2ddf8', 700: '#e9e5fa', 800: '#f0eefc', 900: '#f8f6fd' }, 
  cambridge_blue: { DEFAULT: '#85b79d', 100: '#17281f', 200: '#2f503f', 300: '#46785e', 400: '#5e9f7d', 500: '#85b79d', 600: '#9dc6b1', 700: '#b6d4c4', 800: '#cee2d8', 900: '#e7f1eb' }, 
  dark_cyan: { DEFAULT: '#119da4', 100: '#031f20', 200: '#073e41', 300: '#0a5d61', 400: '#0e7b81', 500: '#119da4', 600: '#17d4de', 700: '#4be4ec', 800: '#87edf2', 900: '#c3f6f9' }, 
};
const hsPrimary = gillBatesHouseStyle.dark_green;
const hsPrimaryLite = gillBatesHouseStyle.cambridge_blue;
const hsSecondary = gillBatesHouseStyle.english_violet;
const hsSecondaryLite = gillBatesHouseStyle.periwinkle;
const hsAccent = gillBatesHouseStyle.dark_cyan;

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',

    // Path to Tremor module
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    transparent: 'transparent',
    current: 'currentColor',
    extend: {
      colors: {
        hs: gillBatesHouseStyle,
        // light mode
        tremor: {
          brand: {
            faint: hsPrimary[100],
            muted: hsPrimary[200],
            subtle: hsPrimary[400],
            DEFAULT: hsPrimary[500],
            emphasis: hsPrimary[700],
            inverted: colors.white,
          },
          secondary: {
            faint: hsSecondary[100],
            muted: hsSecondary[200],
            subtle: hsSecondary[400],
            default: hsSecondary[500],
            emphasis: hsSecondary[700],
            inverted: colors.white,
          },
          background: {
            muted: colors.gray[50],
            subtle: colors.gray[100],
            DEFAULT: colors.white,
            emphasis: colors.gray[700],
          },
          border: {
            DEFAULT: hsSecondary[200],
          },
          ring: {
            DEFAULT: hsSecondary[200],
          },
          content: {
            subtle: colors.gray[400],
            DEFAULT: colors.gray[500],
            emphasis: colors.gray[700],
            strong: colors.gray[900],
            inverted: colors.white,
          },
        },
        // dark mode
        'dark-tremor': {
          brand: {
            faint: '#0B1229',
            muted: colors.blue[950],
            subtle: colors.blue[800],
            DEFAULT: colors.blue[500],
            emphasis: colors.blue[400],
            inverted: colors.blue[950],
          },
          background: {
            muted: '#131A2B',
            subtle: colors.gray[800],
            DEFAULT: colors.gray[900],
            emphasis: colors.gray[300],
          },
          border: {
            DEFAULT: colors.gray[800],
          },
          ring: {
            DEFAULT: colors.gray[800],
          },
          content: {
            subtle: colors.gray[600],
            DEFAULT: colors.gray[500],
            emphasis: colors.gray[200],
            strong: colors.gray[50],
            inverted: colors.gray[950],
          },
        },
      },
      boxShadow: {
        // light
        'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'tremor-card':
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'tremor-dropdown':
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        // dark
        'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'dark-tremor-card':
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'dark-tremor-dropdown':
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
      borderRadius: {
        'tremor-small': '0.375rem',
        'tremor-medium': '0.5rem',
        'tremor-large': '0.625rem',
        'tremor-full': '9999px',
      },
      fontSize: {
        'tremor-label': ['0.75rem', { lineHeight: '1rem' }],
        'tremor-default': ['0.875rem', { lineHeight: '1.25rem' }],
        'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
        'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }],
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [require('@headlessui/tailwindcss'), require('@tailwindcss/forms')],
};

export default config;