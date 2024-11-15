FROM node:18

WORKDIR /app

COPY package.json yarn.lock lerna.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3001 3002

CMD ["yarn", "start"]
