import pkg from "pg"; // Import the pg package for PostgreSQL
const { Pool } = pkg; // Destructure the Pool class from the pg package
import dotenv from "dotenv"; // Import dotenv to load environment variables

dotenv.config(); // Load environment variables from .env file

// Create a new pool instance with the database connection string
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Database connection string from environment variables
});

// Function to create tables if they do not exist
const createTables = async () => {
  // Create the users table if it does not exist
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY, // Auto-incrementing primary key
      username VARCHAR(255) UNIQUE NOT NULL, // Unique username field
      password VARCHAR(255) NOT NULL, // Password field
      role VARCHAR(50) DEFAULT 'user' // Role field with default value 'user'
    );
  `);

  // Create the messages table if it does not exist
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY, // Auto-incrementing primary key
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, // Foreign key referencing users table, with cascade delete
      content TEXT NOT NULL, // Content field
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP // Timestamp field with default value of current timestamp
    );
  `);

  console.log("Tables created successfully"); // Log success message
  pool.end(); // Close the pool connection
};

createTables(); // Call the function to create tables
