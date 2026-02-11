# Stage 1: Build Stage
# Use a specific, patched Node 20 LTS Alpine version
FROM --platform=linux/arm64/v8 node:20.18.0-alpine3.20 AS build

# Add security updates at the start of the stage
RUN apk update && apk upgrade --no-cache

# Install dependencies only when needed
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm globally with specific version
RUN npm install -g pnpm@9.15.4

# Copy package manifests and lock file
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN pnpm run build


# Stage 2: Production Stage
# Use the same specific, patched Node 20 LTS Alpine version
FROM --platform=linux/arm64/v8 node:20.18.0-alpine3.20 AS production-stage

# Add security updates at the start of the stage
RUN apk update && apk upgrade --no-cache

# Add dumb-init and create non-root user
RUN apk add --no-cache dumb-init && adduser -D nextuser

WORKDIR /app

# Copy necessary files from the build stage
COPY --from=build --chown=nextuser:nextuser /app/public ./public
COPY --from=build --chown=nextuser:nextuser /app/.next/standalone ./
COPY --from=build --chown=nextuser:nextuser /app/.next/static ./.next/static

# Switch to non-root user
USER nextuser

EXPOSE 3000

ENV HOST=0.0.0.0 PORT=3000
# Run the application using dumb-init
CMD ["dumb-init", "node", "server.js"]