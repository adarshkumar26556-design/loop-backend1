import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const Authrouter = express.Router();

Authrouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

Authrouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: process.env.CLIENT_URL || "https://loop-frontend-ten.vercel.app",
  }),
  (req, res) => {
    console.log("req.user:", req.user);

    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const clientUrl = process.env.CLIENT_URL || "https://loop-frontend-ten.vercel.app";
    res.redirect(
      `${clientUrl}/google-success?token=${token}&userId=${req.user._id}`
    );
  }
);

export default Authrouter;
