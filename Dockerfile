FROM node:18.9.0

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

CMD ["node", "dist/app.js"]