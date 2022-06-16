# Install dependencies only when needed
FROM node:16.13.1-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

COPY . .

# Production image, copy all the files and run next
FROM node:16.13.1-alpine AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=deps /app/next.config.js ./
COPY --from=deps /app/public ./public
COPY --from=deps --chown=nextjs:nodejs /app/.next ./.next
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json

USER nextjs

CMD ["node_modules/.bin/next", "start"]