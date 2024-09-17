// backend/controllers/authController.js
import User from "../models/User.js"; // Import the User model
import jwt from "jsonwebtoken"; // Import jsonwebtoken for handling JWTs

// Register a new user
export const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      confirmPassword,
      isAdmin = false,
    } = req.body; // Destructure the request body to get the user details

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" }); // Return a 400 status if passwords do not match
    }

    const existingUser = await User.findByUsername(username); // Check if the username is already taken
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" }); // Return a 400 status if the username is already taken
    }

    const existingEmail = await User.findByEmail(email); // Check if the email is already registered
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" }); // Return a 400 status if the email is already registered
    }

    const user = await User.create(username, email, password, isAdmin); // Create a new user

    const token = jwt.sign(
      { id: user.id, username: user.username, isAdmin: user.is_admin }, // Create a payload with the user's ID, username, and admin status
      process.env.JWT_SECRET, // Sign the payload with the JWT secret
      {
        expiresIn: "1h", // Set an expiration time of 1 hour
      }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.is_admin,
      },
    }); // Return the token and user data
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return a 500 status if an error occurs
  }
};

// Log in a user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body; // Destructure the request body to get the username and password
    const user = await User.findByUsername(username); // Find the user by username
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" }); // Return a 401 status if the user is not found
    }

    const isValid = await User.validPassword(password, user.password); // Validate the password
    if (!isValid) {
      return res.status(401).json({ message: "Invalid username or password" }); // Return a 401 status if the password is invalid
    }

    const token = User.generateToken(user); // Generate a JWT for the user
    res.json({
      id: user.id,
      username: user.username,
      role: user.role,
      isAdmin: user.is_admin,
      token,
    }); // Return the user data and token
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return a 500 status if an error occurs
  }
};

// Log out a user
export const logout = (req, res) => {
  // Since JWT is stateless, there's no need to handle logout on the server side.
  // The client should simply delete the token.
  res.json({ message: "Logged out" }); // Return a logout message
};
