FROM node:alpine

#added 2 env variables to avoid issues with react app running in docker container
ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR '/app'
COPY package.json .
RUN npm install
COPY ./ ./

CMD ["npm", "start"]