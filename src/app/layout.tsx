import { ThemeProvider } from "next-themes";
import { Inter, Roboto, Roboto_Condensed, Roboto_Flex, Roboto_Serif, Roboto_Slab, Rubik, Rubik_80s_Fade, Rubik_Doodle_Triangles, Rubik_Glitch, Rubik_Lines } from "next/font/google";
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


const roboto = Rubik({
  subsets: ["latin"],
  variable: "--body-font",
  weight: "800"
});

const robotoThicc = Rubik({
  subsets: ["latin"],
  variable: "--display-font",
  weight: "400"
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
        className={`${roboto.className} ${robotoThicc.className} overflow-y-scroll scroll-auto antialiased selection:bg-gb-secondary-100 selection:text-gb-secondary-700 dark:bg-gray-950`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
