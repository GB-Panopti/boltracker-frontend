// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tunnel: process.env.NEXT_PUBLIC_SERVER_HOST + "/api/sentry-tunnel",
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,
  environment:
    process.env.NODE_ENV === "production" ? "production" : "development", // Set environment explicitly

  replaysOnErrorSampleRate: 0.5,
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
    Sentry.feedbackIntegration({
      colorScheme: "system",
      enableScreenshot: false,
      isNameRequired: true,
    }),
  ],
});
