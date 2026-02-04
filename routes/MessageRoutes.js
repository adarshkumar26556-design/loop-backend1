import express from "express";
import { sendMessage, getMessages, getConversations } from "../controllers/MessageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

import upload from "../middleware/uploadMiddleware.js";

router.post("/", upload.single("image"), sendMessage);
router.get("/conversations", getConversations);
router.get("/:userId", getMessages);

export default router;
