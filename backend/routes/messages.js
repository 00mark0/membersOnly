// backend/routes/messages.js
import express from "express";
import {
  createMessage,
  deleteMessage,
  updateMessage,
  getMessagesByUserId,
  deleteAllMessages,
} from "../controllers/messageController.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", isAuthenticated, createMessage);
router.put("/:id", isAuthenticated, updateMessage);
router.delete("/:id", isAuthenticated, deleteMessage);
router.get("/user/:userId", isAuthenticated, getMessagesByUserId);

// Admin routes
router.delete("/all", isAdmin, deleteAllMessages);

export default router;
