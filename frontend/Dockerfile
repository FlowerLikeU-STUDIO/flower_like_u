FROM node:16-alpine

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN npm i

COPY . ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]