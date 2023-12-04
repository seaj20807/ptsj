FROM alpine:3.17

WORKDIR /seaj20807/ptsj

COPY public/ /seaj20807/ptsj/public
COPY src/ /seaj20807/ptsj/src
COPY package.json /seaj20807/ptsj

RUN npm install

CMD ["npm", "start"]