FROM node:20.11.1
WORKDIR /user/app
COPY package.json ./
RUN npm install

COPY . .

EXPOSE 4000


CMD [ "npm", "run", "start" ]

