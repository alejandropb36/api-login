FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 80

ENTRYPOINT [ "npm", "start" ]