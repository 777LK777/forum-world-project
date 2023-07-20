FROM node:18-alpine

# ARG FW_CORE_PORT
# ARG DATABASE_URL

# ENV PORT=$FW_CORE_PORT
# ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install 

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]
