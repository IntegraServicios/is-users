FROM node:20-bullseye as builder
WORKDIR /usr/src/is-users-ms

COPY --chown=node:node package.json ./
COPY --chown=node:node package-lock.json ./
COPY --chown=node:node . .
RUN npm run build
RUN npm cache clean --force

USER node

FROM node:20-bullseye as production
COPY --chown=node:node --from=builder /usr/src/is-users-ms/node_modules ./node_modules
COPY --chown=node:node --from=builder /usr/src/is-users-ms/dist ./dist
USER node
CMD [ "node", "dist/main.js" ]