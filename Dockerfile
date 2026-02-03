FROM node:20

WORKDIR /app/api

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]