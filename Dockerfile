# # Step 1: Build React App
# FROM node:alpine3.18 AS build
# WORKDIR /app
# COPY package.json .
# RUN npm install
# COPY . .
# RUN npm run build

# #Step 2: Serve with Nginx
# FROM nginx:1.23-alpine 
# WORKDIR /usr/share/nginx/html
# RUN rm -rf *
# COPY --from=build /app/build .
# EXPOSE 80
# ENTRYPOINT [ "nginx", "-g", "daemon off;"]

# --------------------------
#  Step 1: Build Vite React
# --------------------------
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build


# --------------------------
#  Step 2: Serve with Nginx
# --------------------------
FROM nginx:alpine

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy Vite build output
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
