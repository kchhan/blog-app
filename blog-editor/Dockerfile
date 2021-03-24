FROM node:15.12.0-alpine3.10 as builder

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build


FROM nginx:1.19.8

EXPOSE 80

COPY --from=builder /app/build /usr/share/nginx/html
