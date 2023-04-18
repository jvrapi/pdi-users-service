FROM node:lts as builder

WORKDIR /app

COPY . .

RUN yarn install 

RUN yarn build

RUN mv .env.production .env

RUN rm -rf node_modules && \
  NODE_ENV=production yarn install 

FROM node:lts

WORKDIR /app

COPY --from=builder /app  .

EXPOSE 3000

CMD [ "node", "dist/src/main.js" ]