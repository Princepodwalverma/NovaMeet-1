FROM node:20-alpine
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Clear npm cache + install deps
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Copy rest of the project files
COPY . .

# Build your app
RUN npm run build

# Expose the port used by React (default 3000)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
