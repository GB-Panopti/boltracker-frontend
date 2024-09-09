import {withSentryConfig} from '@sentry/nextjs';
/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL
  },
  output: 'export',
  images: {
    unoptimized: true,
  },

  // redirects: async () => {  <-- redirects dont work with static webpage export which we need to do for Strato
  //   return [
  //     {
  //       source: "/",
  //       destination: "/overview",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default withSentryConfig(nextConfig, {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

org: "gb-fl",
project: "panopti-backend",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Automatically annotate React components to show their full name in breadcrumbs and session replay
reactComponentAnnotation: {
enabled: true,
},

// Hides source maps from generated client bundles
hideSourceMaps: true,

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});

// export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export',
//   basePath: "",
//   env: {
//     BASE_URL: process.env.BASE_URL,
//   }
// };

// export default nextConfig;