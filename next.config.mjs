/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Emit a minimal, self-contained server build for small Docker images.
  output: "standalone",
};

export default nextConfig;
