/** Documentation hub content */

// ─── DocCard (shown on /docs index page) ─────────────────────────────────────

export interface DocCard {
  slug: string;
  title: string;
  body: string;
  tags: string[];
  icon: string;
}

// ─── Rich content blocks ──────────────────────────────────────────────────────

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "callout"; variant: "note" | "tip" | "warning"; text: string }
  | { type: "code"; lang: string; code: string; label?: string }
  | { type: "steps"; items: { title: string; body: string; code?: string }[] }
  | { type: "list"; items: string[] }
  | { type: "grid"; items: { icon: string; title: string; body: string }[] };

export interface DocSection {
  id: string;
  heading: string;
  blocks: ContentBlock[];
}

export interface DocPageDef {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  readTime: string;
  sections: DocSection[];
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
}

// ─── /docs index cards ────────────────────────────────────────────────────────

export const docCards: DocCard[] = [
  {
    slug: "introduction",
    title: "Introduction to BlueWhale Stack",
    body: "Platform overview, architecture, and key concepts for cloud architects and IT teams getting started.",
    tags: ["Overview", "Architecture", "Getting Started"],
    icon: "Cloud",
  },
  {
    slug: "quick-start",
    title: "Quick Start — SaaS",
    body: "Connect your first cloud account and run your first discovery to see a unified inventory of your estate.",
    tags: ["SaaS", "Setup", "AWS", "Azure", "GCP"],
    icon: "Zap",
  },
  {
    slug: "cloud-integration",
    title: "Cloud Account & On-Prem Integration",
    body: "Connect AWS, Azure, GCP, Oracle, IBM and Alibaba accounts, plus on-prem via the Edge Agent over outbound-only HTTPS.",
    tags: ["AWS", "Azure", "GCP", "Oracle", "Edge Agent"],
    icon: "Plug",
  },
  {
    slug: "identity-access",
    title: "Identity & Access",
    body: "Federate 9+ identity providers — Entra, Okta, Auth0, AWS Identity Center and more — with auto-provisioning and role-based access.",
    tags: ["Identity", "SSO", "RBAC", "Provisioning"],
    icon: "ShieldCheck",
  },
  {
    slug: "service-catalog",
    title: "Service Catalog & Provisioning",
    body: "Provision approved resources without consoles — AWS live (EC2/S3/RDS/VPC/EFS), with Azure and GCP catalog items and Whale AI sizing.",
    tags: ["Provisioning", "Catalog", "AWS", "Whale AI"],
    icon: "PackagePlus",
  },
  {
    slug: "api-reference",
    title: "REST API Reference",
    body: "REST API documentation covering authentication, resource endpoints and webhooks for the platform.",
    tags: ["API", "REST", "Webhooks"],
    icon: "ScrollText",
  },
];

export const docQuickLinks = [
  "Release notes",
  "Status page",
  "API reference",
  "SDKs & CLI",
  "Security & compliance",
  "Support",
];

// ─── Full doc pages ───────────────────────────────────────────────────────────

