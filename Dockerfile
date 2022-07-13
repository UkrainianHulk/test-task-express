FROM node:16

COPY . /app
WORKDIR /app

RUN npm install --omit=dev --ignore-scripts

CMD node index.js