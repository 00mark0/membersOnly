// backend/config/db.js
import pkg from "pg"; // Import the pg package for PostgreSQL
import dotenv from "dotenv"; // Import dotenv to load environment variables

// Load environment variables from .env file
dotenv.config();

const { Pool } = pkg; // Destructure the Pool class from the pg package

// Create a new pool instance with the database configuration
const pool = new Pool({
  user: process.env.DB_USER, // Database user from environment variables
  host: process.env.DB_HOST, // Database host from environment variables
  database: process.env.DB_NAME, // Database name from environment variables
  password: process.env.DB_PASSWORD, // Database password from environment variables
  port: process.env.DB_PORT, // Database port from environment variables
});

export default pool; // Export the pool instance to be used in other parts of the application
