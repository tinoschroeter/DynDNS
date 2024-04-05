FROM node:20 AS app

WORKDIR /app
COPY fritzBoxUpdater .

RUN npm install --production

CMD ["node", "index.js"]
