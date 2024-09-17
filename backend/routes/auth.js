// backend/routes/auth.js
import express from "express"; // Import the Express framework
import passport from "passport"; // Import Passport for authentication
import { register, login, logout } from "../controllers/authController.js"; // Import controller functions
import { check, validationResult } from "express-validator"; // Import validation functions from express-validator

const router = express.Router(); // Create a new router instance

// Define a route to register a new user
router.post(
  "/register",
  [
    // Validate the username field
    check("username")
      .isLength({ min: 3 }) // Ensure the username is at least 3 characters long
      .withMessage("Username must be at least 3 characters long"), // Custom error message if validation fails

    // Validate the password field
    check("password")
      .isLength({ min: 6 }) // Ensure the password is at least 6 characters long
      .withMessage("Password must be at least 6 characters long"), // Custom error message if validation fails

    // Validate the isAdmin field
    check("isAdmin").isBoolean().withMessage("isAdmin must be a boolean"), // Ensure isAdmin is a boolean
  ],
  (req, res, next) => {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return validation errors if any
    }
    next(); // Proceed to the next middleware/controller if validation passes
  },
  register // Controller function to handle user registration
);

// Define a route to log in a user
router.post("/login", passport.authenticate("local"), login); // Use Passport's local strategy for authentication

// Define a route to log out a user
router.post("/logout", logout); // Controller function to handle user logout

export default router; // Export the router to be used in other parts of the application
