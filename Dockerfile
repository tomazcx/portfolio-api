FROM node:lts-alpine

RUN apk add --no-cache bash
RUN npm install -g @nestjs/cli

WORKDIR /home/node/app
RUN chown -Rh node:node /home/node/app

COPY --chown=node:node package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

USER node

CMD ["yarn", "start:dev"]
