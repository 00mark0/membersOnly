// backend/controllers/authController.js
import User from "../models/User.js";

// Register a new user
export const register = async (req, res) => {
  try {
    const { username, password, isAdmin } = req.body;
    const user = await User.create(username, password, isAdmin);
    res.status(201).json(user);
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
