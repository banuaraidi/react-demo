FROM node:12-alpine as build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN npm install -g serve
RUN yarn install --production
COPY . .
RUN yarn build
# EXPOSE 3002
# CMD ["serve", "-s", "build", "-l", "3002"]

FROM nginx:stable-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/conf.d/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]