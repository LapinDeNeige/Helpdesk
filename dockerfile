FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .
###
#RUN chmod +x 
###
EXPOSE 8080

CMD ["node", "app.js"] 

