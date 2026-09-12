/**
 * Hero illustration for /fabric — three tiers of a market's datacenter capacity
 * converging into one fabric plane. Pure inline SVG on the dark hero, drawn
 * in the same oblique "slab" language as ArchitectureStack3D so it reads as
 * part of one system. Server component, no assets.
 */
export function FabricHeroVisual() {
  // Three tiers of facilities, bottom → top: long tail (many, small), national
  // & regional, hyperscale anchors (few, big). Each sits on its own slab.
  const tiers = [
    { y: 300, label: "Tier 3 · the long tail", count: 10, size: 16, gap: 8, tone: 0.55 },
    { y: 228, label: "Tier 2 · national & regional", count: 6, size: 24, gap: 12, tone: 0.7 },
    { y: 150, label: "Tier 1 · hyperscale anchors", count: 4, size: 34, gap: 16, tone: 0.85 },
  ];

  return (
    <svg
      viewBox="0 0 560 380"
      role="img"
      aria-label="Three tiers of a market's datacenter facilities converging into one BlueWhale Stack fabric plane"
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="fabric-plane" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4d74d8" />
          <stop offset="1" stopColor="#1a47c9" />
        </linearGradient>
        <linearGradient id="fabric-slab" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.10" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.04" />
        </linearGradient>
        <filter id="fabric-glow" x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="10" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* converging lines from each tier up into the fabric plane */}
      {tiers.map((t) =>
        Array.from({ length: t.count }).map((_, i) => {
          const total = t.count * t.size + (t.count - 1) * t.gap;
          const x0 = 280 - total / 2 + i * (t.size + t.gap) + t.size / 2;
          return (
            <line
              key={`${t.y}-${i}`}
              x1={x0}
              y1={t.y}
              x2={280 + (x0 - 280) * 0.35}
              y2={78}
              stroke="#ffffff"
              strokeOpacity="0.12"
              strokeWidth="1"
            />
          );
        }),
      )}

      {/* fabric plane (top slab, highlighted) */}
      <g filter="url(#fabric-glow)">
        <polygon points="120,70 470,70 430,96 80,96" fill="url(#fabric-plane)" />
      </g>
      <polygon points="80,96 430,96 430,106 80,106" fill="#001b79" />
      <text
        x="255"
        y="88"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="12"
        fontWeight="700"
        letterSpacing="1.5"
        style={{ fontFamily: "inherit" }}
      >
        THE FABRIC PLANE
      </text>
      <text
        x="255"
        y="52"
        textAnchor="middle"
        fill="#b3c4ef"
        fontSize="11"
        fontWeight="600"
        letterSpacing="1.2"
        style={{ fontFamily: "inherit" }}
      >
        ONE CATALOG · ONE IDENTITY · ONE BILL
      </text>

      {/* tier slabs with facility blocks */}
      {tiers.map((t) => {
        const total = t.count * t.size + (t.count - 1) * t.gap;
        const left = 280 - total / 2;
        return (
          <g key={t.y}>
            <polygon
              points={`${left - 40},${t.y + 8} ${left + total + 40},${t.y + 8} ${left + total + 24},${t.y + 26} ${left - 56},${t.y + 26}`}
              fill="url(#fabric-slab)"
              stroke="#ffffff"
              strokeOpacity="0.12"
            />
            {Array.from({ length: t.count }).map((_, i) => {
              const x = left + i * (t.size + t.gap);
              return (
                <g key={i}>
                  {/* facility block: front face + lighter top */}
                  <rect
                    x={x}
                    y={t.y - t.size + 8}
                    width={t.size}
                    height={t.size}
                    rx="2"
                    fill="#ffffff"
                    fillOpacity={t.tone * 0.22}
                    stroke="#ffffff"
                    strokeOpacity={t.tone * 0.5}
                  />
                  <rect
                    x={x + 3}
                    y={t.y - t.size + 12}
                    width={t.size - 6}
                    height={2}
                    fill="#f5a623"
                    fillOpacity="0.9"
                  />
                </g>
              );
            })}
            <text
              x={left - 44}
              y={t.y + 20}
              textAnchor="end"
              fill="#b3c4ef"
              fontSize="10.5"
              fontWeight="600"
              style={{ fontFamily: "inherit" }}
            >
              {t.label}
            </text>
          </g>
        );
      })}

      {/* public cloud, kept at the edge */}
      <g>
        <rect x="446" y="222" width="94" height="30" rx="6" fill="#ffffff" fillOpacity="0.08" stroke="#ffffff" strokeOpacity="0.2" />
        <text x="493" y="241" textAnchor="middle" fill="#ffffff" fillOpacity="0.8" fontSize="10.5" fontWeight="600" style={{ fontFamily: "inherit" }}>
          Public cloud · edge
        </text>
        <line x1="493" y1="222" x2="420" y2="96" stroke="#ffffff" strokeOpacity="0.15" strokeDasharray="3 3" />
      </g>

      {/* base caption */}
      <text x="280" y="356" textAnchor="middle" fill="#ffffff" fillOpacity="0.55" fontSize="11" style={{ fontFamily: "inherit" }}>
        Every operator · every tier · one market, governed as one estate
      </text>
    </svg>
  );
}
