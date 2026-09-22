/** @type {import('next').NextConfig} */

// The Studio's Presentation tool shows the live site in a frame — from the hosted
// studio or from Sanity's dashboard, which embeds the studio (nested frames need every
// ancestor listed). Nobody else may frame the site.
const FRAME_ANCESTORS = [
  "'self'",
  "https://www.sanity.io",
  "https://*.sanity.io",
  "https://*.sanity.studio",
  "https://bluewhalestack.sanity.studio",
  "http://localhost:3333",
].join(" ");

const nextConfig = {
  reactStrictMode: true,
  // Emit a minimal, self-contained server build for small Docker images.
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: `frame-ancestors ${FRAME_ANCESTORS}` },
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
