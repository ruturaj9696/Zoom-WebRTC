/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  // This can help with Vercel deployment issues
  outputFileTracing: true,
};

export default nextConfig;
