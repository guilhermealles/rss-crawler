FROM node:12-alpine

RUN mkdir /app

WORKDIR /app/

COPY package.json package-lock.json tsconfig.json ./
COPY src ./src

RUN npm install
RUN npm run build

EXPOSE 3000

CMD [ "node", "./build/index.js" ]

