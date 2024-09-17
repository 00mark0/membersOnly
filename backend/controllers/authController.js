import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Register a new user
export const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      confirmPassword,
      isAdmin = false,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const existingEmail = await User.findByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await User.create(username, email, password, isAdmin);

    const token = jwt.sign(
      { id: user.id, username: user.username, isAdmin: user.is_admin },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
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
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Log in a user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isValid = await User.validPassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = User.generateToken(user);
    res.json({
      id: user.id,
      username: user.username,
      role: user.role,
      isAdmin: user.is_admin,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Log out a user
export const logout = (req, res) => {
  // Since JWT is stateless, there's no need to handle logout on the server side.
  // The client should simply delete the token.
  res.json({ message: "Logged out" });
};
