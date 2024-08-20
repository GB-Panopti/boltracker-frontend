// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://4b1cdf4636bdae639b178b3406b452df@o4507803005353984.ingest.de.sentry.io/4507803149336656",
  tunnel: 'https://backend.panopti.nl/sentry-tunnel',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,
  enabled: process.env.NODE_ENV === 'production' || process.env.ENABLE_SENTRY_IN_DEV === 'true',

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
