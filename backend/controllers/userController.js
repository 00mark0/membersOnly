// backend/controllers/userController.js
import User from "../models/User.js"; // Import the User model

// Controller function to search for a user by username
export const searchUser = async (req, res) => {
  try {
    const { username } = req.query; // Get the username from the query parameters
    const user = await User.findByUsername(username); // Find the user by username
    if (user) {
      res.status(200).json({ id: user.id, username: user.username }); // Return the user data if found
    } else {
      res.status(404).json({ message: "User not found" }); // Return a 404 status if the user is not found
    }
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return a 500 status if an error occurs
  }
};

// Controller function to get a user by their ID
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params; // Get the user ID from the route parameters
    const user = await User.findById(userId); // Find the user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Return a 404 status if the user is not found
    }
    res.status(200).json(user); // Return the user data if found
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return a 500 status if an error occurs
  }
};

// Controller function to delete the logged-in user's account
export const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.user.id; // Get the logged-in user's ID from the request
    const user = await User.findById(userId); // Find the user by ID

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Return a 404 status if the user is not found
    }

    await User.deleteUser(userId); // Delete the user from the database
    res.status(200).json({ message: "Account deleted successfully" }); // Return a success message
  } catch (error) {
    console.error("Error deleting user account:", error); // Log the error
    res
      .status(500)
      .json({ message: "An error occurred while deleting the account" }); // Return a 500 status if an error occurs
  }
};
