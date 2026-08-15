/**
 * Certification badge SVG components.
 * Each badge is a self-contained SVG at a 96×96 viewBox.
 * Replace the SVG body with an official mark from the certifying body
 * once the digital certificate files are received.
 */

import { cn } from "@/lib/utils";

// ─── ISO badge (shared template for all 5 ISO standards) ─────────────────────

function IsoBadge({
  standard,
  year,
  subtitle,
}: {
  standard: string;
  year: string;
  subtitle?: string;
}) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`ISO ${standard}:${year}`}
      role="img"
    >
      {/* Background */}
      <rect width="96" height="96" rx="10" fill="#0D2450" />
      {/* Top accent bar */}
      <rect width="96" height="3" rx="1.5" fill="#4A9EFF" />

      {/* ISO mark — two overlapping circles (simplified ISO logo) */}
      <circle cx="36" cy="28" r="13" stroke="white" strokeWidth="2" strokeOpacity="0.45" />
      <circle cx="60" cy="28" r="13" stroke="white" strokeWidth="2" strokeOpacity="0.45" />
      {/* Overlap fill to make the lens shape stand out */}
      <path
        d="M 48 15.8 A 13 13 0 0 1 48 40.2 A 13 13 0 0 1 48 15.8 Z"
        fill="none"
        stroke="#4A9EFF"
        strokeWidth="0.5"
        strokeOpacity="0.4"
      />
      <text
        x="48"
        y="33"
        textAnchor="middle"
        fill="white"
        fontSize="9"
        fontWeight="700"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        ISO
      </text>

      {/* Standard number */}
      <text
        x="48"
        y="62"
        textAnchor="middle"
        fill="white"
        fontSize="19"
        fontWeight="700"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        {standard}
      </text>

      {/* Year */}
      <text
        x="48"
        y="74"
        textAnchor="middle"
        fill="#4A9EFF"
        fontSize="9"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        :{year}
      </text>

      {/* Subtitle (optional) */}
      {subtitle && (
        <text
          x="48"
          y="83"
          textAnchor="middle"
          fill="white"
          fontSize="6"
          fontFamily="Arial, Helvetica, sans-serif"
          fillOpacity="0.5"
        >
          {subtitle}
        </text>
      )}

      {/* Footer pill */}
      <rect x="18" y="86" width="60" height="8" rx="4" fill="white" fillOpacity="0.1" />
      <text
        x="48"
        y="93"
        textAnchor="middle"
        fill="white"
        fontSize="6"
        fontWeight="600"
        fontFamily="Arial, Helvetica, sans-serif"
        letterSpacing="1.5"
      >
        CERTIFIED
      </text>
    </svg>
  );
}

// ─── CSA STAR Level 1 ────────────────────────────────────────────────────────

function CsaStarBadge() {
  // 5-point star polygon centered at (48, 30), outer r=16, inner r=7
  const star =
    "M 48,14 L 52.1,26.3 L 63.2,27.1 L 54.7,34.2 L 57.4,44.9 L 48,39 L 38.6,44.9 L 41.3,34.2 L 32.8,27.1 L 43.9,26.3 Z";

  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CSA STAR Level 1"
      role="img"
    >
      <rect width="96" height="96" rx="10" fill="#1A0A3D" />
      <rect width="96" height="3" rx="1.5" fill="#F5A623" />

      {/* Glow behind star */}
      <ellipse cx="48" cy="30" rx="18" ry="18" fill="#F5A623" fillOpacity="0.12" />

      {/* Star */}
      <polygon points="48,14 52.1,26.3 63.2,27.1 54.7,34.2 57.4,44.9 48,39 38.6,44.9 41.3,34.2 32.8,27.1 43.9,26.3" fill="#F5A623" />

      {/* Level 1 badge ring */}
      <circle cx="70" cy="22" r="9" fill="#F5A623" fillOpacity="0.2" stroke="#F5A623" strokeWidth="1.2" />
      <text
        x="70"
        y="25"
        textAnchor="middle"
        fill="#F5A623"
        fontSize="7"
        fontWeight="700"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        L1
      </text>

      <text
        x="48"
        y="61"
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontWeight="700"
        fontFamily="Arial, Helvetica, sans-serif"
        letterSpacing="0.5"
      >
        CSA STAR
      </text>
      <text
        x="48"
        y="74"
        textAnchor="middle"
        fill="#F5A623"
        fontSize="9"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        Level 1
      </text>

      <rect x="18" y="82" width="60" height="8" rx="4" fill="white" fillOpacity="0.1" />
      <text
        x="48"
        y="89"
        textAnchor="middle"
        fill="white"
        fontSize="6"
        fontWeight="600"
        fontFamily="Arial, Helvetica, sans-serif"
        letterSpacing="1.5"
      >
        CERTIFIED
      </text>
    </svg>
  );
}

// ─── SOC 2 Type II ───────────────────────────────────────────────────────────

function Soc2Badge() {
  // Shield path centered at (48, 32)
  const shield =
    "M 48,13 L 70,22 L 70,38 C 70,52 59,62 48,67 C 37,62 26,52 26,38 L 26,22 Z";

  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SOC 2 Type II"
      role="img"
    >
      <rect width="96" height="96" rx="10" fill="#0C3547" />
      <rect width="96" height="3" rx="1.5" fill="#2DD4BF" />

      {/* Shield */}
      <path d={shield} fill="#134E65" stroke="#2DD4BF" strokeWidth="1.5" />
      {/* Shield check mark */}
      <polyline
        points="39,40 45,46 57,34"
        stroke="#2DD4BF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <text
        x="48"
        y="78"
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontWeight="700"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        SOC 2
      </text>

      <rect x="18" y="82" width="60" height="8" rx="4" fill="white" fillOpacity="0.1" />
      <text
        x="48"
        y="89"
        textAnchor="middle"
        fill="#2DD4BF"
        fontSize="6"
        fontWeight="700"
        fontFamily="Arial, Helvetica, sans-serif"
        letterSpacing="1.5"
      >
        TYPE II
      </text>
    </svg>
  );
}

