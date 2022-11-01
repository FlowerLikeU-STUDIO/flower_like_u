FROM node:16-alpine as build-stage

WORKDIR /frontend

COPY ./package.json
COPY ./package-lock.json

RUN npm

COPY ./ ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

COPY --from=build-stage /var/jenkins_home/workspace/deploytest/testproject_react/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g","daemon off;"]