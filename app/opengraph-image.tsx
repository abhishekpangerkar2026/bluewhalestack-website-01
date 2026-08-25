import { ImageResponse } from "next/og";
import { company } from "@/content/company";

/**
 * Site-wide Open Graph / Twitter card image, generated at build time.
 * Pages without their own opengraph-image inherit this one, so every
 * shared link (LinkedIn, Slack, WhatsApp, X) renders a branded card
 * instead of a blank preview.
 */
export const runtime = "nodejs";
export const alt = `${company.name} — ${company.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(135deg, #001b79 0%, #002da1 55%, #1a47c9 100%)",
          color: "#ffffff",
          fontFamily: "Inter, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        {/* logomark: whale on a 2x2 tile grid, drawn inline so no asset fetch is needed */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: 72,
              height: 72,
              gap: 4,
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: 34,
                  height: 34,
                  background: "rgba(255,255,255,0.95)",
                  borderRadius: 4,
                  opacity: i === 1 ? 0.55 : 1,
                }}
              />
            ))}
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {company.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            Every cloud. One control plane.
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 980,
            }}
          >
            Hyperscaler-neutral cloud management — unified inventory, AI-native
            provisioning, bundled observability, migration and governance across
            public cloud, on-prem and sovereign estates.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <div style={{ display: "flex", gap: 28 }}>
            <span>6 public clouds + on-prem</span>
            <span>·</span>
            <span>4 editions</span>
            <span>·</span>
            <span>SaaS · BYOC · Sovereign</span>
          </div>
          <div style={{ fontWeight: 600, color: "#ffffff" }}>
            bluewhalestack.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
