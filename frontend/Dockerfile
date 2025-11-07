FROM node:20-alpine
WORKDIR /app
COPY package*.json ./

# Add this line to ensure all build tools are present
RUN apk add --no-cache python3 make g++ 

RUN npm install
COPY . .
RUN npm run build
