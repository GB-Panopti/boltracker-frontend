import { Rubik } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { siteConfig } from "./siteConfig";
import Script from "next/script";

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
  weight: "800",
});

const robotoThicc = Rubik({
  subsets: ["latin"],
  variable: "--display-font",
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
                  {/* Load external script properly */}
                  <Script
        src="//cdn.trackdesk.com/tracking.js"
        strategy="afterInteractive" // This ensures the script is loaded after the page is interactive
      />
      <body
        className={`${roboto.className} ${robotoThicc.className} overflow-y-scroll scroll-auto antialiased selection:bg-gb-secondary-100 selection:text-gb-secondary-700 dark:bg-gray-950`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
