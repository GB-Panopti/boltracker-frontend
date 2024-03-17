/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: "",
    env: {
      BASE_URL: process.env.BASE_URL,
    }
};

export default nextConfig;
