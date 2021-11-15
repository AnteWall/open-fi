FROM node:16

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn postinstall

CMD ["yarn", "prisma", "migrate", "deploy", "&&", "npm", "start"]