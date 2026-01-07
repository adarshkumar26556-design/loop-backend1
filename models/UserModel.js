import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // 🔹 Basic Info
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: function () {
        return !this.isGoogleUser; // password not required for Google users
      },
    },

    // 🔹 Google Authentication
    googleId: {
      type: String,
      default: null,
    },

    isGoogleUser: {
      type: Boolean,
      default: false,
    },

    // 🔹 Profile Info
    bio: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    // 🔒 Privacy
    isPrivate: {
      type: Boolean,
      default: false,
    },

    // 🔁 Social Connections
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // 🔔 Follow requests (for private accounts)
    followRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
