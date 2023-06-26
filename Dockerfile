FROM node:20-alpine

WORKDIR /build

EXPOSE 4200
EXPOSE 9876

CMD [ "npm", "run", "start" ]
