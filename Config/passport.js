// import dotenv from "dotenv";
// dotenv.config({ path: process.cwd() + "/.env" }); // 🔥 FORCE LOAD

// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// // 🔍 HARD DEBUG (DO NOT SKIP)
// console.log("PASSPORT ENV CHECK:", {
//   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
//   GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL,
//     },
//     (accessToken, refreshToken, profile, done) => {
//       return done(null, profile);
//     }
//   )
// );


import dotenv from "dotenv";
dotenv.config({ path: process.cwd() + "/.env" });

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/UserModel.js";

console.log("✅ passport.js loaded");

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.warn("⚠️ Google Auth keys missing! Google Login will not work.");
} else {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("DEBUG: Google Strategy Callback Reached");
        console.log("DEBUG: Profile Email:", profile.emails?.[0]?.value);
        try {
          const email = profile.emails?.[0]?.value;

          if (!email) {
            return done(new Error("No email from Google"), null);
          }

          // 🔍 Find existing user
          let user = await User.findOne({ email });
          console.log("logged", user);

          // ➕ Create new user if not exists
          if (!user) {
            user = await User.create({
              username: profile.displayName.replace(/\s+/g, "").toLowerCase(),
              email,
              avatar: profile.photos?.[0]?.value,
              isGoogleUser: true,
            });
          }
          console.log("🔥 GOOGLE PROFILE HIT");

          // ✅ IMPORTANT: pass MongoDB user, NOT profile
          return done(null, user);

        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
}
