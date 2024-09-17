// backend/routes/users.js
import express from "express";
import { searchUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";
import { getUserById } from "../controllers/userController.js";

const router = express.Router();

router.get("/search", isAuthenticated, searchUser);
router.get("/:userId", isAuthenticated, getUserById);

export default router;
