
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Notification from "../models/NotificationModel.js";
import { emitToUser } from "../utils/socketEmit.js";

/* =========================
   🔐 GENERATE JWT
========================= */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/* =========================
   ✅ REGISTER USER
========================= */
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide username, email and password",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email: email.toLowerCase(),
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

/* =========================
   ✅ LOGIN USER
========================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   👤 GET MY PROFILE (FINAL – ONLY ONE)
========================= */
export const getMyProfile = async (req, res) => {
  res.status(200).json(req.user);
};

/* =========================
   👀 GET USER PROFILE BY USERNAME
========================= */
export const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username })
      .select("-password")
      .populate("followers following followRequests", "_id");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const viewerId = req.user?.id;

    const isOwner =
      viewerId && user._id.toString() === viewerId;

    const isFollowing =
      viewerId &&
      user.followers.some(
        (f) => f._id.toString() === viewerId
      );

    const isRequested =
      viewerId &&
      user.followRequests.some(
        (r) => r._id.toString() === viewerId
      );

    // 🔒 PRIVATE + NOT FOLLOWING
    if (user.isPrivate && !isOwner && !isFollowing) {
      return res.json({
        _id: user._id,
        username: user.username,
        avatar: user.avatar,
        bio: user.bio,
        isPrivate: true,
        isFollowing: false,
        isRequested,
        followersCount: user.followers.length,
        followingCount: user.following.length,
      });
    }

    res.json({
      ...user.toObject(),
      isPrivate: user.isPrivate,
      isFollowing,
      isRequested,
      followersCount: user.followers.length,
      followingCount: user.following.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =========================
   🔒 TOGGLE PRIVATE ACCOUNT
========================= */
export const togglePrivateAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.isPrivate = !user.isPrivate;
    await user.save();

    res.json({
      message: `Account is now ${user.isPrivate ? "Private" : "Public"}`,
      isPrivate: user.isPrivate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   ✏️ UPDATE PROFILE
========================= */
export const updateProfile = async (req, res) => {
  try {
    const { username, bio, password, avatar, isPrivate, name } = req.body;

    const user = await User.findById(req.user.id);

    if (username) user.username = username;
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (avatar) user.avatar = avatar;
    if (isPrivate !== undefined) user.isPrivate = isPrivate;

    if (password && password.trim()) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   🔁 FOLLOW / UNFOLLOW (FIXED)
========================= */
export const toggleFollow = async (req, res) => {
  try {
    // ✅ FIX: prevent self-follow
    if (req.user.id === req.params.userId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const targetUser = await User.findById(req.params.userId);
    const currentUser = await User.findById(req.user.id);

    if (!targetUser || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentUserId = currentUser._id.toString();

    const isFollowing = targetUser.followers.some(
      (id) => id.toString() === currentUserId
    );

    // 🔁 UNFOLLOW
    if (isFollowing) {
      targetUser.followers = targetUser.followers.filter(
        (id) => id.toString() !== currentUserId
      );
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== targetUser._id.toString()
      );

      await targetUser.save();
      await currentUser.save();

      return res.json({ status: "unfollowed" });
    }

    // 🔒 PRIVATE → REQUEST
    if (targetUser.isPrivate) {
      if (
        !targetUser.followRequests.some(
          (id) => id.toString() === currentUserId
        )
      ) {
        targetUser.followRequests.push(currentUser._id);
        await targetUser.save();

        const notification = await Notification.create({
          recipient: targetUser._id,
          sender: currentUser._id,
          type: "follow_request",
        });

        emitToUser(targetUser._id, "notification", {
          ...notification.toObject(),
          sender: {
            _id: currentUser._id,
            username: currentUser.username,
            avatar: currentUser.avatar,
          },
        });

        // ✅ EMIT SPECIFIC EVENT FOR FRONTEND
        emitToUser(targetUser._id, "follow:request", {
          _id: currentUser._id,
          username: currentUser.username,
          avatar: currentUser.avatar,
        });
      }
      return res.json({ status: "requested" });
    }

    // ✅ FIX: remove old follow request if exists
    targetUser.followRequests = targetUser.followRequests.filter(
      (id) => id.toString() !== currentUserId
    );

    // 🌍 PUBLIC → FOLLOW (duplicate-safe)
    if (!targetUser.followers.includes(currentUser._id)) {
      targetUser.followers.push(currentUser._id);
    }
    if (!currentUser.following.includes(targetUser._id)) {
      currentUser.following.push(targetUser._id);
    }

    await targetUser.save();
    await currentUser.save();

    res.json({ status: "followed" });

    // Send notification for new follow
    const notification = await Notification.create({
      recipient: targetUser._id,
      sender: currentUser._id,
      type: "follow",
    });

    emitToUser(targetUser._id, "notification", {
      ...notification.toObject(),
      sender: {
        _id: currentUser._id,
        username: currentUser.username,
        avatar: currentUser.avatar,
      },
    });
  } catch (error) {
    console.error("FOLLOW ERROR:", error);
    res.status(500).json({ message: "Follow failed" });
  }
};

/* ======================
   GET FOLLOW REQUESTS (FIXED)
====================== */
export const getFollowRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "followRequests",
      "username avatar"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.followRequests);
  } catch (error) {
    res.status(500).json({ message: "Failed to load follow requests" });
  }
};

/* ======================
   ACCEPT / REJECT REQUEST (FIXED)
====================== */
export const respondFollowRequest = async (req, res) => {
  const { requesterId, action } = req.body;

  // ✅ FIX: validate action
  if (!["accept", "reject"].includes(action)) {
    return res.status(400).json({ message: "Invalid action" });
  }

  const user = await User.findById(req.user.id);
  const requester = await User.findById(requesterId);

  if (!user || !requester) {
    return res.status(404).json({ message: "User not found" });
  }

  // ✅ FIX: ensure request exists
  if (!user.followRequests.includes(requesterId)) {
    return res.status(400).json({ message: "Invalid follow request" });
  }

  // Remove request
  user.followRequests.pull(requesterId);

  if (action === "accept") {
    if (!user.followers.includes(requesterId)) {
      user.followers.push(requesterId);
    }
    if (!requester.following.includes(user._id)) {
      requester.following.push(user._id);
    }
  }

  await user.save();
  await requester.save();

  res.json({ status: action });

  if (action === "accept") {
    const notification = await Notification.create({
      recipient: requester._id,
      sender: user._id,
      type: "follow_accept",
    });

    emitToUser(requester._id, "notification", {
      ...notification.toObject(),
      sender: {
        _id: user._id,
        username: user.username,
        avatar: user.avatar,
      },
    });
  }
};

/* ======================
   USER SUGGESTIONS
====================== */
export const getUserSuggestions = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const suggestions = await User.find({
      _id: {
        $ne: currentUser._id,
        $nin: currentUser.following,
      },
    }).select("username avatar");

    res.status(200).json(suggestions);
  } catch (error) {
    console.error("Suggestions error:", error);
    res.status(500).json({ message: "Failed to load suggestions" });
  }
};

/* ======================
   SEARCH USERS
====================== */
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);

    const users = await User.find({
      username: { $regex: query, $options: "i" },
      _id: { $ne: req.user.id },
    })
      .select("username name avatar email")
      .limit(10);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
};

/* ======================
   🔖 TOGGLE SAVE POST
====================== */
export const toggleSavePost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { postId } = req.params;

    const alreadySaved = user.savedPosts.some(id => id.toString() === postId);

    if (alreadySaved) {
      user.savedPosts = user.savedPosts.filter((id) => id.toString() !== postId);
    } else {
      user.savedPosts.push(postId);
    }

    await user.save();

    res.json({
      saved: !alreadySaved,
      savedPosts: user.savedPosts
    });
  } catch (error) {
    res.status(500).json({ message: "Toggle save failed" });
  }
};

/* ======================
   🔖 GET SAVED POSTS
====================== */
export const getSavedPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "savedPosts",
      options: { sort: { createdAt: -1 } }, // Newest first
    });

    res.json(user.savedPosts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch saved posts" });
  }
};
