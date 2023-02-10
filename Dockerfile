FROM node:lts-alpine3.16
WORKDIR /usr/src/clean-node-api
COPY ./package.json .
RUN npm install