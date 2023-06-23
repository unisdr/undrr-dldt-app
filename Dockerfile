# Stage 1: Build the React application
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Serve the React application from an Express.js app
FROM node:14
WORKDIR /app
COPY --from=build /app/build ./build
COPY server.js ./
RUN npm install express

EXPOSE 3000
CMD [ "node", "server.js" ]