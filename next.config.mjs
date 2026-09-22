/** @type {import('next').NextConfig} */

// The Studio's Presentation tool shows the live site in a frame; nobody else may frame it.
const STUDIO_ORIGIN = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? "https://bluewhalestack.sanity.studio";

const nextConfig = {
  reactStrictMode: true,
  // Emit a minimal, self-contained server build for small Docker images.
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: `frame-ancestors 'self' ${STUDIO_ORIGIN} http://localhost:3333` },
        ],
      },
    ];
  },
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
