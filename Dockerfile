# This file is moved to the root directory before building the image

# Base node image
FROM node:lts-bookworm-slim as base

# Install only necessary dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends openssl ca-certificates && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Build stage
FROM base as build

WORKDIR /myapp

# Copy package files first to leverage Docker cache
COPY package*.json ./
COPY .npmrc ./
RUN npm ci

# Copy source files
COPY . .

# 0.0.0.0 Super-Patch (Ensures app is reachable on Fly.io)
RUN set -e && \
    # Find all relevant JS files in @shopify and miniflare directories and replace localhost/127.0.0.1 with 0.0.0.0
    find node_modules/@shopify node_modules/miniflare -type f -name "*.js" | xargs grep -lE 'host: "localhost"|host: "127.0.0.1"|"127.0.0.1"' | \
    xargs -r sed -i -e 's|host: "localhost"|host: "0.0.0.0"|g' -e 's|host: "127.0.0.1"|host: "0.0.0.0"|g' -e 's|"127.0.0.1"|"0.0.0.0"|g' || \
    echo "No matching files found to patch"

# Build the app
RUN npm run build

# Production stage
FROM base as production

WORKDIR /myapp

ENV NODE_ENV=production
ENV FLY="true"
ENV PORT="3000"

# Copy only necessary files from build stage
COPY --from=build /myapp/dist /myapp/dist
COPY --from=build /myapp/node_modules /myapp/node_modules
COPY --from=build /myapp/package.json /myapp/package.json
COPY --from=build /myapp/.env /myapp/.env
# Expose port and start application
EXPOSE 3000
CMD ["npm", "run", "start"]