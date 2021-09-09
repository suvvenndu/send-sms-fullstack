FROM node

# Create app directory
# Make sure its there , else , npm install fails for some reason
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# we have to copy package json to run the npm install
# EVen though web pack has created the app , it still needs to run npm install to run the server.bundle.js. Need to investigate further.
COPY package*.json ./

ENV YARN_VERSION 1.15.2

ENV NODE_ENV=production

RUN npm install

COPY ./build/ ./server

EXPOSE 5000

CMD ["node", "./server/server.bundle.js"]



