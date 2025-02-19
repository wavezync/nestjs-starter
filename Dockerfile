FROM node:20-alpine AS base

ENV HUSKY=0
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm i -g corepack@latest
RUN corepack enable

FROM base AS build
WORKDIR /app
COPY .npmrc pnpm-lock.yaml package.json ./
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc pnpm install --frozen-lockfile
COPY . .
RUN  pnpm build

FROM base AS prod
WORKDIR /app
ENV NODE_ENV=production
COPY .npmrc pnpm-lock.yaml package.json Procfile nest-cli.json ./
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc pnpm install --frozen-lockfile --prod
COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["pnpm", "start:prod"]
