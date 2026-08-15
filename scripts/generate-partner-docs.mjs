/**
 * Generates the three partner program guide PDFs into partner-documents/.
 *
 * These are gated marketing collateral (see app/api/partners/document/[docId]
 * and content/partners.ts `programDocuments`), not legal documents — content
 * here must stay in sync with content/partners.ts by hand.
 *
 * Playwright isn't a project dependency (these PDFs are generated once, not
 * at build/runtime). To regenerate:
 *   npm install playwright   (temporarily, or point NODE_PATH at an install)
 *   node scripts/generate-partner-docs.mjs
 */
import { chromium } from "playwright";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = process.env.PARTNER_DOCS_OUT_DIR ?? path.join(__dirname, "..", "partner-documents");

const INK = "#0a1628";
const MUTED = "#4a5a70";
const ACCENT = "#1e6fdb";
const BRAND_900 = "#00156b";
const BRAND_50 = "#e6ecfa";
const LINE = "#dde3ee";

const TRACKS = {
  lsp: {
    name: "License Service Provider (LSP)",
    shortName: "LSP",
    tagline: "Resell BlueWhale Stack licenses and own the commercial relationship.",
    description:
      "LSPs bring BlueWhale Stack to their customers as a licensed product — you register the deal, invoice locally and earn margin, while BlueWhale Stack remains accountable for the platform itself. The fastest way to add a hyperscaler-neutral platform to your catalog without taking on delivery.",
    idealFor:
      "VARs, IT resellers, distributors and cloud consultancies with an existing customer base.",
    benefits: [
      "Deal registration with SLA-based approval and opportunity protection",
      "Two-sided invoicing — receive wholesale, bill retail, with local tax handled automatically (GST / VAT / sales tax)",
      "Tiered margins that grow with your committed volume",
      "Marketplace listing and co-sell support from the BlueWhale Stack team",
    ],
    journey: [
      ["Apply", "Submit your company and territory details through the Partner Portal."],
      ["Verify & sign", "Business/tax-ID verification and the LSP agreement — commercial terms and your starting margin tier."],
      ["Onboard to the portal", "Get access: catalog browsing, deal registration and invoicing tools."],
      ["Register your first deal", "Register a customer opportunity and get it protected while you close it."],
      ["Sell & invoice", "Provision the tenant, invoice your customer, and BlueWhale Stack invoices you at wholesale."],
    ],
    tiers: [
      { name: "Registered", margin: "Standard published margin", commitment: "No minimum commitment", perks: "Portal access, deal registration, self-serve catalog" },
      { name: "Silver", margin: "Standard + 5 pts", commitment: "USD 50,000 / year committed", perks: "Everything in Registered, priority deal-approval SLA" },
      { name: "Gold", margin: "Standard + 10 pts", commitment: "USD 200,000 / year committed", perks: "Everything in Silver, marketing development funds, named partner manager" },
      { name: "Platinum", margin: "Standard + 15 pts", commitment: "USD 500,000 / year committed", perks: "Everything in Gold, revenue share, dedicated technical support line" },
    ],
  },
  implementation: {
    name: "System Implementation Partner",
    shortName: "Implementation",
    tagline: "Design, deploy and support BlueWhale Stack for your end customers.",
    description:
      "Implementation Partners do the technical work: discovery, migration planning, configuration, integration with existing tools and infrastructure, and ongoing operational support. You may deliver alongside an LSP or a direct BlueWhale Stack agreement — your value is delivery, not the license itself.",
    idealFor:
      "Systems integrators, cloud consultancies and MSPs with hands-on delivery and migration teams.",
    benefits: [
      "Technical certification for your engineers, per module and edition you deliver",
      "Sandbox environment plus implementation playbooks and reference architectures",
      "Co-delivery with BlueWhale Stack's own delivery team on your first engagements",
      "Direct escalation path to product & engineering during implementation",
      "Listed as a certified implementation partner in the marketplace",
    ],
    journey: [
      ["Apply", "Tell us which modules, editions and industries your delivery team wants to certify on."],
      ["Certify your team", "Engineers complete technical training and certification per module/edition."],
      ["Get sandbox access", "A hands-on environment, plus implementation playbooks and reference architectures."],
      ["Co-deliver your first project", "BlueWhale Stack's delivery team shadows or co-leads your first customer rollout."],
      ["Deliver independently", "Run implementations solo, backed by an ongoing support and escalation channel."],
    ],
    tiers: null,
  },
  strategic: {
    name: "Strategic Partner",
    shortName: "Strategic",
    tagline: "Operate as the official BlueWhale Stack partner for your country.",
    description:
      "Strategic Partners procure BlueWhale Stack licenses in advance, in volume, and operate the commercial and support presence for their territory under an exclusive or preferred arrangement. This is the deepest partnership tier — for organizations ready to represent BlueWhale Stack officially in a market.",
    idealFor:
      "National telcos, systems houses and government-facing operators able to commit to volume and represent the brand locally.",
    benefits: [
      "Exclusive or preferred rights to operate in an agreed territory",
      "Advance / wholesale license procurement at the deepest available margins",
      "Local legal, tax and data-residency alignment for your market",
      "Co-branded local marketing and joint go-to-market planning",
      "A dedicated BlueWhale Stack executive relationship and quarterly business reviews",
    ],
    journey: [
      ["Apply & qualify", "Share your territory, business case and committed volume for review."],
      ["Commercial & legal agreement", "Negotiate the territory, pricing and license-procurement terms."],
      ["Enable your organization", "Sales and technical certification for your local team, plus portal and marketing setup."],
      ["Launch officially", "Go live as the named BlueWhale Stack partner for your territory."],
      ["Grow the territory", "Joint business planning, renewal of committed volume, and expansion into new segments."],
    ],
    tiers: null,
  },
};

