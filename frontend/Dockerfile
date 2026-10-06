# Builds one of the Angular apps (APP=public|admin) and serves it with nginx,
# which also proxies /api to the matching backend.
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG APP
RUN npx ng build ${APP}

FROM nginx:1.27-alpine
ARG APP
COPY nginx/${APP}.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/${APP}/browser /usr/share/nginx/html
