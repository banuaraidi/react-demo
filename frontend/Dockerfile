FROM node:12-alpine
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
EXPOSE 3002
CMD [ "yarn", "start" ]