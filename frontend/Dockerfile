# frontend dockerfile - multi-stage build
# stage 1: build the react app with node.js
# stage 2: serve with NGINX

# ============================================
# STAGE 1: builder - compile react application
# ============================================
FROM node:18-alpine AS builder

# alpine is a super lightweight linux (5MB vs 100MB+)
WORKDIR /app

# copy package files first (layer caching)
# if package.json doesn't change, npm install is cached
COPY package*.json ./

# install dependencies
RUN npm ci

# copy the rest of the frontend code
COPY . .

# build the production-ready react app
# this creates /app/dist with optimized HTML, CSS, JS
RUN npm run build

# ============================================
# STAGE 2: production - serve with NGINX
# ============================================
FROM nginx:alpine

# copy custom nginx configuration
# this tells NGINX how to serve your app and proxy API calls
COPY nginx.conf /etc/nginx/conf.d/default.conf

# copy the built react app from the builder stage
# --from=builder: take files from the first stage
# /app/dist: where vite puts the built files
# /usr/share/nginx/html: where NGINX serves files from
COPY --from=builder /app/dist /usr/share/nginx/html

# expose port 80 (standard HTTP port)
EXPOSE 80

# start NGINX
# daemon off: keeps NGINX in foreground (required for docker)
CMD ["nginx", "-g", "daemon off;"]
