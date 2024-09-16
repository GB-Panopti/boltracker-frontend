import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  darkMode: "selector",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // Path to Tremor module
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: "var(--display-font)",
      body: "var(--body-font)",
    },
    extend: {
      colors: {
        // light mode
        gb: {
          // 'dark green'
          primary: {
            DEFAULT: "#16302b",
            900: "#040a09",
            800: "#091411",
            700: "#0d1d1a",
            600: "#122723",
            500: "#16302b",
            400: "#326d61",
            300: "#4ea997",
            200: "#87c8bb",
            100: "#c3e3dd",
            50: "#c3e3dd",
          },
          // 'cambridge blue'
          primarylite: {
            DEFAULT: "#85b79d",
            900: "#17281f",
            800: "#2f503f",
            700: "#46785e",
            600: "#5e9f7d",
            500: "#85b79d",
            400: "#9dc6b1",
            300: "#b6d4c4",
            200: "#cee2d8",
            100: "#e7f1eb",
            50: "#e7f1eb",
          },
          // 'english violet'
          secondary: {
            DEFAULT: "#694873",
            900: "#150f17",
            800: "#2a1d2e",
            700: "#402c46",
            600: "#553a5d",
            500: "#694873",
            400: "#8e619c",
            300: "#aa88b5",
            200: "#c7b0ce",
            100: "#e3d7e6",
            50: "#e3d7e6",
          },
          // 'periwinkle'
          secondarylite: {
            DEFAULT: "#dcd6f7",
            900: "#1a0f4d",
            800: "#351e99",
            700: "#583bd8",
            600: "#9988e7",
            500: "#dcd6f7",
            400: "#e2ddf8",
            300: "#e9e5fa",
            200: "#f0eefc",
            100: "#f8f6fd",
            50: "#f8f6fd",
          },
          // 'dark cyan'
          accent: {
            DEFAULT: "#119da4",
            900: "#031f20",
            800: "#073e41",
            700: "#0a5d61",
            600: "#0e7b81",
            500: "#119da4",
            400: "#17d4de",
            300: "#4be4ec",
            200: "#87edf2",
            100: "#c3f6f9",
            50: "#c3f6f9",
          },
          brands: {
            bol: "#0300a4",
            amazon: "#ff9913",
          },
          background: {
            muted: colors.gray[50],
            subtle: colors.gray[100],
            DEFAULT: colors.white,
            emphasis: colors.gray[700],
          },
          border: {
            DEFAULT: "#2a1d2e", // = gb.secondary[200]
          },
          ring: {
            DEFAULT: "#2a1d2e", // = gb.secondary[200]
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
        "dark-tremor": {
          brand: {
            faint: "#0B1229",
            muted: colors.blue[950],
            subtle: colors.blue[800],
            DEFAULT: colors.blue[500],
            emphasis: colors.blue[400],
            inverted: colors.blue[950],
          },
          background: {
            muted: "#131A2B",
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
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
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

    ...["[#694873]", "[#E5E7EB]", "[#119da4]", "[#0300A4]"].flatMap(
      (customColor) => [
        `bg-${customColor}`,
        `border-${customColor}`,
        `hover:bg-${customColor}`,
        `hover:border-${customColor}`,
        `hover:text-${customColor}`,
        `fill-${customColor}`,
        `ring-${customColor}`,
        `stroke-${customColor}`,
        `text-${customColor}`,
        `ui-selected:bg-${customColor}`,
        `ui-selected:border-${customColor}`,
        `ui-selected:text-${customColor}`,
      ],
    ),
  ],
  plugins: [require("@tailwindcss/forms")],
};
export default config;