// ─── GDPR ────────────────────────────────────────────────────────────────────
// EU emblem: 12 gold stars on a circle on EU blue

const EU_STARS = Array.from({ length: 12 }, (_, i) => {
  const angle = ((-90 + 30 * i) * Math.PI) / 180;
  return {
    cx: +(48 + 18 * Math.cos(angle)).toFixed(2),
    cy: +(32 + 18 * Math.sin(angle)).toFixed(2),
  };
});

function GdprBadge() {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="GDPR"
      role="img"
    >
      <rect width="96" height="96" rx="10" fill="#003399" />
      <rect width="96" height="3" rx="1.5" fill="#FFCC00" />

      {/* 12 EU gold stars */}
      {EU_STARS.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r="2.8" fill="#FFCC00" />
      ))}

      <text
        x="48"
        y="64"
        textAnchor="middle"
        fill="white"
        fontSize="18"
        fontWeight="700"
        fontFamily="Arial, Helvetica, sans-serif"
        letterSpacing="1"
      >
        GDPR
      </text>
      <text
        x="48"
        y="75"
        textAnchor="middle"
        fill="#FFCC00"
        fontSize="7"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        EU 2016/679
      </text>

      <rect x="18" y="82" width="60" height="8" rx="4" fill="white" fillOpacity="0.1" />
      <text
        x="48"
        y="89"
        textAnchor="middle"
        fill="white"
        fontSize="6"
        fontWeight="600"
        fontFamily="Arial, Helvetica, sans-serif"
        letterSpacing="1.5"
      >
        COMPLIANT
      </text>
    </svg>
  );
}

// ─── India DPDP Act 2023 ─────────────────────────────────────────────────────
// Ashoka Chakra: 24 spokes on a wheel

const CHAKRA_SPOKES = Array.from({ length: 24 }, (_, i) => {
  const angle = ((i * 15) * Math.PI) / 180;
  return {
    x1: +(48 + 8 * Math.cos(angle)).toFixed(2),
    y1: +(29 + 8 * Math.sin(angle)).toFixed(2),
    x2: +(48 + 15 * Math.cos(angle)).toFixed(2),
    y2: +(29 + 15 * Math.sin(angle)).toFixed(2),
  };
});

function DpdpBadge() {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="India DPDP Act 2023"
      role="img"
    >
      <rect width="96" height="96" rx="10" fill="white" />

      {/* India tricolor bands */}
      <rect width="96" height="4" fill="#FF9933" />
      <rect y="9" width="96" height="4" fill="#138808" />
      {/* white band between is the card bg */}

      {/* Ashoka Chakra wheel */}
      <circle cx="48" cy="29" r="16" fill="none" stroke="#003399" strokeWidth="1.8" />
      <circle cx="48" cy="29" r="3.5" fill="#003399" />
      {CHAKRA_SPOKES.map((s, i) => (
        <line
          key={i}
          x1={s.x1}
          y1={s.y1}
          x2={s.x2}
          y2={s.y2}
          stroke="#003399"
          strokeWidth="0.9"
        />
      ))}

      <text
        x="48"
        y="62"
        textAnchor="middle"
        fill="#0A1628"
        fontSize="14"
        fontWeight="700"
        fontFamily="Arial, Helvetica, sans-serif"
        letterSpacing="1"
      >
        DPDP
      </text>
      <text
        x="48"
        y="73"
        textAnchor="middle"
        fill="#003399"
        fontSize="8"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        Act 2023
      </text>

      <rect x="18" y="81" width="60" height="8" rx="4" fill="#F3F5F8" />
      <text
        x="48"
        y="88"
        textAnchor="middle"
        fill="#0A1628"
        fontSize="6"
        fontWeight="600"
        fontFamily="Arial, Helvetica, sans-serif"
        letterSpacing="1.5"
      >
        INDIA
      </text>
    </svg>
  );
}

// ─── Public map ──────────────────────────────────────────────────────────────

const BADGE_MAP: Record<string, React.ReactNode> = {
  "iso-27001": <IsoBadge standard="27001" year="2022" subtitle="Information Security" />,
  "iso-27017": <IsoBadge standard="27017" year="2015" subtitle="Cloud Security" />,
  "iso-27018": <IsoBadge standard="27018" year="2019" subtitle="PII in Cloud" />,
  "iso-27701": <IsoBadge standard="27701" year="2019" subtitle="Privacy ISMS" />,
  "iso-22301": <IsoBadge standard="22301" year="2019" subtitle="Business Continuity" />,
  "csa-star": <CsaStarBadge />,
  soc2: <Soc2Badge />,
  gdpr: <GdprBadge />,
  dpdp: <DpdpBadge />,
};

export function CertBadge({
  certId,
  className,
}: {
  certId: string;
  className?: string;
}) {
  const badge = BADGE_MAP[certId];
  if (!badge) return null;
  return (
    <div className={cn("select-none", className)} aria-label={certId}>
      {badge}
    </div>
  );
}

/** Renders all cert badges in a grid — convenience component for the hero */
export function CertBadgeGrid({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-3 gap-3", className)}>
      {Object.keys(BADGE_MAP).map((id) => (
        <CertBadge key={id} certId={id} />
      ))}
    </div>
  );
}
