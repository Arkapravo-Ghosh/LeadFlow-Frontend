FROM node:24-bookworm-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm install --global npm@12.2.0
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

FROM base AS development
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]

FROM base AS build
ARG APP_URL=http://localhost:3000
ENV APP_URL=$APP_URL
RUN npm run build

FROM node:24-bookworm-slim AS production
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0 PORT=3000
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
CMD ["node", "server.js"]
