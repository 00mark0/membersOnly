// backend/models/User.js
import pool from "../config/db.js"; // Import the PostgreSQL connection pool
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken"; // Import jsonwebtoken for handling JWTs

const User = {
  // Function to create a new user
  create: async (username, email, password, isAdmin = false) => {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt of 10 rounds
    const result = await pool.query(
      "INSERT INTO users (username, email, password, role, is_admin) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, email, hashedPassword, "user", isAdmin] // Insert the new user into the database
    );
    return result.rows[0]; // Return the newly created user
  },

  // Function to find a user by username
  findByUsername: async (username) => {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]); // Query the database for a user with the given username
    return result.rows[0]; // Return the user if found
  },

  // Function to find a user by email
  findByEmail: async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]); // Query the database for a user with the given email
    return result.rows[0]; // Return the user if found
  },

  // Function to find a user by ID
  findById: async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]); // Query the database for a user with the given ID
    return result.rows[0]; // Return the user if found
  },

  // Function to find all users
  findAll: async () => {
    const result = await pool.query("SELECT * FROM users"); // Query the database for all users
    return result.rows; // Return all users
  },

  // Function to delete a user by ID
  deleteUser: async (id) => {
    await pool.query("DELETE FROM users WHERE id = $1", [id]); // Delete the user with the given ID from the database
  },

  // Function to delete all non-admin users
  deleteAllUsers: async () => {
    await pool.query("DELETE FROM users WHERE is_admin = false"); // Delete all users who are not admins from the database
  },

  // Function to validate a password
  validPassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword); // Compare the given password with the hashed password
  },

  // Function to generate a JWT for a user
  generateToken: (user) => {
    const payload = {
      id: user.id,
      username: user.username,
      isAdmin: user.is_admin,
    }; // Create a payload with the user's ID, username, and admin status
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }); // Sign the payload with the JWT secret and set an expiration time of 1 hour
  },
};

export default User; // Export the User object to be used in other parts of the application
