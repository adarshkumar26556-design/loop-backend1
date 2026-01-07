import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * 🔐 Generate JWT
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/**
 * ✅ REGISTER USER (Email + Password)
 */
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ✅ LOGIN USER
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 👤 GET OWN PROFILE (Protected)
 */
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("followers following", "username");

    res.json({
      ...user.toObject(),
      followersCount: user.followers.length,
      followingCount: user.following.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 👀 GET USER PROFILE BY USERNAME
 */
export const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username })
      .select("-password")
      .populate("followers following", "username");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If private account & not follower
    if (
      user.isPrivate &&
      !user.followers.includes(req.user.id) &&
      user._id.toString() !== req.user.id
    ) {
      return res.json({
        username: user.username,
        bio: user.bio,
        isPrivate: true,
      });
    }

    res.json({
      ...user.toObject(),
      followersCount: user.followers.length,
      followingCount: user.following.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 🔒 TOGGLE PUBLIC / PRIVATE ACCOUNT
 */
export const togglePrivateAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.isPrivate = !user.isPrivate;
    await user.save();

    res.json({
      message: `Account is now ${
        user.isPrivate ? "Private" : "Public"
      }`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
