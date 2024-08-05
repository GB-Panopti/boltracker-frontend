/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL
  },
  output: 'export',
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/overview",
        permanent: true,
      },
    ];
  },
};

export default nextConfig

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
