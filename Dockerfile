FROM node:16-alpine as development

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --force

# Bundle app source
COPY . .

RUN npm run build

FROM node:16-alpine as production
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production --force
COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD [ "npm", "run" , "start:prod" ]
