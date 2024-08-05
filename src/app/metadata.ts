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