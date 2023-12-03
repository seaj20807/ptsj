FROM alpine:3.17

WORKDIR /seaj20807/ptsj

COPY public/ /react-docker-example/public
COPY src/ /react-docker-example/src
COPY package.json /react-docker-example/

RUN npm install

CMD ["npm", "start"]