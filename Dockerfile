FROM node:lts-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app 
RUN apk add --no-cache bash
RUN npm install -g @nestjs/cli

WORKDIR /home/node/app

COPY package.json yarn.lock ./

RUN yarn

COPY --chown=node:node . .

EXPOSE 3000

USER node

CMD ["yarn", "start:dev"]

RUN ["chmod", "+x", "/home/node/app/dist"]
