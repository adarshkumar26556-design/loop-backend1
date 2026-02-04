import Notification from "../models/NotificationModel.js";

/* =========================
   GET NOTIFICATIONS
========================= */
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.user.id })
            .populate("sender", "username avatar")
            .populate("post", "image")
            .sort({ createdAt: -1 });

        res.json(notifications);
    } catch (error) {
        console.error("GET NOTIFICATIONS ERROR:", error);
        res.status(500).json({ message: "Failed to fetch notifications" });
    }
};

/* =========================
   MARK AS READ
========================= */
export const markNotificationsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { recipient: req.user.id, isRead: false },
            { $set: { isRead: true } }
        );
        res.json({ message: "Notifications marked as read" });
    } catch (error) {
        res.status(500).json({ message: "Failed to mark notifications" });
    }
};
