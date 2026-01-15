# Stage 1: Builder
FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install ALL dependencies (including devDependencies needed for build)
RUN npm ci

# Copy all project files
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the Next.js application without source maps
RUN npm run build && \
    rm -rf .next/cache

# Stage 2: Runner (Production) - Using Distroless for minimal size
FROM gcr.io/distroless/nodejs20-debian12 AS runner

WORKDIR /app

# Set to production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy necessary files from builder
# The standalone output already includes minimal node_modules
COPY --from=builder --chown=nonroot:nonroot /app/public ./public
COPY --from=builder --chown=nonroot:nonroot /app/.next/standalone ./
COPY --from=builder --chown=nonroot:nonroot /app/.next/static ./.next/static

# Use nonroot user (distroless default)
USER nonroot

# Expose the port Next.js runs on
EXPOSE 3000

# Start the application
CMD ["server.js"]
