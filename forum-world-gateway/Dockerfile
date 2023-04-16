FROM node:18-alpine

ARG FW_GATEWAY_PORT
ARG FW_UI_PORT
ARG FW_CORE_ORIGIN

ENV PORT=${FW_GATEWAY_PORT}
ENV UI_PORT=${FW_UI_PORT}
ENV CORE_ORIGIN=${FW_CORE_ORIGIN}

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]