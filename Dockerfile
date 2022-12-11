FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./

ADD . .
RUN npm install
COPY . .

ENTRYPOINT ["npm", "run"]
CMD ["local"]
