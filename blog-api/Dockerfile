FROM node:15.12.0-alpine3.10

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install app dependencies
# COPY package*.json ./

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "start"]
