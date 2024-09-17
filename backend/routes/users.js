// backend/routes/users.js
import express from "express"; // Import the Express framework
import {
  searchUser,
  getUserById,
  deleteUserAccount,
} from "../controllers/userController.js"; // Import controller functions
import { isAuthenticated } from "../middleware/auth.js"; // Import authentication middleware

const router = express.Router(); // Create a new router instance

// Define a route to search for users, protected by the isAuthenticated middleware
router.get("/search", isAuthenticated, searchUser);

// Define a route to get a user by ID, protected by the isAuthenticated middleware
router.get("/:userId", isAuthenticated, getUserById);

// Define a route to delete the logged-in user's account, protected by the isAuthenticated middleware
router.delete("/deleteAccount", isAuthenticated, deleteUserAccount);

export default router; // Export the router to be used in other parts of the application
