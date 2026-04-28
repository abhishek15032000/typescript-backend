# Simple Blog API

A minimal, robust REST API for a blogging platform built with **Node.js**, **TypeScript**, and **MongoDB**. This project includes user authentication, blog management (CRUD), and automatic API documentation with Swagger.

## 🚀 Features

- **Authentication**: Secure registration and login using JWT and bcrypt password hashing.
- **Blog Management**: Create, read, update, and list blogs with author associations.
- **Image Uploads**: Support for uploading blog images using Multer.
- **Graceful Shutdown**: Automatically handles database disconnection on process termination.
- **API Documentation**: Interactive API docs powered by Swagger UI.
- **Type Safety**: Fully written in TypeScript with strict type checking.

## 📋 Prerequisites

- **Node.js**: v18.0.0 or higher
- **MongoDB**: A running MongoDB instance (Local or MongoDB Atlas)
- **NPM**: Package manager (included with Node.js)

## 🛠️ Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd beginner-project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URI=your_mongodb_connection_string
   PRIVATE_KEY_JWT=your_secure_random_string_for_jwt
   ```

## ⌨️ Available Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with **nodemon** and **ts-node**. |
| `npm run build` | Compiles the TypeScript code into JavaScript in the `dist/` folder. |
| `npm start` | Runs the compiled production code from the `dist/` folder. |

## 📖 API Documentation

Once the server is running, you can access the interactive Swagger documentation at:
`http://localhost:3000/api-docs`

## 📂 Project Structure

```text
├── src
│   ├── config        # Database and Swagger configurations
│   ├── controllers   # Request handlers (logic)
│   ├── middlewares   # Authentication and other middlewares
│   ├── models        # Mongoose schemas/models
│   ├── routes        # Express route definitions
│   ├── utility       # Helper functions (Uploader, etc.)
│   └── index.ts      # Main entry point
├── uploads           # Local storage for uploaded images
├── dist              # Compiled JavaScript files (generated)
└── tsconfig.json     # TypeScript configuration
```

## 📝 License

This project is licensed under the ISC License.
