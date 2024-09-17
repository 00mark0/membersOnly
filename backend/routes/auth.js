// backend/routes/auth.js
import express from "express";
import passport from "passport";
import { register, login, logout } from "../controllers/authController.js";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/register",
  [
    check("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    check("isAdmin").isBoolean().withMessage("isAdmin must be a boolean"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  register
);

router.post("/login", passport.authenticate("local"), login);
router.post("/logout", logout);

export default router;
