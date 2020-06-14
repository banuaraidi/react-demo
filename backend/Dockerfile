FROM node:12-alpine

#install dependancies
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN npm install -g nodemon
RUN yarn install --production
COPY . .
EXPOSE 3000

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

#start-up command
CMD /wait && yarn start