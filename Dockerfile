# Estágio de construção
FROM node:18-alpine as builder

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install

COPY . .
RUN pnpm run build

# Estágio de produção
FROM node:18-alpine

WORKDIR /src/app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV production

EXPOSE 3000

CMD ["pnpm", "run", "start:prod"]