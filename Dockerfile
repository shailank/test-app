# Image Size: 221MB
# Linux + Node + Source + Project dependencies
FROM node:current-alpine as base
WORKDIR /app
COPY package.json ./
COPY . /app
RUN npm install -g npm@8.9.0
RUN npm install --force
 
# Linux + Node + Source + Project dependencies + build assets
FROM node:current-alpine AS build
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /app ./
RUN npm run build

# We keep some artifacts from build
FROM node:current-alpine AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
RUN npm install next --force

EXPOSE 3000
CMD ["npm","run","start"]