FROM node:18-alpine AS builder

WORKDIR /user/src/app
COPY package.json package-lock.json ./
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