function renderHtml(track) {
  const generatedOn = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const benefitsHtml = track.benefits
    .map((b) => `<li>${b}</li>`)
    .join("\n");

  const journeyHtml = track.journey
    .map(
      ([title, body], i) => `
      <div class="step">
        <div class="step-num">0${i + 1}</div>
        <div>
          <div class="step-title">${title}</div>
          <div class="step-body">${body}</div>
        </div>
      </div>`,
    )
    .join("\n");

  const tiersHtml = track.tiers
    ? `
    <section class="section">
      <div class="eyebrow">Margin tiers</div>
      <h2>LSP margin tiers</h2>
      <table>
        <thead>
          <tr><th>Tier</th><th>Margin</th><th>Annual commitment</th><th>Perks</th></tr>
        </thead>
        <tbody>
          ${track.tiers
            .map(
              (t) => `<tr>
            <td class="tier-name">${t.name}</td>
            <td>${t.margin}</td>
            <td>${t.commitment}</td>
            <td>${t.perks}</td>
          </tr>`,
            )
            .join("\n")}
        </tbody>
      </table>
      <p class="illustrative">
        Illustrative figures for planning purposes only — final margins and
        commitments are confirmed in your signed Partner Agreement.
      </p>
    </section>`
    : "";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
    color: ${INK};
  }
  .cover {
    height: 297mm;
    padding: 28mm 22mm;
    background: linear-gradient(160deg, ${BRAND_900} 0%, #002a8a 60%, ${ACCENT} 100%);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .wordmark { font-size: 15px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
  .cover-eyebrow {
    margin-top: 60mm;
    font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
    color: #bcd0f7;
  }
  .cover-title { margin-top: 6mm; font-size: 40px; font-weight: 800; line-height: 1.08; max-width: 140mm; }
  .cover-tagline { margin-top: 8mm; font-size: 16px; line-height: 1.5; max-width: 130mm; color: #dce6fb; }
  .cover-foot { font-size: 11px; color: #a9c0ee; }

  .page { padding: 20mm 22mm; page-break-before: always; }
  .eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: ${ACCENT}; margin-bottom: 6px; }
  h2 { font-size: 24px; font-weight: 800; margin: 0 0 10px; letter-spacing: -0.01em; }
  p { font-size: 13px; line-height: 1.65; color: ${MUTED}; margin: 0 0 8px; }
  .section { margin-bottom: 26px; }
  .section:not(:first-child) { border-top: 1px solid ${LINE}; padding-top: 22px; }

  ul.benefits { list-style: none; margin: 10px 0 0; padding: 0; }
  ul.benefits li {
    position: relative; padding-left: 18px; margin-bottom: 9px;
    font-size: 13px; line-height: 1.5; color: ${MUTED};
  }
  ul.benefits li::before {
    content: ""; position: absolute; left: 0; top: 6px;
    width: 6px; height: 6px; border-radius: 50%; background: ${BRAND_900};
  }

  .step { display: flex; gap: 14px; padding: 12px 0; border-top: 1px solid ${LINE}; }
  .step:first-of-type { border-top: none; }
  .step-num { font-size: 20px; font-weight: 800; color: rgba(30,111,219,0.35); width: 28px; flex-shrink: 0; }
  .step-title { font-size: 14px; font-weight: 700; color: ${INK}; margin-bottom: 2px; }
  .step-body { font-size: 12.5px; line-height: 1.55; color: ${MUTED}; }

  table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 12px; }
  th { text-align: left; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em; color: ${MUTED}; padding: 8px 10px; border-bottom: 1px solid ${LINE}; }
  td { padding: 10px; border-bottom: 1px solid ${LINE}; color: ${MUTED}; vertical-align: top; }
  td.tier-name { font-weight: 700; color: ${INK}; }
  .illustrative { margin-top: 10px; font-size: 11px; font-style: italic; color: #8a93a3; }

  .idealfor { background: ${BRAND_50}; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: ${INK}; }
  .idealfor b { color: ${ACCENT}; }

  .footer { margin-top: 30px; padding-top: 16px; border-top: 1px solid ${LINE}; font-size: 10.5px; color: #8a93a3; }
</style>
</head>
<body>

  <div class="cover">
    <div class="wordmark">BlueWhale Stack</div>
    <div>
      <div class="cover-eyebrow">Partner Program Guide</div>
      <div class="cover-title">${track.name}</div>
      <div class="cover-tagline">${track.tagline}</div>
    </div>
    <div class="cover-foot">Generated ${generatedOn} · partners@bluewhalestack.com</div>
  </div>

  <div class="page">
    <section class="section">
      <div class="eyebrow">Overview</div>
      <h2>What this track is</h2>
      <p>${track.description}</p>
      <div class="idealfor"><b>Ideal for —</b> ${track.idealFor}</div>
    </section>

    <section class="section">
      <div class="eyebrow">What's included</div>
      <h2>Program benefits</h2>
      <ul class="benefits">${benefitsHtml}</ul>
    </section>

    <section class="section">
      <div class="eyebrow">The journey</div>
      <h2>From application to launch</h2>
      ${journeyHtml}
    </section>

    ${tiersHtml}

    <div class="footer">
      This guide is for informational purposes only and does not constitute
      a binding offer. It is superseded by your signed BlueWhale Stack
      Partner Agreement. Questions — partners@bluewhalestack.com.
    </div>
  </div>

</body>
</html>`;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const [id, track] of Object.entries(TRACKS)) {
    const html = renderHtml(track);
    if (process.env.PARTNER_DOCS_DEBUG_HTML) {
      await writeFile(path.join(OUT_DIR, `${id}-program-guide.debug.html`), html);
    }
    await page.setContent(html, { waitUntil: "load" });
    const pdf = await page.pdf({ printBackground: true, preferCSSPageSize: true });
    const outPath = path.join(OUT_DIR, `${id}-program-guide.pdf`);
    await writeFile(outPath, pdf);
    console.log("wrote", outPath, `(${pdf.length} bytes)`);
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
