// backend/controllers/adminController.js
import User from "../models/User.js";
import Message from "../models/Message.js";

// Admin: Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.deleteUser(id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Delete a message by ID
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.deleteMessage(id);
    res.status(200).json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Delete all messages
export const deleteAllMessages = async (req, res) => {
  try {
    await Message.deleteAllMessages();
    res.status(200).json({ message: "All messages deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Delete all users
export const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteAllUsers();
    res.status(200).json({ message: "All users deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
