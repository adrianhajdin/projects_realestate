/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "blog.pamgolding.co.za",
      "bayut-production.s3.eu-central-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
