// import express from "express";
// import {
//   registerUser,
//   loginUser,
//   getMyProfile,
//   getUserProfile,
//   togglePrivateAccount,
//   updateProfile,
//   toggleFollow,
//   getFollowRequests,
//   respondFollowRequest,
//   getUserSuggestions,

// } from "../controllers/UserController.js";

// import { protect } from "../middleware/authMiddleware.js";

// const UserRoute = express.Router();

// UserRoute.post("/register", registerUser);
// UserRoute.post("/login", loginUser);

// UserRoute.get("/follow-requests", protect, getFollowRequests);
// UserRoute.post("/follow-requests/respond", protect, respondFollowRequest);

// // ✅ THIS MUST BE HERE
// UserRoute.get("suggestions", protect, getUserSuggestions)


// UserRoute.get("/getmyprofile", protect, getMyProfile);

// UserRoute.put("/toggleprivate", protect, togglePrivateAccount);
// UserRoute.put("/update-profile", protect, updateProfile);

// UserRoute.put("/:userId/follow", protect, toggleFollow);

// // ⚠️ ALWAYS LAST
// UserRoute.get("/:username",protect, getUserProfile);

// export default UserRoute;
import express from "express";
import {
  registerUser,
  loginUser,
  getMyProfile,
  getUserProfile,
  togglePrivateAccount,
  updateProfile,
  toggleFollow,
  getFollowRequests,
  respondFollowRequest,
  getUserSuggestions,
  searchUsers,
  toggleSavePost,
  getSavedPosts,
} from "../controllers/UserController.js";

import { protect } from "../middleware/authMiddleware.js";

const UserRoute = express.Router();

UserRoute.post("/register", registerUser);
UserRoute.post("/login", loginUser);

UserRoute.get("/follow-requests", protect, getFollowRequests);
UserRoute.post("/follow-requests/respond", protect, respondFollowRequest);

UserRoute.get("/suggestions", protect, getUserSuggestions); // ✅ MUST BE HERE
UserRoute.get("/search", protect, searchUsers);
UserRoute.get("/saved", protect, getSavedPosts); // ✅ BEFORE /:username

UserRoute.get("/getmyprofile", protect, getMyProfile);

UserRoute.put("/toggleprivate", protect, togglePrivateAccount);
UserRoute.put("/update-profile", protect, updateProfile);

UserRoute.put("/:userId/follow", protect, toggleFollow);
UserRoute.put("/:postId/save", protect, toggleSavePost); // ✅ BEFORE /:username

// ⚠️ ALWAYS LAST - Dynamic routes with params
UserRoute.get("/:username", protect, getUserProfile);

export default UserRoute;
