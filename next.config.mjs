/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ['upload.wikimedia.org'],
  // },
  images: {
    remotePatterns: [
      {
        hostname: 'upload.wikimedia.org',
      },
    ],
  },
  env: {
    DEMO_USER_EMAIL: process.env.DEMO_USER_EMAIL,
    DEMO_USER_PASSWORD: process.env.DEMO_USER_PASSWORD,
  },
  // distDir: 'build',
};

export default nextConfig;
