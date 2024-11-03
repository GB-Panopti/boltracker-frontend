import { Rubik } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { siteConfig } from "./siteConfig";
import Script from "next/script";
import ReactGA from 'react-ga4';

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
  ReactGA.initialize('G-PY51KEXYFX');
  return (
    <html lang="en">
      <Script defer src={process.env.NEXT_PUBLIC_UMAMI_SRC} data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID} />
      <body
        className={`${roboto.className} ${robotoThicc.className} overflow-y-scroll scroll-auto antialiased selection:bg-gb-secondary-100 selection:text-gb-secondary-700 dark:bg-gray-950`}
        suppressHydrationWarning
      >
        {/* This script belongs in the body, the beforeInteractive strategy is used to ensures it loads into the <head> tag */}
        {/* When placed in the <html> tag, it loads in the <head> AND in the <html> tag for some */}
      {/* Google Ads Tag */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-16750157391"
        strategy="beforeInteractive"
      />
      <Script id="google-ads-init" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16750157391');
        `}
      </Script>
        {children}
      </body>
    </html>
  );
}
