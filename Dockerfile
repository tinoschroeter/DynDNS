FROM node:24 AS app

WORKDIR /app
COPY fritzBoxUpdater .

RUN npm install --production

CMD ["node", "index.js"]
