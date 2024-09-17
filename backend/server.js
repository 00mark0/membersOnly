import express from "express"; // Import the Express framework
import session from "express-session"; // Import express-session for session management
import passport from "passport"; // Import Passport for authentication
import bodyParser from "body-parser"; // Import body-parser to parse request bodies
import cors from "cors"; // Import cors for handling Cross-Origin Resource Sharing
import authRoutes from "./routes/auth.js"; // Import authentication routes
import messageRoutes from "./routes/messages.js"; // Import message routes
import adminRoutes from "./routes/admin.js"; // Import admin routes
import userRoutes from "./routes/users.js"; // Import user routes
import "./config/passport.js"; // Import Passport configuration
import dotenv from "dotenv"; // Import dotenv to load environment variables
import errorHandler from "./middleware/errorHandler.js"; // Import error handling middleware

// Load environment variables from .env file
dotenv.config();

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3000; // Set the port from environment variables or default to 3000

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Enable CORS for the specified origin
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(session({ secret: "secret", resave: false, saveUninitialized: true })); // Configure session management
app.use(passport.initialize()); // Initialize Passport
app.use(passport.session()); // Use Passport session management

// Routes
app.use("/auth", authRoutes); // Use authentication routes
app.use("/messages", messageRoutes); // Use message routes
app.use("/admin", adminRoutes); // Use admin routes
app.use("/users", userRoutes); // Use user routes

// Error handling middleware
app.use(errorHandler); // Use error handling middleware

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log a message when the server starts
});
