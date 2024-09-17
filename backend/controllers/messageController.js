// backend/controllers/messageController.js
import Message from "../models/Message.js";

// Create a new message
export const createMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;
    const message = await Message.create(userId, content);
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a message
export const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const message = await Message.updateMessage(id, content);
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a message
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.deleteMessage(id);
    res.status(200).json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get messages by user ID
export const getMessagesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.findByUserId(userId);
    res.status(200).json(messages);
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
