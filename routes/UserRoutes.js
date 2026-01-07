import express from "express";
import {
  getMyProfile,
  getUserProfile,
  loginUser,
  registerUser,
  togglePrivateAccount
} from "../controllers/UserController.js";

import protect from "../middleware/authMiddleware.js";
import passport from "passport";
import jwt from "jsonwebtoken";

const UserRoute = express.Router();

UserRoute.post("/register", registerUser);
UserRoute.post("/login", loginUser);
UserRoute.get("/getmyprofile", protect, getMyProfile);
UserRoute.get("/:username", getUserProfile);
UserRoute.put("/toggleprivate", protect, togglePrivateAccount);

/**
 * 🔐 GOOGLE AUTH
 */
UserRoute.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

UserRoute.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.redirect(
      `${process.env.CLIENT_URL}/oauth-success?token=${token}`
    );
  }
);

export default UserRoute;
