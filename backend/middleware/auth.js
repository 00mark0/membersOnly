// backend/middleware/auth.js
import jwt from "jsonwebtoken"; // Import the jsonwebtoken library for handling JWTs

// Middleware to check if the user is authenticated
export const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Get the Authorization header from the request
  const token = authHeader && authHeader.split(" ")[1]; // Extract the token from the header
  if (!token) return res.sendStatus(401); // If no token is found, return a 401 Unauthorized status

  // Verify the token using the JWT_SECRET
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // If token verification fails, return a 403 Forbidden status
    req.user = user; // Attach the user information to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

// Middleware to check if the user is an admin
export const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.sendStatus(403); // If the user is not an admin, return a 403 Forbidden status
  }
  next(); // Proceed to the next middleware or route handler
};
