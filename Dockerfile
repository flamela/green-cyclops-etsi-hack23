#Build
FROM node:16.13.0-alpine as node
WORKDIR /usr/src/app
ARG PATH_FRONT=.
COPY ${PATH_FRONT}/package*.json ./
RUN npm install
COPY ${PATH_FRONT} .
ARG ENV_SCRIPT=build-dev
RUN npm run $ENV_SCRIPT

#Copy the proviously built app to Nginx to be served
FROM nginx:1.20.2-alpine
COPY --from=node /usr/src/app/dist/aws_fire_detection_frontend /usr/share/nginx/html
COPY --from=node /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
