FROM node:16

# Create app directory
WORKDIR /src

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install
RUN npm run build
# If you are building your code for production
# RUN npm ci --only=production


FROM node:16

WORKDIR /src
COPY package*.json ./
RUN npm install --production

# Bundle app source
COPY --from=builder /build ./build
COPY .env .
COPY /config ./config

EXPOSE 3001
CMD [ "node", "./build/server.js" ]