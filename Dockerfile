FROM node:lts-alpine AS base

FROM base AS build

RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm build

FROM base as prod

COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist/ /app/dist

EXPOSE 4000

CMD ["node", "/app/dist/src/index.js"]
