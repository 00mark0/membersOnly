// backend/config/passport.js
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";
import bcrypt from "bcryptjs"; // Updated to bcryptjs

// Configure the local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findByUsername(username);
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      const isValid = await bcrypt.compare(password, user.password); // Updated to bcryptjs
      if (!isValid) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Serialize user instance to the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user instance from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
