// backend/config/passport.js
import passport from "passport"; // Import the passport library
import { Strategy as LocalStrategy } from "passport-local"; // Import the local strategy from passport-local
import User from "../models/User.js"; // Import the User model
import bcrypt from "bcryptjs"; // Import bcryptjs for password hashing

// Configure the local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findByUsername(username); // Find the user by username
      if (!user) {
        return done(null, false, { message: "Incorrect username." }); // Return an error if the username is incorrect
      }
      const isValid = await bcrypt.compare(password, user.password); // Compare the provided password with the stored hashed password
      if (!isValid) {
        return done(null, false, { message: "Incorrect password." }); // Return an error if the password is incorrect
      }
      return done(null, user); // Return the user if authentication is successful
    } catch (err) {
      return done(err); // Return an error if an exception occurs
    }
  })
);

// Serialize user instance to the session
passport.serializeUser((user, done) => {
  done(null, user.id); // Serialize the user ID to the session
});

// Deserialize user instance from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Find the user by ID
    done(null, user); // Deserialize the user instance from the session
  } catch (err) {
    done(err); // Return an error if an exception occurs
  }
});
