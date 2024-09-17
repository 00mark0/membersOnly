// backend/routes/admin.js
import express from "express"; // Import the Express framework
import {
  deleteUser,
  deleteMessage,
  deleteAllMessages,
  getAllUsers,
  deleteAllUsers,
  getUserById,
} from "../controllers/adminController.js"; // Import controller functions
import { getMessagesByUserId } from "../controllers/messageController.js"; // Import controller function for messages
import { isAdmin, isAuthenticated } from "../middleware/auth.js"; // Import authentication and authorization middleware

const router = express.Router(); // Create a new router instance

// Define a route to delete a user by ID, protected by isAuthenticated and isAdmin middleware
router.delete("/users/:id", isAuthenticated, isAdmin, deleteUser);

// Define a route to delete a message by ID, protected by isAuthenticated and isAdmin middleware
router.delete("/message/:id", isAuthenticated, isAdmin, deleteMessage);

// Define a route to delete all messages, protected by isAuthenticated and isAdmin middleware
router.delete("/message/all", isAuthenticated, isAdmin, deleteAllMessages);

// Define a route to get all users, protected by isAuthenticated and isAdmin middleware
router.get("/users", isAuthenticated, isAdmin, getAllUsers);

// Define a route to delete all users, protected by isAuthenticated and isAdmin middleware
router.delete("/users", isAuthenticated, isAdmin, deleteAllUsers);

// Define a route to get messages by user ID, protected by isAuthenticated and isAdmin middleware
router.get("/messages/:userId", isAuthenticated, isAdmin, getMessagesByUserId);

// Define a route to get a user by ID, protected by isAuthenticated and isAdmin middleware
router.get("/users/:id", isAuthenticated, isAdmin, getUserById);

export default router; // Export the router to be used in other parts of the application
