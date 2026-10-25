FROM node:24
WORKDIR /user/app
COPY package.json ./
RUN npm install

COPY . .

EXPOSE 4000


CMD [ "npm", "run", "start" ]

