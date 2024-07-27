import type { Config } from "tailwindcss"
import colors from "tailwindcss/colors"

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
  darkMode: "selector",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}",
    // Path to Tremor module
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',],
  theme: {
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
      keyframes: {
        hide: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: "0", transform: "translateX(6px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: "translateX(-6px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        dialogOverlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        dialogContentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -45%) scale(0.95)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
        drawerSlideLeftAndFade: {
          from: { opacity: "0", transform: "translateX(50%)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        hide: "hide 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideDownAndFade:
          "slideDownAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        drawerSlideLeftAndFade:
          "drawerSlideLeftAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        dialogOverlayShow:
          "dialogOverlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        dialogContentShow:
          "dialogContentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
export default config
