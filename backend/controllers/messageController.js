// backend/controllers/messageController.js
import Message from "../models/Message.js"; // Import the Message model

// Create a new message
export const createMessage = async (req, res) => {
  try {
    const { content } = req.body; // Destructure the content from the request body
    const userId = req.user.id; // Get the logged-in user's ID from the request
    const message = await Message.create(userId, content); // Create a new message in the database
    res.status(201).json(message); // Return the created message with a 201 status
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return a 500 status if an error occurs
  }
};

// Get all messages
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll(); // Retrieve all messages from the database
    res.status(200).json(messages); // Return the messages with a 200 status
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return a 500 status if an error occurs
  }
};

// Update a message
export const updateMessage = async (req, res) => {
  try {
    const { id } = req.params; // Get the message ID from the route parameters
    const { content } = req.body; // Destructure the content from the request body
    const message = await Message.findById(id); // Find the message by ID

    if (!message) {
      return res.status(404).json({ error: "Message not found" }); // Return a 404 status if the message is not found
    }

    if (message.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to edit this message" }); // Return a 403 status if the user is not authorized to edit the message
    }

    const updatedMessage = await Message.updateMessage(id, content); // Update the message in the database
    res.status(200).json(updatedMessage); // Return the updated message with a 200 status
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return a 500 status if an error occurs
  }
};

// Delete a message
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params; // Get the message ID from the route parameters
    const message = await Message.findById(id); // Find the message by ID

    if (!message) {
      return res.status(404).json({ error: "Message not found" }); // Return a 404 status if the message is not found
    }

    if (message.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this message" }); // Return a 403 status if the user is not authorized to delete the message
    }

    await Message.deleteMessage(id); // Delete the message from the database
    res.status(200).json({ message: "Message deleted" }); // Return a success message with a 200 status
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return a 500 status if an error occurs
  }
};

// Get messages by user ID
export const getMessagesByUserId = async (req, res) => {
  try {
    const { userId } = req.params; // Get the user ID from the route parameters
    const messages = await Message.findByUserId(userId); // Retrieve messages for the given user ID from the database
    res.status(200).json(messages); // Return the messages with a 200 status
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return a 500 status if an error occurs
  }
};

// Admin: Delete all messages
export const deleteAllMessages = async (req, res) => {
  try {
    await Message.deleteAllMessages(); // Delete all messages from the database
    res.status(200).json({ message: "All messages deleted" }); // Return a success message with a 200 status
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return a 500 status if an error occurs
  }
};
