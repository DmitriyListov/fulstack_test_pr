FROM node:14

COPY . /app

WORKDIR /app

RUN apt-get update && apt-get install -y netcat

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["./wait-for-connection.sh", "postgres:5432", "--", "npm", "start"]