FROM node:lts-alpine

WORKDIR /home/node/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "start:dev"]

