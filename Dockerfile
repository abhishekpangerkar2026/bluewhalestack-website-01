# syntax=docker/dockerfile:1

# ── Stage 1: dependencies ───────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ── Stage 2: build ──────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
# Railway passes every configured service variable as a --build-arg, but a
# plain `docker build` never exposes those to `RUN` steps unless the
# Dockerfile declares them — required for any NEXT_PUBLIC_* var, since Next
# inlines those at build time (this is what `next build` reads to bake
# Cloudinary URLs into the static leadership pages; see lib/cloudinary.ts).
# Add an ARG/ENV pair here for each new NEXT_PUBLIC_* variable the app needs.
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=$NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ── Stage 3: runtime ────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run as a non-root user
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Next.js standalone output: minimal server + only required node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/certificates ./certificates
COPY --from=builder /app/partner-documents ./partner-documents
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
