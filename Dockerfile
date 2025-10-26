# Stage 1: Build Stage
FROM --platform=linux/arm64/v8 node:20-alpine AS build
# Install dependencies only when needed
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package manifests and lock file
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN pnpm run build


# Stage 2: Production Stage
FROM --platform=linux/arm64/v8 node:20-alpine AS production-stage
RUN apk update && apk upgrade && apk add dumb-init && adduser -D nextuser

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