# Fetching the latest node image on alpine linux
FROM node:alpine AS development

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /seaj20807/ptsj

# Installing dependencies
COPY ./package*.json /seaj20807/ptsj

RUN npm install

# Copying all the files in our project
COPY . .

# Starting our application
CMD ["npm","start]