import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";
import cloudinary from "../Config/cloudinary.js";
import { emitToUser } from "../utils/socketEmit.js";
import Notification from "../models/NotificationModel.js";

/* =========================
   GET ALL POSTS (HOME FEED)
========================= */
/* =========================
   GET ALL POSTS (HOME FEED)
========================= */
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "user",
        select: "username avatar isPrivate followers",
      })
      .populate("comments.user", "username avatar")
      .sort({ createdAt: -1 });

    // ❌ DO NOT FILTER HERE
    // ✅ FRONTEND ALREADY HANDLES PRIVATE LOGIC

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load feed" });
  }
};


/* =========================
   GET USER POSTS
========================= */
export const getUserPosts = async (req, res) => {
  try {
    const profileUser = await User.findById(req.params.userId);

    if (!profileUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const viewerId = req.user.id.toString();

    const isOwner = profileUser._id.toString() === viewerId;
    const isFollower = profileUser.followers.some(
      (f) =>
        f?.toString?.() === viewerId ||
        f?._id?.toString?.() === viewerId
    );

    if (profileUser.isPrivate && !isOwner && !isFollower) {
      return res.status(403).json({ message: "This account is private" });
    }

    const posts = await Post.find({ user: profileUser._id })
      .populate("comments.user", "username avatar")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   CREATE POST
========================= */
export const createPost = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const uploadedImages = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "vanish/posts",
      });
      uploadedImages.push(result.secure_url);
    }

    const post = await Post.create({
      user: req.user.id,
      caption: req.body.caption,
      images: uploadedImages,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Create post failed" });
  }
};

/* =========================
   LIKE / UNLIKE POST
========================= */
export const toggleLikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const userId = req.user.id.toString();

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === userId
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();

    if (!alreadyLiked && post.user.toString() !== userId) {
      const notification = await Notification.create({
        recipient: post.user,
        sender: userId,
        type: "like",
        post: post._id,
      });

      emitToUser(post.user, "notification", {
        ...notification.toObject(),
        sender: {
          _id: req.user._id,
          username: req.user.username,
          avatar: req.user.avatar,
        },
      });
    }

    emitToUser(post.user, "post:like", {
      postId: post._id,
      userId,
      action: alreadyLiked ? "unliked" : "liked",
      likesCount: post.likes.length,
    });

    res.json({
      postId: post._id,
      likes: post.likes,
      action: alreadyLiked ? "unliked" : "liked",
    });
  } catch (error) {
    res.status(500).json({ message: "Like failed" });
  }
};

/* =========================
   ADD COMMENT
========================= */
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment text required" });
    }

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      user: req.user.id,
      text,
      createdAt: new Date(),
    });

    await post.save();

    const updatedPost = await Post.findById(post._id).populate(
      "comments.user",
      "username avatar"
    );

    const latestComment =
      updatedPost.comments[updatedPost.comments.length - 1];

    if (post.user.toString() !== req.user.id) {
      const notification = await Notification.create({
        recipient: post.user,
        sender: req.user.id,
        type: "comment",
        post: post._id,
        commentText: text,
      });

      emitToUser(post.user, "notification", {
        ...notification.toObject(),
        sender: {
          _id: req.user._id,
          username: req.user.username,
          avatar: req.user.avatar,
        },
      });
    }

    emitToUser(post.user, "post:comment", {
      postId: post._id,
      comment: latestComment,
    });

    res.status(201).json(updatedPost.comments);
  } catch (error) {
    res.status(500).json({ message: "Add comment failed" });
  }
};

/* =========================
   DELETE POST
========================= */
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

/* =========================
   DELETE COMMENT
========================= */
export const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    post.comments = post.comments.filter(
      (c) => c._id.toString() !== req.params.commentId
    );

    await post.save();
    res.json(post.comments);
  } catch (error) {
    res.status(500).json({ message: "Delete comment failed" });
  }
};

/* =========================
   REPLY TO COMMENT
========================= */
export const replyToComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const newReply = {
      user: req.user.id,
      text,
    };

    comment.replies.push(newReply);
    await post.save();

    // Populate for immediate return
    await post.populate("comments.replies.user", "username avatar");

    // Return updated comments for the post to refresh frontend
    // Ideally we just return the new reply, but for simplicity returning replies or updated comment
    res.json(post.comments);
  } catch (error) {
    res.status(500).json({ message: "Reply failed" });
  }
};

/* =========================
   DELETE REPLY
========================= */
export const deleteReply = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.replies.pull(req.params.replyId);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    res.status(500).json({ message: "Delete reply failed" });
  }
};

/* =========================
   LIKE / UNLIKE COMMENT
========================= */
export const toggleLikeComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = post.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const userId = req.user.id.toString();
    const alreadyLiked = comment.likes.some(
      (id) => id.toString() === userId
    );

    if (alreadyLiked) {
      comment.likes = comment.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      comment.likes.push(userId);
    }

    await post.save();

    // Notify comment author if like
    if (!alreadyLiked && comment.user.toString() !== userId) {
      // You might want to create a specific notification type for comment likes
      // For now, ignoring to keep it simple or reusing 'like' w/ differentiation
    }

    res.json(comment.likes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Toggle comment like failed" });
  }

};

/* =========================
   GET POST LIKES POPULATED
========================= */
export const getPostLikes = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate("likes", "username avatar name followers");
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post.likes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch likes" });
  }
};

/* =========================
   GET COMMENT LIKES
========================= */
export const getCommentLikes = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (!comment.likes || comment.likes.length === 0) {
      return res.json([]);
    }

    // Find users manually
    const userIds = comment.likes.map(id => id.toString());
    const users = await User.find({ _id: { $in: userIds } })
      .select("username avatar name followers");

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch comment likes" });
  }
};
