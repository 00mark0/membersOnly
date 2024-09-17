// backend/routes/admin.js
import express from "express";
import {
  deleteUser,
  deleteMessage,
  deleteAllMessages,
  getAllUsers,
  deleteAllUsers,
  getUserById,
} from "../controllers/adminController.js";
import { getMessagesByUserId } from "../controllers/messageController.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.delete("/users/:id", isAuthenticated, isAdmin, deleteUser);
router.delete("/message/:id", isAuthenticated, isAdmin, deleteMessage);
router.delete("/message/all", isAuthenticated, isAdmin, deleteAllMessages);
router.get("/users", isAuthenticated, isAdmin, getAllUsers);
router.delete("/users", isAuthenticated, isAdmin, deleteAllUsers);
router.get("/messages/:userId", isAuthenticated, isAdmin, getMessagesByUserId);
router.get("/users/:id", isAuthenticated, isAdmin, getUserById);

export default router;
