import express from "express";
import { getNotifications, markNotificationsRead } from "../controllers/NotificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getNotifications);
router.put("/read", markNotificationsRead);

export default router;
