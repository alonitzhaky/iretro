FROM node:18.14.0-alpine

RUN apk update 

WORKDIR /iretro-store/frontend/app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]