FROM node:lts-alpine

RUN apk add --no-cache bash
RUN npm install -g @nestjs/cli

USER node

WORKDIR /home/node/app

EXPOSE 3000

RUN ["chmod", "755", ".docker/entrypoint.sh"]



