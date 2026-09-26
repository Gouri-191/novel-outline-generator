FROM node:20-alpine

WORKDIR /app

COPY package.json ./
# Since we didn't use package-lock.json here yet, we will just install
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
