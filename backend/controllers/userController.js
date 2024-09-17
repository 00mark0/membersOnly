// backend/controllers/userController.js
import User from "../models/User.js";

// Search for a user
export const searchUser = async (req, res) => {
  try {
    const { username } = req.query;
    const user = await User.findByUsername(username);
    if (user) {
      res.status(200).json({ id: user.id, username: user.username });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
