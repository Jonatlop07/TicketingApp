FROM mhart/alpine-node:14

WORKDIR /app
COPY package.json .
RUN yarn install --only=prod
COPY . .

CMD ["yarn", "start"]