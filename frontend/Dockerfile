FROM node:18 as build

WORKDIR /app

COPY package.json ./  

RUN npm install -g @angular/cli

RUN npm install

COPY . . 

ENTRYPOINT [ "npm", "start" ]