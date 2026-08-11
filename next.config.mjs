/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure Vercel serverless function tracing is enabled for production deployments
  outputFileTracing: process.env.VERCEL === "1" ? true : undefined,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "tse3.mm.bing.net",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
