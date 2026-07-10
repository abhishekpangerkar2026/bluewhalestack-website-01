"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Boxes,
  Wallet,
  Sparkles,
  ShieldCheck,
  LayoutDashboard,
  MoveRight,
  Check,
  AlertCircle,
  TrendingDown,
  ArrowDownRight,
  Activity,
  Zap,
} from "lucide-react";
import { CloudLogo } from "@/components/brand/CloudLogos";

const TABS = ["Inventory", "FinOps", "Whale AI", "Security"] as const;
type Tab = (typeof TABS)[number];

const TAB_ICONS: Record<Tab, React.ElementType> = {
  Inventory: Boxes,
  FinOps: Wallet,
  "Whale AI": Sparkles,
  Security: ShieldCheck,
};

/* ── Inventory view ── */
function InventoryView() {
  const rows = [
    { name: "prod-api-cluster", type: "EKS", provider: "aws", region: "ap-south-1", status: "running" },
    { name: "data-warehouse-01", type: "BigQuery", provider: "gcp", region: "us-east1", status: "running" },
    { name: "corp-ad-vm", type: "VM", provider: "azure", region: "eastus", status: "stopped" },
    { name: "analytics-rds", type: "RDS", provider: "aws", region: "eu-west-1", status: "running" },
    { name: "backup-store", type: "Blob", provider: "azure", region: "westus", status: "running" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div style={{ fontSize: 11, color: "#6B7A90" }}>Inventory &amp; Discovery</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0A1628" }}>Cloud estate — all providers</div>
        </div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            background: "#F0F4FF",
            color: "#002DA1",
            borderRadius: 6,
            padding: "3px 8px",
          }}
        >
          4,821 resources
        </div>
      </div>
      <div style={{ borderRadius: 10, border: "1px solid #E3E8EF", overflow: "hidden" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 60px 80px 64px",
            padding: "6px 10px",
            background: "#F5F7FA",
            borderBottom: "1px solid #E3E8EF",
            fontSize: 10,
            fontWeight: 600,
            color: "#6B7A90",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          <span>Resource</span>
          <span>Cloud</span>
          <span>Region</span>
          <span>Status</span>
        </div>
        {rows.map((r) => (
          <div
            key={r.name}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 60px 80px 64px",
              padding: "7px 10px",
              borderBottom: "1px solid #F0F2F5",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#0A1628" }}>{r.name}</div>
              <div style={{ fontSize: 10, color: "#6B7A90" }}>{r.type}</div>
            </div>
            <div style={{ paddingLeft: 4 }}>
              <CloudLogo name={r.provider} className="scale-75 origin-left" />
            </div>
            <div style={{ fontSize: 10, color: "#6B7A90" }}>{r.region}</div>
            <div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  borderRadius: 99,
                  padding: "2px 7px",
                  background: r.status === "running" ? "#ECFDF5" : "#FEF3C7",
                  color: r.status === "running" ? "#059669" : "#D97706",
                }}
              >
                {r.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── FinOps view ── */
function FinOpsView() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div style={{ fontSize: 11, color: "#6B7A90" }}>FinOps</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0A1628" }}>Cost overview</div>
        </div>
        <span style={{ fontSize: 10, color: "#6B7A90", border: "1px solid #E3E8EF", borderRadius: 6, padding: "3px 8px" }}>
          Last 6 months
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
        {[
          { v: "$1.24M", l: "Total spend", d: "↓ 28%", good: true },
          { v: "$412K", l: "Saved", d: "this quarter", good: true },
          { v: "4,821", l: "Resources", d: "6 clouds" },
        ].map((k) => (
          <div
            key={k.l}
            style={{
              borderRadius: 8,
              border: "1px solid #E3E8EF",
              background: "#FAFBFC",
              padding: "8px 10px",
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0A1628" }}>{k.v}</div>
            <div style={{ fontSize: 10, color: "#6B7A90" }}>{k.l}</div>
            <div style={{ fontSize: 10, color: k.good ? "#059669" : "#6B7A90", marginTop: 2 }}>{k.d}</div>
          </div>
        ))}
      </div>
      <div style={{ borderRadius: 10, border: "1px solid #E3E8EF", padding: "10px 12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#4A5A70" }}>Spend trend</span>
          <span style={{ fontSize: 10, fontWeight: 600, color: "#059669", display: "flex", alignItems: "center", gap: 2 }}>
            <ArrowDownRight style={{ width: 12, height: 12 }} /> optimized
          </span>
        </div>
        <svg viewBox="0 0 280 70" style={{ width: "100%", height: 60 }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#002da1" stopOpacity="0.22" />
              <stop offset="1" stopColor="#002da1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 48 C30 38,50 14,85 22 S145 55,175 38 S240 16,280 24 L280 70 L0 70 Z" fill="url(#fg)" />
          <path d="M0 48 C30 38,50 14,85 22 S145 55,175 38 S240 16,280 24" fill="none" stroke="#002da1" strokeWidth="2" />
          <circle cx="280" cy="24" r="3" fill="#002da1" />
        </svg>
      </div>
      <div style={{ borderRadius: 10, border: "1px solid #E3E8EF", padding: "8px 12px" }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#4A5A70", marginBottom: 6 }}>By provider</div>
        <div style={{ display: "flex", height: 8, borderRadius: 99, overflow: "hidden", gap: 1 }}>
          <span style={{ background: "#FF9900", width: "42%" }} />
          <span style={{ background: "#0078D4", width: "33%" }} />
          <span style={{ background: "#34A853", width: "25%" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <CloudLogo name="aws" className="scale-75 origin-left" />
          <CloudLogo name="azure" className="scale-75" />
          <CloudLogo name="gcp" className="scale-75 origin-right" />
        </div>
      </div>
    </div>
  );
}

/* ── Whale AI view ── */
function WhaleAIView() {
  return (
    <div className="space-y-3">
      <div>
        <div style={{ fontSize: 11, color: "#6B7A90" }}>Whale AI · Spark tier</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#0A1628" }}>AI assistant</div>
      </div>
      <div
        style={{
          borderRadius: 10,
          border: "1px solid #E3E8EF",
          background: "#FAFBFC",
          padding: 10,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {/* user message */}
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <div
            style={{
              flexShrink: 0,
              width: 24,
              height: 24,
              borderRadius: 99,
              background: "#E3E8EF",
              display: "grid",
              placeItems: "center",
              fontSize: 10,
              fontWeight: 700,
              color: "#4A5A70",
            }}
          >
            AP
          </div>
          <div style={{ background: "#FFFFFF", border: "1px solid #E3E8EF", borderRadius: 8, padding: "6px 10px", fontSize: 11, color: "#0A1628" }}>
            Which AWS instances can I right-size this month?
          </div>
        </div>
        {/* AI response */}
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <div
            style={{
              flexShrink: 0,
              width: 24,
              height: 24,
              borderRadius: 99,
              background: "#002DA1",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Sparkles style={{ width: 12, height: 12, color: "#fff" }} />
          </div>
          <div style={{ flex: 1, fontSize: 11, color: "#0A1628", lineHeight: 1.6 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Found 12 over-provisioned EC2 instances</div>
            {[
              { name: "prod-api-3", save: "$340/mo", action: "m5.2xl → m5.xl" },
              { name: "data-proc-1", save: "$210/mo", action: "r5.4xl → r5.2xl" },
              { name: "worker-pool", save: "$180/mo", action: "c5.2xl → c5.xl" },
            ].map((s) => (
              <div
                key={s.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#F0F4FF",
                  borderRadius: 6,
                  padding: "4px 8px",
                  marginBottom: 4,
                }}
              >
                <span style={{ color: "#002DA1", fontWeight: 600 }}>{s.name}</span>
                <span style={{ color: "#6B7A90", fontSize: 10 }}>{s.action}</span>
                <span style={{ color: "#059669", fontWeight: 700 }}>{s.save}</span>
              </div>
            ))}
            <div style={{ fontSize: 10, color: "#6B7A90", marginTop: 4 }}>+ 9 more · Est. savings: $2,140/mo</div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {["Right-size all", "Export report", "Create ITSM ticket"].map((a) => (
          <button
            key={a}
            style={{
              fontSize: 10,
              fontWeight: 600,
              border: "1px solid #E3E8EF",
              borderRadius: 6,
              padding: "4px 8px",
              background: "#fff",
              color: "#002DA1",
              cursor: "default",
              whiteSpace: "nowrap",
            }}
          >
            {a}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Security view ── */
function SecurityView() {
  const frameworks = [
    { name: "SOC 2 Type II", status: "pass" },
    { name: "ISO 27001:2022", status: "pass" },
    { name: "GDPR", status: "pass" },
    { name: "DPDP Act", status: "pass" },
    { name: "CSA STAR L2", status: "pass" },
    { name: "CIS Benchmarks", status: "warn" },
  ];
  const findings = [
    { sev: "high", text: "2 S3 buckets public-read", cloud: "aws" },
    { sev: "med", text: "MFA not enforced — 3 users", cloud: "azure" },
    { sev: "low", text: "Security group rule overly broad", cloud: "gcp" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div style={{ fontSize: 11, color: "#6B7A90" }}>Security &amp; Compliance</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0A1628" }}>Posture overview</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#059669" }}>97%</div>
          <div style={{ fontSize: 10, color: "#6B7A90" }}>compliance score</div>
        </div>
      </div>
      <div style={{ borderRadius: 10, border: "1px solid #E3E8EF", padding: "8px 10px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#6B7A90", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
          Frameworks
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
          {frameworks.map((f) => (
            <div key={f.name} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              {f.status === "pass" ? (
                <Check style={{ width: 12, height: 12, color: "#059669", flexShrink: 0 }} />
              ) : (
                <AlertCircle style={{ width: 12, height: 12, color: "#D97706", flexShrink: 0 }} />
              )}
              <span style={{ fontSize: 10, color: "#0A1628", fontWeight: 500 }}>{f.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderRadius: 10, border: "1px solid #E3E8EF", padding: "8px 10px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#6B7A90", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
          Open findings
        </div>
        {findings.map((f) => (
          <div
            key={f.text}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 0",
              borderBottom: "1px solid #F0F2F5",
            }}
          >
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                borderRadius: 4,
                padding: "1px 5px",
                background: f.sev === "high" ? "#FEE2E2" : f.sev === "med" ? "#FEF3C7" : "#F0F4FF",
                color: f.sev === "high" ? "#DC2626" : f.sev === "med" ? "#D97706" : "#002DA1",
                flexShrink: 0,
                textTransform: "uppercase",
              }}
            >
              {f.sev}
            </span>
            <span style={{ fontSize: 10, color: "#0A1628", flex: 1 }}>{f.text}</span>
            <CloudLogo name={f.cloud} className="scale-75 origin-right" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main export ── */
export function ProductMockup() {
  const [active, setActive] = useState<Tab>("Inventory");
  const [fading, setFading] = useState(false);

  const switchTo = useCallback((tab: Tab) => {
    setFading(true);
    setTimeout(() => {
      setActive(tab);
      setFading(false);
    }, 180);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive((prev) => TABS[(TABS.indexOf(prev) + 1) % TABS.length]);
        setFading(false);
      }, 180);
    }, 3600);
    return () => clearInterval(id);
  }, []);

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Overview" },
    { icon: Boxes, label: "Inventory", tab: "Inventory" as Tab },
    { icon: Wallet, label: "FinOps", tab: "FinOps" as Tab },
    { icon: ShieldCheck, label: "Security", tab: "Security" as Tab },
    { icon: MoveRight, label: "Migrate" },
    { icon: Activity, label: "Observe" },
  ];

  return (
    <div className="relative select-none">
      {/* floating card — top left */}
      <div
        className="absolute -left-5 top-14 z-10 hidden sm:block"
        style={{
          background: "#fff",
          border: "1px solid #E3E8EF",
          borderRadius: 12,
          padding: "8px 12px",
          boxShadow: "0 8px 24px -4px rgba(15,23,42,0.18)",
          animation: "fadeUp 0.5s ease 0.3s both",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "#ECFDF5",
              display: "grid",
              placeItems: "center",
            }}
          >
            <TrendingDown style={{ width: 14, height: 14, color: "#059669" }} />
          </span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#0A1628", lineHeight: 1 }}>−28%</div>
            <div style={{ fontSize: 10, color: "#6B7A90" }}>cloud spend</div>
          </div>
        </div>
      </div>

      {/* floating card — bottom right */}
      <div
        className="absolute -right-4 bottom-16 z-10 hidden sm:block"
        style={{
          background: "#fff",
          border: "1px solid #E3E8EF",
          borderRadius: 12,
          padding: "8px 12px",
          boxShadow: "0 8px 24px -4px rgba(15,23,42,0.18)",
          animation: "fadeUp 0.5s ease 0.5s both",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "#EEF2FF",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Zap style={{ width: 14, height: 14, color: "#002DA1" }} />
          </span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#0A1628", lineHeight: 1 }}>50+</div>
            <div style={{ fontSize: 10, color: "#6B7A90" }}>AI use cases</div>
          </div>
        </div>
      </div>

      {/* app window */}
      <div
        style={{
          borderRadius: 16,
          border: "1px solid #E3E8EF",
          background: "#FFFFFF",
          overflow: "hidden",
          boxShadow: "0 32px 72px -16px rgba(15,23,42,0.28), 0 0 0 1px rgba(15,23,42,0.04)",
        }}
      >
        {/* browser chrome */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            borderBottom: "1px solid #E3E8EF",
            background: "#F5F7FA",
            padding: "10px 14px",
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: 99, background: "#FC5B55" }} />
          <span style={{ width: 10, height: 10, borderRadius: 99, background: "#FCBA3D" }} />
          <span style={{ width: 10, height: 10, borderRadius: 99, background: "#3CCC66" }} />
          <div style={{ flex: 1, textAlign: "center" }}>
            <div
              style={{
                display: "inline-block",
                background: "#ECEEF2",
                borderRadius: 6,
                padding: "3px 12px",
                fontSize: 11,
                color: "#6B7A90",
              }}
            >
              app.bluewhalestack.com
            </div>
          </div>
        </div>

        {/* layout */}
        <div style={{ display: "grid", gridTemplateColumns: "120px 1fr" }}>
          {/* sidebar */}
          <aside
            style={{
              borderRight: "1px solid #E3E8EF",
              background: "#F8F9FB",
              padding: 10,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
            className="hidden sm:flex"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 6px 8px",
                marginBottom: 4,
                borderBottom: "1px solid #E3E8EF",
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  background: "#002DA1",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                ▦
              </span>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#0A1628" }}>Control Plane</span>
            </div>
            {sidebarItems.map((n) => {
              const isActive = n.tab === active;
              return (
                <button
                  key={n.label}
                  onClick={() => n.tab && switchTo(n.tab)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    borderRadius: 6,
                    padding: "5px 6px",
                    fontSize: 11,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "#002DA1" : "#6B7A90",
                    background: isActive ? "#EEF2FF" : "transparent",
                    border: "none",
                    cursor: n.tab ? "pointer" : "default",
                    textAlign: "left",
                    width: "100%",
                    transition: "background 0.15s, color 0.15s",
                  }}
                >
                  <n.icon style={{ width: 13, height: 13, flexShrink: 0 }} />
                  {n.label}
                </button>
              );
            })}
          </aside>

          {/* main content */}
          <div style={{ padding: 12, minHeight: 340 }}>
            {/* tab strip (mobile + context) */}
            <div
              style={{
                display: "flex",
                gap: 4,
                borderBottom: "1px solid #E3E8EF",
                paddingBottom: 8,
                marginBottom: 10,
                overflowX: "auto",
              }}
            >
              {TABS.map((tab) => {
                const Icon = TAB_ICONS[tab];
                const isActive = tab === active;
                return (
                  <button
                    key={tab}
                    onClick={() => switchTo(tab)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      borderRadius: 6,
                      padding: "4px 9px",
                      fontSize: 11,
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#002DA1" : "#6B7A90",
                      background: isActive ? "#EEF2FF" : "transparent",
                      border: "none",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "background 0.15s, color 0.15s",
                    }}
                  >
                    <Icon style={{ width: 11, height: 11 }} />
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* animated content area */}
            <div
              style={{
                opacity: fading ? 0 : 1,
                transition: "opacity 0.18s ease",
              }}
            >
              {active === "Inventory" && <InventoryView />}
              {active === "FinOps" && <FinOpsView />}
              {active === "Whale AI" && <WhaleAIView />}
              {active === "Security" && <SecurityView />}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
