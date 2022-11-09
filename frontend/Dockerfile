FROM node:16-alpine

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN npm i
RUN apt-get update && apt-get install -y -q nginx && rm -rf /var/lib/apt/lists/*
COPY . ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]