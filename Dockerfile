# Use the official Node.js image as the base
FROM node:22

# Set the working directory
WORKDIR /app

# Copy the entire workspace into the container
COPY . .

# Install dependencies
RUN npm install

# Build apps and shared module
RUN npm run build -w @jwt-shopping-cart/shared
RUN npm run build -w backend
RUN npm run build -w frontend

# Expose ports for client and server apps
EXPOSE 3000 3001

# Start both apps simultaneously using a custom entrypoint
CMD ["sh", "-c", "npm run start -w backend & npm run preview -w frontend"]
