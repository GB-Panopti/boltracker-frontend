"use client";

import { Sidebar } from "@/components/ui/navigation/sidebar";
import { ThemeProvider } from "next-themes";
import { AppProvider } from "../contexts/StockDataContext";
import * as Sentry from "@sentry/nextjs";
import Joyride from "react-joyride";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  
  const steps = [
    {
      title: 'Welcome to Panopti!',
      target: 'body',
      content: 'This is your personal dashboard where you can track and manage bol.com products. Let’s explore our features.',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '#product-table',
      content: 'Here, you can view all the products you’re tracking. It shows sales, revenue, and ratings in the date range you select. You can click on a product to see more details!',
      placement: 'bottom',
    },
    {
      target: '.date-range',
      content: 'That date range selection is done here! You can choose any date range to inspect sales in that time period.',
      placement: 'bottom',
    },
    {
      target: '#product-table',
      content: 'Sales are aggregated by day. When you start tracking a new product, it will take a few days to collect meaningful data. Please keep this in mind.',
      placement: 'top',
    },
    {
      target: '#button-add-product',
      content: 'Track new products here. You\'ll need the bol.com product page URL, and a snappy name of your choosing!',
      placement: 'right',
    },
    {
      target: '#product-list',
      content: 'This list shows all the products you’re tracking. You can click on a product to edit its name or delete it.',
      placement: 'right',
    },
    { // this step is for mobile view
      target: '#mobile-sidebar-trigger',
      content: 'Open this menu to add new products to track. You\'ll need its bol.com product page URL, and a snappy name of your choosing!',
      placement: 'right',
    },
    {
      target: '#user-profile',
      content: 'Here you can change your password, language, the theme, or log out. You can also give feedback, or restart the tutorial!',
      placement: 'top',
    },
    { // this step is for mobile view
      target: '#user-profile-mobile',
      content: 'Here you can change your password, language, the theme, or log out. You can also give feedback, or restart the tutorial!',
      placement: 'top',
    },
    {
      title: 'That’s it!',
      target: 'body',
      content: 'Feel free to explore, and subscribe today to start tracking your own products! Thank you for using Panopti.',
      placement: 'center',
    },
  ];

  return (
    <Sentry.ErrorBoundary fallback={<p>ah noes</p>}>
      <ThemeProvider defaultTheme="system" attribute="class">
        <AppProvider>
          
          <Joyride 
            steps={steps}
            continuous={true}
            showSkipButton={true}
            disableOverlayClose={true}
            spotlightClicks={false}
            locale={{
              back: 'Back',
              close: 'Close',
              last: 'Finish',
              next: 'Next',
              skip: 'Skip',
            }}
            styles={{
              options: {
                zIndex: 10000,
                primaryColor: '#16302b',
              },
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                height: '100vh',
                top: 0,
                bottom: 0,
              },
              spotlight: {
                zIndex: 10010,
              },
            }}
          />
          <Sidebar />
          <main className="lg:pl-72">
            <div className="relative">
              <div className="p-4 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:pt-7">
                {children}
              </div>
            </div>
          </main>
        </AppProvider>
      </ThemeProvider>
    </Sentry.ErrorBoundary>
  )
}
