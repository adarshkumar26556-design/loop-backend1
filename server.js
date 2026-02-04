import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import { Server } from "socket.io";

import "./Config/passport.js";
import ConnectDB from "./Config/db.js";

import UserRoutes from "./routes/UserRoutes.js";
import PostRoutes from "./routes/PostRoutes.js";
import GoogleAuthRoutes from "./routes/googleRoutes.js";
import NotificationRoutes from "./routes/NotificationRoutes.js";
import MessageRoutes from "./routes/MessageRoutes.js";
import testRoute from "./routes/testRoutes.js";

ConnectDB();

const app = express();

/* =========================
   ES MODULE FIX
========================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================
   MIDDLEWARES
========================= */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "http://localhost:5177",
  "http://localhost:5178",
];

app.use(
  cors({
    origin: true, // Allow all origins (simpler for initial deploy)
    credentials: true,
  })
);

app.use(express.json());
app.use(passport.initialize());

/* =========================
   ROUTES
========================= */
app.use("/api/users", UserRoutes);
app.use("/api/posts", PostRoutes);
app.use("/api/auth", GoogleAuthRoutes);
app.use("/api/notifications", NotificationRoutes);
app.use("/api/messages", MessageRoutes);
app.use("/api/test", testRoute);

app.get("/", (req, res) => {
  res.send("Loop API running");
});

/* =========================
   SOCKET.IO
========================= */
/* =========================
   SOCKET.IO (Conditional)
========================= */
const server = http.createServer(app);
let io;

try {
  io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
    socket.on("join", (userId) => {
      socket.join(userId.toString());
      console.log("User joined room:", userId);
    });
  });
} catch (err) {
  console.warn("Socket.IO failed to initialize (ignored in serverless):", err);
}

export { io };

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
