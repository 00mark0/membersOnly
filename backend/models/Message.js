// backend/models/Message.js
import pool from "../config/db.js"; // Import the PostgreSQL connection pool

const Message = {
  // Function to create a new message
  create: async (userId, content) => {
    const result = await pool.query(
      "INSERT INTO messages (user_id, content, created_at) VALUES ($1, $2, DEFAULT) RETURNING *",
      [userId, content] // Insert the user ID and content into the messages table
    );
    return result.rows[0]; // Return the newly created message
  },

  // Function to find a message by ID
  findById: async (id) => {
    const result = await pool.query("SELECT * FROM messages WHERE id = $1", [
      id, // Query the database for a message with the given ID
    ]);
    return result.rows[0]; // Return the message if found
  },

  // Function to find messages by user ID
  findByUserId: async (userId) => {
    const result = await pool.query(
      "SELECT * FROM messages WHERE user_id = $1",
      [userId] // Query the database for messages with the given user ID
    );
    return result.rows; // Return the messages if found
  },

  // Function to find all messages
  findAll: async () => {
    const result = await pool.query(
      "SELECT messages.*, users.username FROM messages JOIN users ON messages.user_id = users.id" // Query the database for all messages and join with the users table to get the username
    );
    return result.rows; // Return all messages
  },

  // Function to update a message
  updateMessage: async (id, content) => {
    const result = await pool.query(
      "UPDATE messages SET content = $1, is_edited = TRUE WHERE id = $2 RETURNING *",
      [content, id] // Update the content of the message with the given ID and set is_edited to TRUE
    );
    return result.rows[0]; // Return the updated message
  },

  // Function to delete a message by ID
  deleteMessage: async (id) => {
    await pool.query("DELETE FROM messages WHERE id = $1", [id]); // Delete the message with the given ID from the database
  },

  // Function to delete all messages
  deleteAllMessages: async () => {
    await pool.query("DELETE FROM messages"); // Delete all messages from the database
  },
};

export default Message; // Export the Message object to be used in other parts of the application
