# ========================================
# Optimized Multi-Stage Dockerfile
# NestJS Client Gateway (pnpm)
# ========================================

# ---------- Base ----------
FROM node:20-alpine AS base

# System dependencies (safe for NestJS native deps)
RUN apk add --no-cache \
  libc6-compat \
  python3 \
  make \
  g++

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /usr/src/app

# ---------- Dependencies (prod only) ----------
FROM base AS deps

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# ---------- Build dependencies (dev + prod) ----------
FROM base AS build-deps

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---------- Build ----------
FROM build-deps AS build

COPY . .
RUN pnpm run build

# ---------- Development ----------
FROM build-deps AS development

ENV NODE_ENV=development

WORKDIR /usr/src/app
COPY . .

EXPOSE 3000

# Hot reload
CMD ["sh", "-c", "pnpm start:dev"]

# ---------- Production ----------
FROM base AS production

ENV NODE_ENV=production

WORKDIR /usr/src/app

# Production deps
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Built app
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./

EXPOSE 3000

CMD ["node", "dist/main.js"]
