# Step 1: Build React app
FROM node:18-slim AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist ./
# Nginx listens on port 80 by default
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

