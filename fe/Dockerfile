FROM node:14

WORKDIR /fe

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

CMD ["yarn", "start"]
