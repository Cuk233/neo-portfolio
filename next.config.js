/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    domains: ["github.com", "raw.githubusercontent.com"],
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
