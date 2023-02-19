FROM node:18.14.0-alpine

RUN apk update 
# RUN git clone https://github.com/alonitzhaky/iretro-store.git

WORKDIR /iretro-store/frontend/app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]