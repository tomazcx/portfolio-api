FROM node:lts-alpine

RUN apk add --no-cache bash
RUN npm install -g @nestjs/cli

USER node

WORKDIR /home/node/app

COPY package.json yarn.lock ./

RUN chown -Rh $user:$user .

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "start:dev"]
