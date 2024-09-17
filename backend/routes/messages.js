// backend/routes/messages.js
import express from "express"; // Import the Express framework
import {
  createMessage,
  deleteMessage,
  updateMessage,
  getMessagesByUserId,
  deleteAllMessages,
  getAllMessages,
} from "../controllers/messageController.js"; // Import controller functions for handling messages
import { isAuthenticated, isAdmin } from "../middleware/auth.js"; // Import authentication and authorization middleware

const router = express.Router(); // Create a new router instance

// Define a route to create a new message, protected by isAuthenticated middleware
router.post("/", isAuthenticated, createMessage);

// Define a route to update a message by ID, protected by isAuthenticated middleware
router.put("/:id", isAuthenticated, updateMessage);

// Define a route to delete a message by ID, protected by isAuthenticated middleware
router.delete("/:id", isAuthenticated, deleteMessage);

// Define a route to get messages by user ID, protected by isAuthenticated middleware
router.get("/user/:userId", isAuthenticated, getMessagesByUserId);

// Define a route to get all messages
router.get("/", getAllMessages);

// Admin route to delete all messages, protected by isAdmin middleware
router.delete("/all", isAdmin, deleteAllMessages);

export default router; // Export the router to be used in other parts of the application
