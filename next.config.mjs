/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Emit a minimal, self-contained server build for small Docker images.
  output: "standalone",
  async redirects() {
    // Telco and Datacenter were merged into one licensed edition
    // (matches the official Company Profile's "Four Editions" model).
    return [
      { source: "/editions/telco", destination: "/editions/telco-datacenter", permanent: true },
      { source: "/editions/datacenter", destination: "/editions/telco-datacenter", permanent: true },
    ];
  },
};

export default nextConfig;
