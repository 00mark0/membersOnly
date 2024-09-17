// backend/models/Message.js
import pool from "../config/db.js";

const Message = {
  create: async (userId, content) => {
    const result = await pool.query(
      "INSERT INTO messages (user_id, content, created_at) VALUES ($1, $2, DEFAULT) RETURNING *",
      [userId, content]
    );
    return result.rows[0];
  },
  findById: async (id) => {
    const result = await pool.query("SELECT * FROM messages WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  },
  findByUserId: async (userId) => {
    const result = await pool.query(
      "SELECT * FROM messages WHERE user_id = $1",
      [userId]
    );
    return result.rows;
  },
  findAll: async () => {
    const result = await pool.query(
      "SELECT messages.*, users.username FROM messages JOIN users ON messages.user_id = users.id"
    );
    return result.rows;
  },
  updateMessage: async (id, content) => {
    const result = await pool.query(
      "UPDATE messages SET content = $1 WHERE id = $2 RETURNING *",
      [content, id]
    );
    return result.rows[0];
  },
  deleteMessage: async (id) => {
    await pool.query("DELETE FROM messages WHERE id = $1", [id]);
  },
  deleteAllMessages: async () => {
    await pool.query("DELETE FROM messages");
  },
};

export default Message;
