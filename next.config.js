/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", process.env.NEXT_PUBLIC_SUPABASE_URL],
  },
};

module.exports = nextConfig;
