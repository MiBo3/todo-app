FROM node:14

WORKDIR /be

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

CMD ["yarn", "start"]
