// backend/routes/users.js
import express from "express";
import { searchUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/search", isAuthenticated, searchUser);

export default router;
