FROM node:22.13.1-bullseye
WORKDIR /app/frontend
COPY package*.json ./
RUN npm install -g npm@latest
RUN npm install -g create-react-app
RUN npm install
COPY . .

EXPOSE 3000

CMD [ "npm","start" ]
#RUN npm install -g serve
#CMD ["serve", "-s", "build", "-l", "3000"]