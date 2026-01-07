import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";

import ConnectDB from "./Config/db.js";
import "./Config/passport.js"; // 🔐 Google OAuth config

import UserRoute from "./routes/userroutes.js";

// 🔹 Load env variables FIRST
dotenv.config();

// 🔹 Connect to MongoDB
ConnectDB();

const app = express();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Initialize passport (IMPORTANT)
app.use(passport.initialize());

// 🔹 Routes
app.use("/api/users", UserRoute);

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("Vanish API running 🚀");
});

// 🔹 Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
