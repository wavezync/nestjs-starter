FROM node:20-alpine as development

# Create app directory
WORKDIR /usr/src/app

RUN corepack enable pnpm
RUN corepack use pnpm@8


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY pnpm-lock.yaml ./


RUN pnpm i --frozen-lockfile

# Bundle app source
COPY . .

RUN pnpm build

FROM node:20-alpine as production
WORKDIR /usr/src/app

RUN corepack enable pnpm
RUN corepack use pnpm@8

COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile --production

COPY --from=development /usr/src/app/dist ./dist

CMD [ "pnpm" , "start:prod" ]
