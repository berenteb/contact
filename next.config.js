/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: [
      process.env.AWS_S3_BUCKET_NAME + ".s3.eu-central-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
