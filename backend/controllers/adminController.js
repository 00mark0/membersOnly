// backend/controllers/adminController.js
import User from "../models/User.js"; // Import the User model
import Message from "../models/Message.js"; // Import the Message model

// Admin: Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // Get the user ID from the route parameters
    await User.deleteUser(id); // Delete the user with the given ID from the database
    res.status(200).json({ message: "User deleted" }); // Return a success message with a 200 status
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return a 500 status if an error occurs
  }
};

// Admin: Delete a message by ID
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params; // Get the message ID from the route parameters
    await Message.deleteMessage(id); // Delete the message with the given ID from the database
    res.status(200).json({ message: "Message deleted" }); // Return a success message with a 200 status
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

// Admin: Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Retrieve all users from the database
    res.status(200).json(users); // Return the users with a 200 status
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return a 500 status if an error occurs
  }
};

// Admin: Delete all users
export const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteAllUsers(); // Delete all users who are not admins from the database
    res.status(200).json({ message: "All users deleted" }); // Return a success message with a 200 status
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return a 500 status if an error occurs
  }
};

// Admin: Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params; // Get the user ID from the route parameters
    const user = await User.findById(id); // Find the user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Return a 404 status if the user is not found
    }
    res.status(200).json(user); // Return the user data with a 200 status
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return a 500 status if an error occurs
  }
};
