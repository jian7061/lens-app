/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lens.infura-ipfs.io",
      "statics-polygon-lens-staging.s3.eu-west-1.amazonaws.com",
      "",
    ],
  },
};

module.exports = nextConfig;
