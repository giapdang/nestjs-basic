FROM node:14.18.2-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk --no-cache add --virtual builds-deps build-base python

RUN npm install --global rimraf
RUN npm install --only=development

RUN npm install ansi-styles

COPY . .

RUN npm run build

FROM node:14.18.2-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]