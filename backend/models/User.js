// backend/models/User.js
import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const User = {
  create: async (username, email, password, isAdmin = false) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, email, password, role, is_admin) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, email, hashedPassword, "user", isAdmin]
    );
    return result.rows[0];
  },
  findByUsername: async (username) => {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return result.rows[0];
  },
  findByEmail: async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  },
  findById: async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },
  findAll: async () => {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  },
  deleteUser: async (id) => {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
  },
  deleteAllUsers: async () => {
    await pool.query("DELETE FROM users WHERE is_admin = false");
  },
  validPassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  },
  generateToken: (user) => {
    const payload = {
      id: user.id,
      username: user.username,
      isAdmin: user.is_admin,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  },
};

export default User;
