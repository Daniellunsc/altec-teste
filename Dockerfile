FROM node:12.13.1-alpine3.10

WORKDIR /app
COPY . /app

RUN npm i --silent

EXPOSE 8080

CMD [ "node", "index.js" ]