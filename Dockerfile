FROM node:alpine AS builder
WORKDIR /app
COPY . .

RUN yarn install
RUN yarn build

# Production image, copy all the files and run next
FROM node:alpine
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/package.json ./package.json

RUN yarn install --production

USER nextjs

EXPOSE 3000

CMD ["yarn", "start"]