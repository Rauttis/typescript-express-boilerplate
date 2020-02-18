FROM node:12.16.0-alpine as dev

RUN apk add --no-cache curl
RUN addgroup nodejs && adduser -S -G nodejs nodejs
USER nodejs
RUN mkdir ~/app
WORKDIR /home/nodejs/app
COPY --chown=nodejs:nodejs package*.json ./
RUN npm ci

HEALTHCHECK CMD curl --fail http://localhost:3000/api/health || exit 1
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM dev as build
COPY --chown=nodejs:nodejs . .
RUN npm run build

FROM build as prune
RUN npm prune --production

FROM node:12.16.0-alpine
RUN apk add --no-cache curl
RUN addgroup nodejs && adduser -S -G nodejs nodejs
USER nodejs
RUN mkdir ~/app
WORKDIR /home/nodejs/app
COPY --from=prune --chown=nodejs:nodejs /home/nodejs/app/node_modules ./node_modules
COPY --from=prune --chown=nodejs:nodejs /home/nodejs/app/dist ./dist
COPY --from=prune --chown=nodejs:nodejs /home/nodejs/app/package.json .

HEALTHCHECK CMD curl --fail http://localhost:3000/api/health || exit 1
EXPOSE 3000
CMD ["npm", "run", "start"]
