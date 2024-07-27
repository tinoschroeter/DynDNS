FROM node:22 AS app

WORKDIR /app
COPY fritzBoxUpdater .

RUN npm install --production

CMD ["node", "index.js"]
