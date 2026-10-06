# One image for both APIs and the migration job; docker-compose picks the command.
FROM node:24-alpine

WORKDIR /app

# The postinstall step runs `prisma generate`, so the schema must be present first.
COPY package.json package-lock.json prisma.config.ts ./
COPY prisma ./prisma
RUN npm ci

COPY . .
RUN npm run build

ENV NODE_ENV=production
CMD ["node", "dist/public-main.js"]
