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
import helmet from "helmet";
import MongoStore from "connect-mongo";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
    credentials: true,
  })
);

// Handle preflight requests
app.options(
  "*",
  cors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/admin", adminRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
