# Builds the documentation site with Fumadocs (Next.js, fully static export).
FROM node:22-alpine

ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable

WORKDIR /work
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund || npm install --no-audit --no-fund

COPY . .

# Default: produce the fully static site into ./out
CMD ["npm", "run", "build"]
