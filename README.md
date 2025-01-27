# JWT Shopping Cart

This repository contains a showcase application designed to demonstrate the concept of database-less shopping carts using JSON Web Tokens (JWT). This implementation aligns with the ideas presented in [this Medium post](https://medium.com/@aleh.zhloba/database-less-shopping-carts-jwt-not-only-for-authentication-ec316b77641b).

## Overview

The project demonstrates how JWTs can be used not only for authentication but also for securely storing and managing shopping cart data on the client side, without relying on a database. The backend is a simple Node.js application using Express, which generates and validates JWTs to handle shopping cart operations.

## Features

- Stateless shopping cart management.
- JWT-based implementation.
- Secure, lightweight, and easy to extend.

## Installation

Clone the repository:
   ```bash
   git clone https://github.com/aleh-zhloba/jwt-shopping-cart.git
   cd jwt-shopping-cart
   ```

## Running the Application

### Using Docker Compose

1. Build and run the application with Docker Compose:
   ```bash
   docker-compose up --build
   ```

### Using Node.js

1. Install dependencies:
   ```bash
   npm install 
   ```

2. Build the shared module:
   ```bash
   npm run build -w @jwt-shopping-cart/shared
   ```
   
3. Start the API server  
   ```bash
   npm run dev -w backend
   ```

4. Start the client app
   ```bash
   npm run dev -w frontend
   ```   

---

1. The client application will be available at `http://localhost:3000` by default.
2. The API server will run at `http://localhost:3001` by default.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Feel free to fork, contribute, and experiment with this repository!

