import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { siteConfig } from "./siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL("https://panopti.nl"),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [],
  authors: [
    {
      name: "Marijn Craenen",
      url: "info@panopti.nl",
    },
    {
      name: "Gregor Figueira Comojo",
      url: "info@panopti.nl",
    },
  ],
  creator: "Marijn Craenen",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: "Tremor OSS Dashboard",
  //   creator: '@tremorlabs',
  // },
  icons: {
    icon: "/favicon.ico",
  },
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

import { AppProvider } from "./contexts/StockDataContext";
import * as Sentry from "@sentry/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-y-scroll scroll-auto antialiased selection:bg-gb-secondary-100 selection:text-gb-secondary-700 dark:bg-gray-950`}
        suppressHydrationWarning
      >
          <Sentry.ErrorBoundary fallback={<p>ah noes</p>}>
            <ThemeProvider defaultTheme="system" attribute="class">
              <AppProvider>{children}</AppProvider>
            </ThemeProvider>
          </Sentry.ErrorBoundary>
      </body>
    </html>
  );
}
