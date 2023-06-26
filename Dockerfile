FROM node:20-alpine

WORKDIR /build

EXPOSE 4200 9876 49153

CMD [ "npm", "run", "start" ]
