FROM node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

ENV YARN_VERSION 1.15.2

ENV NODE_ENV=production

RUN npm install

COPY ./build/ ./server

EXPOSE 5000

CMD ["node", "./server/server.bundle.js"]



