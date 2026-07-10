# Contact — `/contact`  🟡 stub (full build next pass)

**Purpose:** Demo booking + general contact. This is the primary conversion
endpoint linked from every CTA.

## Sections (full build)
1. Hero — "Let's talk cloud transformation."
2. **Demo request form** — first/last name, work email, company, phone, job
   title, industry, edition interest, message, consent checkbox →
   `app/api/demo` route handler (store + email sales).
3. Contact channels — email (contact@), India phone, UAE phone, sales@.
4. Offices — Bengaluru, Dubai, London, Singapore.

## Form backend (Pass 2)
Next.js route handlers in `app/api/*`: `demo`, `contact`, `newsletter`,
`careers`. Start with validation + email (Resend/SMTP); add DB on deploy.

## Open items
- Choose email provider (Resend vs SMTP/Office365) and storage at deploy time.
