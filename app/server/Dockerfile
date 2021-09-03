FROM node

WORKDIR /home/node/app

ENV NODE_ENV=production

COPY ./build/ ./server

EXPOSE 5000

CMD ["node", "./server/server.bundle.js"]