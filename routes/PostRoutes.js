
import express from "express";
import {
  createPost,
  getAllPosts,
  getUserPosts,
  toggleLikePost,
  addComment,
  deletePost,
  deleteComment,
  toggleLikeComment,
  getPostLikes,
  replyToComment,
  deleteReply,
  getCommentLikes,
} from "../controllers/postcontroller.js";


import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const PostRoute = express.Router();

// CREATE POST (multiple images)
PostRoute.post(
  "/",
  protect,
  upload.array("images", 10),
  createPost
);

// HOME FEED (IMPORTANT ✅)
PostRoute.get("/", protect, getAllPosts);

// USER POSTS (profile page)
PostRoute.get("/user/:userId", protect, getUserPosts);

// LIKE / UNLIKE
PostRoute.put("/:postId/like", protect, toggleLikePost);

// ADD COMMENT
PostRoute.post("/:postId/comments", protect, addComment);

// DELETE POST
PostRoute.delete("/:postId", protect, deletePost);

// DELETE COMMENT
PostRoute.delete("/:postId/comments/:commentId", protect, deleteComment);

// LIKE COMMENT
PostRoute.put("/:postId/comments/:commentId/like", protect, toggleLikeComment);

// REPLY TO COMMENT
PostRoute.post("/:postId/comments/:commentId/reply", protect, replyToComment);
PostRoute.delete("/:postId/comments/:commentId/reply/:replyId", protect, deleteReply);

// GET LIKES
PostRoute.get("/:postId/likes", protect, getPostLikes);
PostRoute.get("/:postId/comments/:commentId/likes", protect, getCommentLikes);

export default PostRoute;