export const docPages: DocPageDef[] = [
  // ── 1. Introduction ──────────────────────────────────────────────────────────
  {
    slug: "introduction",
    title: "Introduction to BlueWhale Stack",
    description:
      "Platform overview, architecture, and key concepts for cloud architects and IT teams getting started.",
    tags: ["Overview", "Architecture", "Getting Started"],
    icon: "Cloud",
    readTime: "8 min read",
    next: { slug: "quick-start", title: "Quick Start — SaaS" },
    sections: [
      {
        id: "what-is-bluewhale",
        heading: "What is BlueWhale Stack?",
        blocks: [
          {
            type: "p",
            text: "BlueWhale Stack is a hyperscaler-neutral cloud management platform (CMP) — a single control plane for unified inventory, AI-native provisioning, bundled observability, cloud migration, and governance across public cloud, on-premises, and hybrid environments.",
          },
          {
            type: "p",
            text: "Where most organisations run five or more separate tools — a CMP, a monitoring platform, an ITSM suite, per-cloud provisioning consoles, and hand-written Terraform — BlueWhale Stack consolidates them into one platform, in one UI, with one audit trail.",
          },
          {
            type: "grid",
            items: [
              {
                icon: "Eye",
                title: "See everything",
                body: "A live, unified map of every asset across six public clouds plus on-prem and hybrid.",
              },
              {
                icon: "PackagePlus",
                title: "Provision without consoles",
                body: "Governed self-service provisioning with Whale AI sizing — no per-cloud console access needed.",
              },
              {
                icon: "Activity",
                title: "Observe, bundled",
                body: "Logs, metrics, traces and SLOs with burn-rate alerts — no separate Datadog contract.",
              },
              {
                icon: "Sparkles",
                title: "AI-native by design",
                body: "Whale AI (powered by Anthropic Claude) spans every module with 40+ use cases — not bolted on.",
              },
            ],
          },
        ],
      },
      {
        id: "key-concepts",
        heading: "Key concepts",
        blocks: [
          {
            type: "h3",
            text: "Control Plane",
          },
          {
            type: "p",
            text: "The control plane is the central layer that reads and acts on every connected environment. It stores a normalised model of all assets, enforces access policies, routes provisioning requests, and holds the full audit trail. It never stores cloud credentials directly — connector tokens are encrypted at rest and scoped to the minimum required permissions.",
          },
          {
            type: "h3",
            text: "Modules",
          },
          {
            type: "p",
            text: "The platform is composed of 11 modules grouped across five areas: Foundation (Inventory, Cloud Connectors, Identity, Service Catalog), Operations (ITSM, Observe, FinOps, Migration Engine), Builder (WhaleForge IaC, Landing Zone Builder), and Intelligence (Whale AI). Modules are gated by edition — see the Editions page for the capability matrix.",
          },
          {
            type: "h3",
            text: "Connectors",
          },
          {
            type: "p",
            text: "Connectors link cloud accounts and on-premises environments to the control plane. Each connector uses a least-privilege read (and optionally write) role. For public clouds the connection is direct over HTTPS. For on-premises environments the Edge Agent — installed inside the network — connects outbound-only over HTTPS, so no inbound firewall changes are required.",
          },
          {
            type: "h3",
            text: "Edge Agent",
          },
          {
            type: "p",
            text: "A lightweight agent deployed inside your data centre or private cloud (VMware, Nutanix, Hyper-V). It polls the BlueWhale control plane over outbound HTTPS, executes lifecycle actions locally, and proxies telemetry. Credentials never leave the on-premises network.",
          },
          {
            type: "h3",
            text: "Whale AI",
          },
          {
            type: "p",
            text: "The AI layer powered by Anthropic Claude. It is horizontal — it runs across every module with 40+ use cases. Three tiers: Spark (fast, entry-level — inventory Q&A, sizing), Tide (deep reasoning — migration planning, IaC drafting), Abyss (multi-step agents for complex cross-module workflows). Sovereign deployments use in-region LLMs only with no call-home.",
          },
        ],
      },
      {
        id: "platform-architecture",
        heading: "Platform architecture",
        blocks: [
          {
            type: "p",
            text: "The platform is a multi-layer architecture: a data ingestion layer (connectors + Edge Agent), a normalisation and storage layer (asset graph, audit log), the AI inference layer (Whale AI), and a presentation layer (web UI + REST API + webhooks).",
          },
          {
            type: "callout",
            variant: "note",
            text: "The control plane itself can be hosted as SaaS (multi-tenant, Singapore), BYOC (deployed inside your own AWS / Azure / GCP account), or fully air-gapped Sovereign (on-premises, no call-home, in-region AI models).",
          },
          {
            type: "list",
            items: [
              "Connector layer — polling adapters for 6 public clouds + Edge Agent for on-prem",
              "Asset graph — normalised resource model across all environments, updated on each poll cycle",
              "Policy engine — RBAC, approval workflows, governance guardrails",
              "AI inference — Whale AI Spark / Tide / Abyss, with prompt caching and inline drawers",
              "REST API + webhooks — all platform operations are API-first",
              "Web UI — single unified interface across all modules",
            ],
          },
        ],
      },
      {
        id: "deployment-models",
        heading: "Deployment models",
        blocks: [
          {
            type: "grid",
            items: [
              {
                icon: "Cloud",
                title: "SaaS",
                body: "Fully managed, multi-tenant from Singapore. Fastest time-to-value — no infrastructure overhead. Available on Standard and Enterprise editions.",
              },
              {
                icon: "Server",
                title: "BYOC",
                body: "Bring Your Own Cloud — the control plane runs inside your AWS, Azure, or GCP account. You own the infrastructure; BlueWhale manages the software.",
              },
              {
                icon: "ShieldCheck",
                title: "Sovereign",
                body: "Air-gapped, on-premises deployment with in-region AI models and no call-home. Built for governments, defence, and regulated public sector.",
              },
              {
                icon: "Building2",
                title: "On-premise",
                body: "Full installation in your data centre, with dedicated support, custom SLAs, and full infrastructure control.",
              },
            ],
          },
        ],
      },
      {
        id: "core-modules",
        heading: "Core modules at a glance",
        blocks: [
          {
            type: "list",
            items: [
              "Inventory & Discovery — live asset map across 6 public clouds + on-prem",
              "Cloud Connectors — GA for AWS, Azure, GCP, Oracle, IBM, Alibaba",
              "Identity & Access — federate 9+ IdPs with auto-provisioning",
              "Service Catalog — governed provisioning, AWS live (EC2/S3/RDS/VPC/EFS)",
              "ITSM — cloud-ops-native incident, change & problem management",
              "Observe — production APM (logs, metrics, traces, SLOs) bundled",
              "FinOps — cost visibility, anomaly detection, chargeback (Whale AI use-cases live)",
              "Migration Engine — 6R assessment & wave planning (assessment live)",
              "WhaleForge IaC — YAML DSL → Terraform HCL, live diagrams (Beta)",
              "Landing Zone Builder — visual designer for AWS Control Tower / Azure CLZ (Beta)",
              "Whale AI — horizontal AI layer, 40+ use cases (Spark · Tide · Abyss)",
            ],
          },
          {
            type: "callout",
            variant: "tip",
            text: "Module availability is gated by edition. Community includes Inventory only. Standard adds the full Foundation set plus ITSM and Whale AI Spark. Enterprise unlocks all modules.",
          },
        ],
      },
      {
        id: "next-steps",
        heading: "Next steps",
        blocks: [
          {
            type: "p",
            text: "Ready to connect your first cloud account? Follow the Quick Start guide to spin up your BlueWhale Stack SaaS environment and run your first discovery in minutes.",
          },
          {
            type: "list",
            items: [
              "Quick Start — SaaS: connect your first account and run a discovery",
              "Cloud Integration: detailed setup for AWS, Azure, GCP and on-prem",
              "Identity & Access: federate your IdP and configure RBAC",
              "Service Catalog: enable governed provisioning for your teams",
            ],
          },
        ],
      },
    ],
  },

  // ── 2. Quick Start — SaaS ────────────────────────────────────────────────────
  {
    slug: "quick-start",
    title: "Quick Start — SaaS",
    description:
      "Connect your first cloud account and run your first discovery to see a unified inventory of your estate.",
    tags: ["SaaS", "Setup", "AWS", "Azure", "GCP"],
    icon: "Zap",
    readTime: "10 min read",
    prev: { slug: "introduction", title: "Introduction to BlueWhale Stack" },
    next: {
      slug: "cloud-integration",
      title: "Cloud Account & On-Prem Integration",
    },
    sections: [
      {
        id: "before-you-begin",
        heading: "Before you begin",
        blocks: [
          {
            type: "p",
            text: "This guide walks you through your first BlueWhale Stack SaaS session: logging in, connecting an AWS account, running a discovery, and reading the unified inventory. The whole process takes under 15 minutes.",
          },
          {
            type: "callout",
            variant: "note",
            text: "This guide uses AWS as the example cloud account. The steps for Azure and GCP are analogous — see Cloud Account & On-Prem Integration for provider-specific details.",
          },
          {
            type: "h3",
            text: "What you'll need",
          },
          {
            type: "list",
            items: [
              "A BlueWhale Stack account (contact sales or use your invite link)",
              "AWS account with permission to create IAM roles",
              "AWS account ID (12-digit number found in the AWS console header)",
            ],
          },
        ],
      },
      {
        id: "step-1-log-in",
        heading: "Step 1 — Log in and complete setup",
        blocks: [
          {
            type: "p",
            text: "Open your invite email and click the activation link. You will be prompted to set a password and choose your organisation name. If your organisation uses SSO (Entra ID, Okta, etc.), your administrator will have pre-configured federation — just click Continue with SSO.",
          },
          {
            type: "callout",
            variant: "tip",
            text: "If you're the first user in your organisation, you are automatically granted the Owner role, which has unrestricted access across all modules.",
          },
          {
            type: "p",
            text: "After logging in you land on the Dashboard. The left navigation panel lists all modules available in your edition. The top bar shows your organisation, active region, and Whale AI token balance.",
          },
        ],
      },
      {
        id: "step-2-connect-aws",
        heading: "Step 2 — Connect your AWS account",
        blocks: [
          {
            type: "p",
            text: "Navigate to Settings → Cloud Connectors → Add connector → AWS. BlueWhale Stack uses an IAM cross-account role (not your root credentials). This keeps credentials scoped to the minimum required permissions and makes them easy to rotate or revoke.",
          },
          {
            type: "steps",
            items: [
              {
                title: "Note your external ID",
                body: "The connector setup screen shows a unique External ID for your organisation. Copy it — you'll need it when creating the IAM role.",
              },
              {
                title: "Create the IAM role in AWS",
                body: "In the AWS console, go to IAM → Roles → Create role → AWS account → Another AWS account. Enter the BlueWhale Stack AWS account ID shown on screen, check Require external ID, and paste the External ID you copied.",
                code: `# Or use the AWS CLI:
aws iam create-role \\
  --role-name BlueWhaleStackReadRole \\
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::BLUEWHALE_ACCOUNT:root" },
      "Action": "sts:AssumeRole",
      "Condition": { "StringEquals": { "sts:ExternalId": "YOUR_EXTERNAL_ID" } }
    }]
  }'`,
              },
              {
                title: "Attach the read policy",
                body: "Attach the AWS-managed ReadOnlyAccess policy for read-only discovery. For provisioning (Service Catalog), attach the additional BlueWhaleProvisioningPolicy — the JSON for this is shown on the connector setup screen.",
                code: `aws iam attach-role-policy \\
  --role-name BlueWhaleStackReadRole \\
  --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess`,
              },
              {
                title: "Enter the role ARN in BlueWhale Stack",
                body: "Copy the Role ARN from the IAM console (format: arn:aws:iam::123456789012:role/BlueWhaleStackReadRole) and paste it into the BlueWhale Stack connector form. Click Save & test.",
              },
            ],
          },
          {
            type: "callout",
            variant: "note",
            text: "Connector credentials are encrypted at rest using AES-256 and are never exposed in logs, audit events, or the UI after initial setup.",
          },
        ],
      },
      {
        id: "step-3-run-discovery",
        heading: "Step 3 — Run your first discovery",
        blocks: [
          {
            type: "p",
            text: "Once the connector test passes (a green tick appears), click Run discovery. BlueWhale Stack will poll every enabled region across your AWS account and populate the asset graph. Discovery time depends on account size — a typical AWS account with 500 resources completes in under 90 seconds.",
          },
          {
            type: "p",
            text: "You can watch progress in real time: the connector card shows a spinner and a live count of resources found. Discovery runs automatically every 15 minutes after the initial run — you can also trigger it manually at any time.",
          },
          {
            type: "callout",
            variant: "tip",
            text: "Need to limit discovery to specific regions? In the connector settings, uncheck any regions you don't need. This reduces discovery time and noise in the inventory.",
          },
        ],
      },
      {
        id: "step-4-explore-inventory",
        heading: "Step 4 — Explore your inventory",
        blocks: [
          {
            type: "p",
            text: "Navigate to Inventory in the left menu. You will see every discovered resource — EC2 instances, S3 buckets, RDS clusters, VPCs, Lambda functions, EKS clusters, and more — normalised into a consistent model regardless of cloud provider.",
          },
          {
            type: "list",
            items: [
              "Filter by resource type, region, status, or tag",
              "Group by workload to see resources that belong together",
              "Click any resource to see live metadata, tags, and available actions",
              "Export the full inventory as PDF, Excel, or CSV",
            ],
          },
          {
            type: "h3",
            text: "Try Whale AI",
          },
          {
            type: "p",
            text: "Open the Whale AI drawer (the sparkle icon in the top-right) and ask a natural-language question about your inventory: “Which EC2 instances are running in us-east-1 without a backup policy?” or “What is my total storage footprint across S3?” Whale AI Spark answers from your live asset graph.",
          },
        ],
      },
      {
        id: "whats-next",
        heading: "What's next",
        blocks: [
          {
            type: "list",
            items: [
              "Connect additional cloud accounts (Azure, GCP, Oracle, IBM, Alibaba)",
              "Add on-premises environments via the Edge Agent",
              "Set up identity federation so your team can log in with their existing IdP",
              "Enable the Service Catalog so teams can self-serve resource provisioning",
              "Configure Observe for logs, metrics, and SLO alerting",
            ],
          },
        ],
      },
    ],
  },

  // ── 3. Cloud Account & On-Prem Integration ───────────────────────────────────
  {
    slug: "cloud-integration",
    title: "Cloud Account & On-Prem Integration",
    description:
      "Connect AWS, Azure, GCP, Oracle, IBM and Alibaba accounts, plus on-prem environments via the Edge Agent.",
    tags: ["AWS", "Azure", "GCP", "Oracle", "Edge Agent", "On-Prem"],
    icon: "Plug",
    readTime: "12 min read",
    prev: { slug: "quick-start", title: "Quick Start — SaaS" },
    next: { slug: "identity-access", title: "Identity & Access" },
    sections: [
      {
        id: "how-connectors-work",
        heading: "How connectors work",
        blocks: [
          {
            type: "p",
            text: "Every connector uses a polling model: BlueWhale Stack calls cloud provider APIs on a configurable interval (default: 15 minutes) to refresh the asset graph. For on-premises environments the Edge Agent reverses this: the agent polls the BlueWhale control plane, which queues commands for the agent to execute locally.",
          },
          {
            type: "callout",
            variant: "note",
            text: "All connector communication is outbound-only over HTTPS (TLS 1.2+). No inbound firewall rules are required — not even for on-prem Edge Agent deployments.",
          },
          {
            type: "list",
            items: [
              "Connector credentials are encrypted at rest (AES-256) and scoped to least privilege",
              "Each connector has an independent health status visible in Settings → Cloud Connectors",
              "Failed polls are retried with exponential back-off and surfaced as connector health warnings",
              "You can trigger a manual discovery at any time from the connector card",
            ],
          },
        ],
      },
      {
        id: "connect-aws",
        heading: "Connect AWS",
        blocks: [
          {
            type: "p",
            text: "BlueWhale Stack connects to AWS using a cross-account IAM role with an external ID. This is the most secure pattern: no long-lived access keys are stored, and the trust relationship can be revoked from your AWS account at any time.",
          },
          {
            type: "steps",
            items: [
              {
                title: "Add an AWS connector",
                body: "Settings → Cloud Connectors → Add connector → AWS. Note the BlueWhale AWS Account ID and your unique External ID shown on screen.",
              },
              {
                title: "Create an IAM role",
                body: "In AWS IAM, create a role with trust to the BlueWhale account ID, requiring the External ID. Attach ReadOnlyAccess for discovery. For provisioning, also attach the BlueWhaleProvisioningPolicy (JSON provided on screen).",
                code: `# Trust policy
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "AWS": "arn:aws:iam::<BWS_ACCOUNT_ID>:root" },
    "Action": "sts:AssumeRole",
    "Condition": {
      "StringEquals": { "sts:ExternalId": "<YOUR_EXTERNAL_ID>" }
    }
  }]
}`,
              },
              {
                title: "Enter the role ARN and save",
                body: "Paste the role ARN (arn:aws:iam::123456789012:role/...) into the connector form and click Save & test. A successful test runs a lightweight DescribeRegions call.",
              },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            text: "To connect multiple AWS accounts (e.g., member accounts in an AWS Organization), repeat the role creation in each account. You can add up to 100 accounts on Enterprise edition.",
          },
        ],
      },
      {
        id: "connect-azure",
        heading: "Connect Azure",
        blocks: [
          {
            type: "p",
            text: "Azure connections use an Entra ID (Azure AD) service principal with the Reader role at the subscription scope. No management-plane write access is required for discovery.",
          },
          {
            type: "steps",
            items: [
              {
                title: "Register an app in Entra ID",
                body: "Go to Azure portal → Entra ID → App registrations → New registration. Name it BlueWhaleStack and note the Application (client) ID and Directory (tenant) ID.",
              },
              {
                title: "Create a client secret",
                body: "Under Certificates & secrets → New client secret. Copy the secret value immediately — it is shown only once.",
              },
              {
                title: "Assign the Reader role",
                body: "Go to your Subscription → Access control (IAM) → Add role assignment → Reader. Assign it to the app registration you just created.",
                code: `# Azure CLI equivalent:
az ad sp create-for-rbac \\
  --name BlueWhaleStack \\
  --role Reader \\
  --scopes /subscriptions/<SUBSCRIPTION_ID>`,
              },
              {
                title: "Enter credentials in BlueWhale Stack",
                body: "Add an Azure connector and enter the Tenant ID, Client ID, Client Secret, and Subscription ID.",
              },
            ],
          },
        ],
      },
      {
        id: "connect-gcp",
        heading: "Connect GCP",
        blocks: [
          {
            type: "p",
            text: "GCP connections use a service account with the Viewer role (or a custom least-privilege role) bound to the target project or folder.",
          },
          {
            type: "steps",
            items: [
              {
                title: "Create a service account",
                body: "GCP Console → IAM & Admin → Service Accounts → Create. Name it bluewhale-stack-reader.",
                code: `gcloud iam service-accounts create bluewhale-stack-reader \\
  --display-name="BlueWhale Stack Reader"`,
              },
              {
                title: "Grant the Viewer role",
                body: "Bind the Viewer role to the service account at the project level. For organisation-wide discovery, bind at the organisation level.",
                code: `gcloud projects add-iam-policy-binding <PROJECT_ID> \\
  --member="serviceAccount:bluewhale-stack-reader@<PROJECT_ID>.iam.gserviceaccount.com" \\
  --role="roles/viewer"`,
              },
              {
                title: "Create and download a key",
                body: "Under the service account → Keys → Add key → Create new key → JSON. The downloaded JSON file is what you upload to the connector form in BlueWhale Stack.",
              },
            ],
          },
        ],
      },
      {
        id: "connect-oracle-ibm-alibaba",
        heading: "Connect Oracle, IBM & Alibaba",
        blocks: [
          {
            type: "p",
            text: "Oracle Cloud Infrastructure (OCI), IBM Cloud, and Alibaba Cloud connectors follow a similar pattern: create a service identity or API key with read-only access, then provide the credentials and tenancy/account identifiers in the connector form.",
          },
          {
            type: "callout",
            variant: "note",
            text: "Huawei Cloud connector is currently on the roadmap. Contact your account team for the latest connector roadmap.",
          },
          {
            type: "list",
            items: [
              "OCI: requires an OCI API signing key + tenancy OCID + user OCID + fingerprint",
              "IBM: requires an IBM Cloud API key scoped to the target resource groups",
              "Alibaba: requires an AccessKey ID and AccessKey Secret with ReadOnlyAccess policy",
            ],
          },
        ],
      },
      {
        id: "edge-agent",
        heading: "On-premises: Edge Agent setup",
        blocks: [
          {
            type: "p",
            text: "The Edge Agent enables BlueWhale Stack to discover and manage VMware vSphere, Nutanix AHV, and Microsoft Hyper-V environments — and any other on-premises workloads — without opening inbound firewall ports.",
          },
          {
            type: "steps",
            items: [
              {
                title: "Download the Edge Agent",
                body: "From Settings → Cloud Connectors → Add connector → On-Premises, download the Edge Agent installer for your target OS (Linux x86_64 / ARM64 or Windows Server).",
              },
              {
                title: "Generate a registration token",
                body: "Click Generate token on the connector screen. The token is valid for 24 hours and ties the agent to your BlueWhale Stack organisation.",
              },
              {
                title: "Install and register",
                body: "Run the installer on a VM inside your network. The agent requires outbound HTTPS (port 443) to the BlueWhale control plane endpoint.",
                code: `# Linux install + register
chmod +x bws-edge-agent-linux-amd64
sudo ./bws-edge-agent-linux-amd64 install \\
  --token <REGISTRATION_TOKEN> \\
  --endpoint https://app.bluewhalestack.com`,
              },
              {
                title: "Configure hypervisor credentials",
                body: "After registration, add your hypervisor endpoint (vCenter URL, Nutanix Prism URL, or Hyper-V host) and credentials via the Edge Agent configuration page in BlueWhale Stack. Credentials are stored locally — they never leave your network.",
              },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            text: "Deploy one Edge Agent per data centre or security zone. A single agent can connect to multiple hypervisors in the same network segment.",
          },
        ],
      },
      {
        id: "connector-health",
        heading: "Checking connector health",
        blocks: [
          {
            type: "p",
            text: "All connectors report their health in Settings → Cloud Connectors. Each card shows last poll time, resource count, and status (Connected / Warning / Error). Expand a connector card for detailed error messages and the last successful poll timestamp.",
          },
          {
            type: "list",
            items: [
              "Connected — last poll succeeded, asset graph is fresh",
              "Warning — last poll succeeded but some regions returned partial results",
              "Error — last poll failed; the error message shows the root cause (e.g., permission denied, expired token)",
              "Stale — discovery has not run in over 30 minutes (check agent connectivity for on-prem)",
            ],
          },
        ],
      },
    ],
  },

  // ── 4. Identity & Access ─────────────────────────────────────────────────────
  {
    slug: "identity-access",
    title: "Identity & Access",
    description:
      "Federate 9+ identity providers with auto-provisioning and configure role-based access across your cloud estate.",
    tags: ["Identity", "SSO", "RBAC", "Entra ID", "Okta", "Provisioning"],
    icon: "ShieldCheck",
    readTime: "10 min read",
    prev: { slug: "cloud-integration", title: "Cloud Account & On-Prem Integration" },
    next: { slug: "service-catalog", title: "Service Catalog & Provisioning" },
    sections: [
      {
        id: "overview",
        heading: "Overview",
        blocks: [
          {
            type: "p",
            text: "BlueWhale Stack's Identity & Access module federates your existing identity provider (IdP) via SAML 2.0 or OIDC, eliminating the need for local accounts. Users log in with their existing corporate credentials, and their platform roles are automatically provisioned and de-provisioned based on IdP group membership.",
          },
          {
            type: "grid",
            items: [
              {
                icon: "KeyRound",
                title: "SSO with 9+ IdPs",
                body: "Entra ID, Okta, Auth0, AWS Identity Center, Google IAM, OneLogin, on-prem AD, IBM IAM, Alibaba IAM, and Oracle IAM.",
              },
              {
                icon: "UserCheck",
                title: "Auto-provisioning",
                body: "SCIM 2.0 provisioning syncs user accounts and group memberships automatically when users join or leave your IdP.",
              },
              {
                icon: "ShieldCheck",
                title: "RBAC",
                body: "Fine-grained role-based access control with built-in roles (Owner, Admin, Editor, Viewer) and custom role definitions.",
              },
              {
                icon: "Landmark",
                title: "Cross-cloud access",
                body: "A user's BlueWhale role governs their access across every connected cloud — one policy, enforced everywhere.",
              },
            ],
          },
        ],
      },
      {
        id: "entra-id",
        heading: "Microsoft Entra ID (Azure AD)",
        blocks: [
          {
            type: "p",
            text: "Federation with Entra ID uses SAML 2.0. Users are authenticated by Entra and their group memberships are used to assign BlueWhale roles.",
          },
          {
            type: "steps",
            items: [
              {
                title: "Create an Enterprise Application",
                body: "In the Azure portal, go to Entra ID → Enterprise applications → New application → Create your own application. Name it BlueWhale Stack and select Integrate any other application you don't find in the gallery.",
              },
              {
                title: "Configure SAML",
                body: "Under Single sign-on → SAML, enter the Identifier (Entity ID) and Reply URL (ACS URL) shown in BlueWhale Stack → Settings → Identity → Add IdP → Entra ID.",
                code: `# Values to copy from BlueWhale Stack:
Identifier (Entity ID): https://app.bluewhalestack.com/saml/<ORG_ID>
Reply URL (ACS):        https://app.bluewhalestack.com/saml/<ORG_ID>/acs`,
              },
              {
                title: "Map group claims",
                body: "Under Attributes & Claims, add a group claim that sends the Entra group names (or Object IDs). In BlueWhale Stack, map each group to a platform role (Owner, Admin, Editor, or Viewer).",
              },
              {
                title: "Download the SAML metadata",
                body: "Download the Federation Metadata XML from the SAML Signing Certificate section and upload it to BlueWhale Stack to complete the setup.",
              },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            text: "Enable SCIM provisioning as well (under Provisioning → Automatic) to keep user accounts in sync automatically when people join or leave groups in Entra ID.",
          },
        ],
      },
      {
        id: "okta",
        heading: "Okta",
        blocks: [
          {
            type: "p",
            text: "Okta federation uses OIDC (preferred) or SAML 2.0. OIDC is recommended as it enables token refresh without re-authentication.",
          },
          {
            type: "steps",
            items: [
              {
                title: "Create an Okta application",
                body: "In the Okta Admin Console, go to Applications → Create App Integration → OIDC - Web Application.",
              },
              {
                title: "Set the redirect URI",
                body: "Add the BlueWhale Stack callback URL as the Sign-in redirect URI.",
                code: `Sign-in redirect URI:
https://app.bluewhalestack.com/auth/callback/okta`,
              },
              {
                title: "Copy OIDC credentials",
                body: "Note the Client ID and Client Secret. In Okta → Security → API → Authorisation Servers, note your Issuer URL (e.g., https://your-org.okta.com).",
              },
              {
                title: "Enter in BlueWhale Stack",
                body: "In Settings → Identity → Add IdP → Okta, enter the Issuer URL, Client ID, and Client Secret. Map Okta groups to BlueWhale roles.",
              },
            ],
          },
        ],
      },
      {
        id: "aws-identity-center",
        heading: "AWS Identity Center",
        blocks: [
          {
            type: "p",
            text: "AWS Identity Center (formerly AWS SSO) can act as a SAML identity provider for BlueWhale Stack. This is useful when your organisation already uses AWS Identity Center to manage access across AWS accounts.",
          },
          {
            type: "steps",
            items: [
              {
                title: "Add a custom SAML 2.0 application",
                body: "In AWS Identity Center → Applications → Add application → Add custom SAML 2.0 application.",
              },
              {
                title: "Configure SAML metadata",
                body: "Under Application metadata, enter the ACS URL and Entity ID from BlueWhale Stack → Settings → Identity → AWS Identity Center.",
              },
              {
                title: "Assign groups",
                body: "Under Assign users and groups, add the Identity Center groups that should have access to BlueWhale Stack.",
              },
              {
                title: "Map attribute claims",
                body: "Add an attribute mapping for groups: map the Identity Center memberOf attribute to the BlueWhale groups claim. Download the SAML metadata and upload to BlueWhale Stack.",
              },
            ],
          },
        ],
      },
      {
        id: "rbac",
        heading: "Role-based access control",
        blocks: [
          {
            type: "p",
            text: "BlueWhale Stack ships with four built-in roles that cover most teams. Custom roles are available on Enterprise edition.",
          },
          {
            type: "list",
            items: [
              "Owner — full platform access including billing, connectors, and user management",
              "Admin — all module access except billing and connector credential management",
              "Editor — can view and act on resources, raise ITSM tickets, and use Whale AI; cannot change settings",
              "Viewer — read-only access across all modules; cannot take lifecycle actions",
            ],
          },
          {
            type: "callout",
            variant: "note",
            text: "Roles are enforced at the API layer — the UI reflects the same permissions. A Viewer user cannot trigger any write operation via the REST API either.",
          },
          {
            type: "p",
            text: "On Enterprise edition, custom roles can be created with granular module-level permissions. For example, you can create a FinOps Analyst role that can read cost data and run reports but cannot take any lifecycle actions.",
          },
        ],
      },
      {
        id: "auto-provisioning",
        heading: "Auto-provisioning with SCIM 2.0",
        blocks: [
          {
            type: "p",
            text: "Enable SCIM 2.0 to keep your BlueWhale Stack user base in sync with your IdP automatically. When a user is added to an IdP group mapped to a BlueWhale role, their account is provisioned immediately. When they are removed, their access is revoked — no manual intervention needed.",
          },
          {
            type: "steps",
            items: [
              {
                title: "Generate a SCIM token",
                body: "Settings → Identity → SCIM provisioning → Generate token. Copy the token — it will not be shown again.",
              },
              {
                title: "Configure SCIM in your IdP",
                body: "In your IdP's provisioning settings, enter the BlueWhale SCIM base URL and the token you generated.",
                code: `SCIM base URL: https://app.bluewhalestack.com/scim/v2/<ORG_ID>
Token:         <GENERATED_TOKEN>`,
              },
              {
                title: "Map IdP groups to BlueWhale roles",
                body: "In BlueWhale Stack, map each IdP group (by group name or ID) to one of the four platform roles. Users in multiple groups are granted the highest applicable role.",
              },
            ],
          },
        ],
      },
    ],
  },

  // ── 5. Service Catalog & Provisioning ───────────────────────────────────────
  {
    slug: "service-catalog",
    title: "Service Catalog & Provisioning",
    description:
      "Provision approved cloud resources without consoles — with governance guardrails and Whale AI sizing built in.",
    tags: ["Provisioning", "Catalog", "AWS", "Governance", "Whale AI"],
    icon: "PackagePlus",
    readTime: "9 min read",
    prev: { slug: "identity-access", title: "Identity & Access" },
    next: { slug: "api-reference", title: "REST API Reference" },
    sections: [
      {
        id: "what-is-service-catalog",
        heading: "What is the Service Catalog?",
        blocks: [
          {
            type: "p",
            text: "The Service Catalog gives engineering and operations teams a governed self-service portal for cloud resources. Instead of granting developers direct access to cloud consoles, you define approved resources (compute, storage, databases, networking) with pre-set guardrails, and teams request them through BlueWhale Stack.",
          },
          {
            type: "p",
            text: "This eliminates console sprawl, enforces tagging and sizing policies, and gives your cloud platform team a complete audit trail of every provisioned resource — without being a bottleneck.",
          },
          {
            type: "grid",
            items: [
              {
                icon: "PackagePlus",
                title: "Self-service for teams",
                body: "Developers request resources via a simple form — no console access, no IAM keys, no Terraform knowledge required.",
              },
              {
                icon: "ShieldCheck",
                title: "Governance built in",
                body: "Tagging policies, size limits, approval workflows, and budget guardrails are enforced at the catalog level.",
              },
              {
                icon: "Sparkles",
                title: "Whale AI sizing",
                body: "Whale AI Spark recommends the right instance type and size based on the described workload — reducing over-provisioning from day one.",
              },
              {
                icon: "FileSearch",
                title: "Full audit trail",
                body: "Every provisioning request, approval, and lifecycle action is logged in the platform audit trail.",
              },
            ],
          },
        ],
      },
      {
        id: "aws-resources",
        heading: "Available AWS resources",
        blocks: [
          {
            type: "p",
            text: "AWS provisioning is generally available (GA). The following resource types can be provisioned directly from the catalog:",
          },
          {
            type: "list",
            items: [
              "EC2 — virtual machines (instance type, AMI, VPC, subnet, security groups, key pair)",
              "S3 — storage buckets (region, access control, versioning, encryption, lifecycle policy)",
              "RDS — managed databases (engine, version, instance class, storage, multi-AZ, parameter group)",
              "VPC — virtual private clouds (CIDR, subnets, route tables, internet gateway, NAT gateway)",
              "EFS — managed NFS file systems (throughput mode, lifecycle, encryption, access points)",
            ],
          },
          {
            type: "callout",
            variant: "note",
            text: "Azure and GCP catalog items are on the roadmap. Contact your account team for the current availability timeline.",
          },
        ],
      },
      {
        id: "request-a-resource",
        heading: "Request a resource",
        blocks: [
          {
            type: "steps",
            items: [
              {
                title: "Open the catalog",
                body: "Navigate to Service Catalog in the left menu. Browse resource types by category or search by name.",
              },
              {
                title: "Select a resource type",
                body: "Click the resource type you need (e.g., EC2 Instance). The request form opens with a description, available options, and any platform-wide guardrails visible.",
              },
              {
                title: "Ask Whale AI for sizing advice",
                body: "Describe your workload in the Whale AI sidebar: “A Node.js API with 50 concurrent users and peak 200 rpm.” Whale AI Spark will recommend an instance type and justify the recommendation with observed workload patterns.",
              },
              {
                title: "Complete the form",
                body: "Fill in required fields: name, environment (dev/staging/prod), region, and resource-type-specific options. Tag fields marked Required must be completed — these enforce your organisation's tagging policy.",
              },
              {
                title: "Submit for approval (if required)",
                body: "Requests for production resources or above a defined cost threshold go to an approval queue. Approvers are notified by email and can approve or reject from the notification link or the BlueWhale Stack Approvals dashboard.",
              },
              {
                title: "Track provisioning",
                body: "Once approved (or immediately for auto-approved requests), provisioning begins. The request shows a live status — Queued → Provisioning → Complete. The resource appears in Inventory as soon as it is live.",
              },
            ],
          },
        ],
      },
      {
        id: "approval-workflows",
        heading: "Approval workflows",
        blocks: [
          {
            type: "p",
            text: "Approval rules are configured in Settings → Service Catalog → Approval policies. Rules can require approval based on resource type, environment, estimated monthly cost, or a combination.",
          },
          {
            type: "list",
            items: [
              "Auto-approved — provisioning starts immediately; no approval step",
              "Manager approval — the requestor's manager (as mapped in your IdP) must approve",
              "Team approval — any member of a specified team can approve",
              "Multi-level — requires approval from two separate approvers (e.g., team lead + FinOps)",
            ],
          },
          {
            type: "callout",
            variant: "tip",
            text: "Set a cost-threshold rule: all requests with an estimated monthly cost above $500 require Finance approval. Whale AI provides the cost estimate at request time using current AWS pricing.",
          },
        ],
      },
      {
        id: "governance-guardrails",
        heading: "Governance guardrails",
        blocks: [
          {
            type: "p",
            text: "Platform-level guardrails prevent catalog items from being misconfigured at provisioning time, regardless of what the requestor enters.",
          },
          {
            type: "list",
            items: [
              "Mandatory tags — any resource missing required tags is rejected before provisioning starts",
              "Instance size limits — prevent t3.nano being used in production, or p4d.24xlarge outside ML environments",
              "Region restrictions — limit provisioning to regions your organisation has approved",
              "Encryption enforcement — block S3 buckets or RDS instances without encryption at rest",
              "Budget guardrails — prevent a team from exceeding their monthly cloud budget via the catalog",
            ],
          },
        ],
      },
    ],
  },

  // ── 6. REST API Reference ────────────────────────────────────────────────────
  {
    slug: "api-reference",
    title: "REST API Reference",
    description:
      "Full REST API documentation covering authentication, core resource endpoints, webhooks, and SDKs.",
    tags: ["API", "REST", "OAuth2", "Webhooks", "SDK"],
    icon: "ScrollText",
    readTime: "15 min read",
    prev: { slug: "service-catalog", title: "Service Catalog & Provisioning" },
    sections: [
      {
        id: "base-url",
        heading: "Base URL and versioning",
        blocks: [
          {
            type: "p",
            text: "All API requests are made over HTTPS to the versioned base URL. Breaking changes are introduced in a new version; the current stable version is v1.",
          },
          {
            type: "code",
            lang: "bash",
            label: "Base URL",
            code: `https://api.bluewhalestack.com/v1`,
          },
          {
            type: "callout",
            variant: "note",
            text: "BYOC and Sovereign customers have a private API endpoint inside their deployment network. Your account team will provide the correct base URL.",
          },
          {
            type: "p",
            text: "The API version is set in the path (e.g., /v1/inventory/resources). We recommend pinning the version in your integration code rather than using a versionless alias.",
          },
        ],
      },
      {
        id: "authentication",
        heading: "Authentication",
        blocks: [
          {
            type: "p",
            text: "The API uses OAuth 2.0 client credentials flow. Create a service credential in Settings → API → Service credentials, then exchange it for a short-lived bearer token.",
          },
          {
            type: "steps",
            items: [
              {
                title: "Create a service credential",
                body: "Settings → API → Service credentials → Create credential. Give it a descriptive name and select the scopes you need (read:inventory, write:provisioning, etc.). Copy the client_id and client_secret — the secret is shown only once.",
              },
              {
                title: "Request an access token",
                body: "Exchange your credentials for a bearer token at the token endpoint. Tokens are valid for 1 hour.",
                code: `curl -X POST https://api.bluewhalestack.com/oauth/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "grant_type": "client_credentials",
    "client_id":  "<CLIENT_ID>",
    "client_secret": "<CLIENT_SECRET>",
    "scope": "read:inventory write:provisioning"
  }'

# Response
{
  "access_token": "eyJhbGciOiJSUzI1Ni...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "read:inventory write:provisioning"
}`,
              },
              {
                title: "Use the token",
                body: "Include the token in the Authorization header for every API request.",
                code: `curl https://api.bluewhalestack.com/v1/inventory/resources \\
  -H "Authorization: Bearer <ACCESS_TOKEN>"`,
              },
            ],
          },
        ],
      },
      {
        id: "rate-limits",
        heading: "Rate limits",
        blocks: [
          {
            type: "p",
            text: "Rate limits are applied per service credential and per organisation. Exceeding the limit returns a 429 Too Many Requests response with a Retry-After header.",
          },
          {
            type: "list",
            items: [
              "Standard edition: 120 requests / minute per credential",
              "Enterprise edition: 600 requests / minute per credential",
              "Enterprise Plus / Sovereign: negotiated limits",
              "Bulk read endpoints (/v1/inventory/resources with pagination) are excluded from per-minute limits and have separate daily quotas",
            ],
          },
          {
            type: "code",
            lang: "bash",
            label: "Rate limit response headers",
            code: `X-RateLimit-Limit:     120
X-RateLimit-Remaining: 87
X-RateLimit-Reset:     1718000460   # Unix timestamp when the window resets
Retry-After:           12           # Seconds to wait (only on 429)`,
          },
        ],
      },
      {
        id: "core-endpoints",
        heading: "Core endpoints",
        blocks: [
          {
            type: "h3",
            text: "Inventory",
          },
          {
            type: "code",
            lang: "bash",
            label: "List resources",
            code: `# List all resources (paginated)
GET /v1/inventory/resources
  ?provider=aws          # Filter by cloud: aws | azure | gcp | oracle | ibm | alibaba
  &type=ec2_instance     # Filter by resource type
  &region=ap-southeast-1 # Filter by region
  &page=1                # Page number (default: 1)
  &per_page=100          # Results per page (max: 500)

# Response
{
  "data": [
    {
      "id":       "res_01J9...",
      "type":     "ec2_instance",
      "provider": "aws",
      "region":   "ap-southeast-1",
      "name":     "web-prod-01",
      "status":   "running",
      "tags":     { "env": "prod", "team": "platform" },
      "metadata": { "instance_type": "t3.medium", "image_id": "ami-..." },
      "discovered_at": "2026-06-22T04:00:00Z"
    }
  ],
  "meta": { "total": 1247, "page": 1, "per_page": 100 }
}`,
          },
          {
            type: "code",
            lang: "bash",
            label: "Get a single resource",
            code: `GET /v1/inventory/resources/:id

# Response includes full metadata and available lifecycle actions
{
  "id": "res_01J9...",
  "type": "ec2_instance",
  ...
  "actions": ["start", "stop", "reboot", "terminate"]
}`,
          },
          {
            type: "h3",
            text: "Provisioning",
          },
          {
            type: "code",
            lang: "bash",
            label: "Submit a provisioning request",
            code: `POST /v1/catalog/requests
Content-Type: application/json

{
  "resource_type": "ec2_instance",
  "cloud_account_id": "acct_01J8...",
  "region": "ap-southeast-1",
  "name": "api-staging-01",
  "environment": "staging",
  "config": {
    "instance_type": "t3.medium",
    "ami_id": "ami-0df7a207adb9748c7",
    "vpc_id": "vpc-0abc...",
    "subnet_id": "subnet-0def...",
    "key_name": "my-keypair"
  },
  "tags": { "env": "staging", "team": "backend", "project": "api-v2" }
}

# Response
{
  "request_id": "req_01JA...",
  "status": "pending_approval",
  "estimated_monthly_cost_usd": 28.50
}`,
          },
          {
            type: "h3",
            text: "Events",
          },
          {
            type: "code",
            lang: "bash",
            label: "List platform events (audit log)",
            code: `GET /v1/events
  ?from=2026-06-01T00:00:00Z
  &to=2026-06-22T23:59:59Z
  &actor=user@example.com
  &resource_id=res_01J9...
  &action=resource.terminated

# Response
{
  "data": [
    {
      "id":          "evt_01JB...",
      "action":      "resource.terminated",
      "actor":       { "type": "user", "email": "ops@example.com" },
      "resource_id": "res_01J9...",
      "timestamp":   "2026-06-22T10:15:32Z",
      "metadata":    { "reason": "decommission", "ticket": "INC-4821" }
    }
  ]
}`,
          },
        ],
      },
      {
        id: "webhooks",
        heading: "Webhooks",
        blocks: [
          {
            type: "p",
            text: "Webhooks push real-time events to your endpoint as HTTP POST requests. Register webhook endpoints in Settings → API → Webhooks.",
          },
          {
            type: "list",
            items: [
              "resource.discovered — new resource found during a discovery poll",
              "resource.changed — resource state or metadata changed",
              "resource.terminated — resource deleted or terminated",
              "request.submitted — new provisioning request created",
              "request.approved — provisioning request approved",
              "request.rejected — provisioning request rejected",
              "request.completed — provisioned resource is live",
              "connector.error — a cloud connector poll failed",
            ],
          },
          {
            type: "code",
            lang: "json",
            label: "Example webhook payload",
            code: `{
  "id":        "wh_01JC...",
  "event":     "resource.discovered",
  "timestamp": "2026-06-22T04:03:11Z",
  "data": {
    "resource_id": "res_01JD...",
    "type":        "s3_bucket",
    "provider":    "aws",
    "region":      "ap-southeast-1",
    "name":        "my-new-bucket"
  },
  "signature": "sha256=abc123..."
}`,
          },
          {
            type: "callout",
            variant: "tip",
            text: "Verify the webhook signature using the shared secret shown at registration. The signature is computed as HMAC-SHA256(body, secret) and included in the X-BWS-Signature header.",
          },
        ],
      },
      {
        id: "sdks",
        heading: "SDKs and CLI",
        blocks: [
          {
            type: "p",
            text: "Official SDKs for Python and Go are in beta. A CLI is available for common automation tasks.",
          },
          {
            type: "code",
            lang: "python",
            label: "Python SDK (beta)",
            code: `pip install bluewhale-stack

from bluewhale import Client

client = Client(
    client_id="<CLIENT_ID>",
    client_secret="<CLIENT_SECRET>",
)

# List all running EC2 instances
resources = client.inventory.list(
    provider="aws",
    type="ec2_instance",
    filters={"status": "running"},
)
for r in resources:
    print(r.name, r.region, r.metadata["instance_type"])`,
          },
          {
            type: "code",
            lang: "bash",
            label: "CLI",
            code: `# Install
curl -sSL https://get.bluewhalestack.com/cli | bash

# Authenticate
bws auth login --client-id <ID> --client-secret <SECRET>

# List resources
bws inventory list --provider aws --type ec2_instance

# Submit a provisioning request from a YAML spec
bws catalog request --file request.yaml`,
          },
          {
            type: "callout",
            variant: "note",
            text: "SDK and CLI documentation is currently in preview. Request full access and the Go SDK via your account team or the contact form.",
          },
        ],
      },
      {
        id: "error-codes",
        heading: "Error codes",
        blocks: [
          {
            type: "p",
            text: "All errors return a JSON body with a code, message, and optional details array.",
          },
          {
            type: "code",
            lang: "json",
            label: "Error response shape",
            code: `{
  "error": {
    "code":    "RESOURCE_NOT_FOUND",
    "message": "The resource with ID res_01J9... was not found.",
    "details": [],
    "request_id": "req-trace-abc123"
  }
}`,
          },
          {
            type: "list",
            items: [
              "400 INVALID_REQUEST — request body is malformed or missing required fields",
              "401 UNAUTHORIZED — missing or invalid bearer token",
              "403 FORBIDDEN — token does not have the required scope for this operation",
              "404 RESOURCE_NOT_FOUND — the specified resource or entity does not exist",
              "409 CONFLICT — the request conflicts with existing state (e.g., duplicate name)",
              "422 VALIDATION_ERROR — request is syntactically valid but fails business rules",
              "429 RATE_LIMITED — too many requests; check the Retry-After header",
              "500 INTERNAL_ERROR — unexpected server error; reference the request_id when contacting support",
            ],
          },
        ],
      },
    ],
  },
];

export const docPagesBySlug = Object.fromEntries(
  docPages.map((p) => [p.slug, p]),
) as Record<string, DocPageDef>;
