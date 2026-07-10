# Architecture diagram specs

All diagrams render as branded **placeholders** in Pass 1 (`<Placeholder>`).
This file specifies each one so it can be built as a code-based SVG/React
component in a later pass (on-brand, no licensing, editable). Brand blue
`#002da1`, accent cyan `#06b6c4`.

## 1. Platform module map (`/platform`)
- **Top layer:** "Control Plane — BlueWhale Stack" (single wide bar).
- **Module band:** Foundation · Operations · Builder · AI tiles inside the bar.
- **Bottom layer:** cloud/hypervisor nodes — AWS, Azure, GCP, Oracle, IBM,
  Alibaba, VMware, Hyper-V, OpenStack, bare-metal.
- **Connectors:** lines from control plane down to each cloud node.
- **Side rail:** "Whale AI" running vertically across all layers.

## 2. Edition diagrams (`/editions/[slug]`)
- **Standard:** SaaS control plane → AWS/Azure/GCP, single region (Singapore).
- **Enterprise:** multi-cloud control plane, 4 regions, three deploy badges
  (SaaS / BYOC / Sovereign).
- **Datacenter:** operator portal → multi-facility fleet; DCIM hierarchy
  (site→room→row→rack→unit); Go edge agents (Redfish/IPMI/SNMP); tenant portals.
- **Government:** air-gapped boundary box; in-region AI model node; "no
  call-home" annotation; ministry tenants inside the boundary.
- **Telco & MSP:** multi-tenant control plane → N white-label tenant portals;
  per-tenant billing meter.

## 3. Module diagrams (`/modules/[slug]`)
One simple flow per module showing inputs → module → outputs. Priorities:
- **Migration:** discover → assess/score → wave plan → cut-over → validate.
- **FinOps:** ingest cost → forecast → rightsize → chargeback → alert.
- **DCIM:** physical hierarchy tree + telemetry (power/thermal/space).
- **Whale AI:** the 4 tiers (Spark/Tide/Abyss/Predictive-Ops) over modules.

## 4. Solution diagrams (`/solutions/[slug]`)
Reuse the related module flows, composed for the outcome (e.g. Migration Factory
= Inventory + Migration + Landing Zone).

## Image placeholders (non-diagram)
- Home hero visual — 16/9.
- Industry hero images — 4/3, one per vertical (8).
- About: world map (offices) + leadership headshots.
All documented inline via `<Placeholder label="…" ratio="…">`.
