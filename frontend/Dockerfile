# Step 1: Base image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package files and install deps
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Step 4: Copy rest of the code
COPY . .

# Step 5: Build React app
RUN npm run build

# Step 6: Serve with nginx
FROM nginx:stable-alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
