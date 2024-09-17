import express from "express";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/messages.js";
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/users.js";
import "./config/passport.js";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/admin", adminRoutes);
app.use("/users", userRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
