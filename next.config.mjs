import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  turbopack: { root: import.meta.dirname },
  // Serve pages as /latest/troubleshooting/index.html instead of
  // /latest/troubleshooting.html — keeps mike-style URLs working.
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
};

export default withMDX(config);
