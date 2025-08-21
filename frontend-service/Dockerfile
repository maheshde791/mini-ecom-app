# Step 1: Build React app
FROM node:18-slim AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve with Nginx and proxy /api to backend
FROM nginx:1.25-alpine

# Copy React build files
COPY --from=build /app/dist /usr/share/nginx/html

# Replace default Nginx config with our proxy config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
