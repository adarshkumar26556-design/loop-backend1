import Message from "../models/MessageModel.js";
import User from "../models/UserModel.js";
import { emitToUser } from "../utils/socketEmit.js";
import cloudinary from "../Config/cloudinary.js";

/* =========================
   SEND MESSAGE
========================= */
export const sendMessage = async (req, res) => {
    try {
        const { recipientId, text } = req.body;
        const senderId = req.user.id;

        let imageUrl = null;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "vanish/messages",
            });
            imageUrl = result.secure_url;
        }

        if (!recipientId || (!text && !imageUrl)) {
            return res.status(400).json({ message: "Recipient and content required" });
        }

        const message = await Message.create({
            sender: senderId,
            recipient: recipientId,
            text: text || "",
            image: imageUrl,
        });

        const populatedMessage = await Message.findById(message._id)
            .populate("sender", "username avatar")
            .populate("recipient", "username avatar");

        // Real-time emit to recipient
        emitToUser(recipientId, "receive_message", populatedMessage);

        res.status(201).json(populatedMessage);
    } catch (error) {
        res.status(500).json({ message: "Failed to send message" });
    }
};

/* =========================
   GET MESSAGES (Chat History)
========================= */
export const getMessages = async (req, res) => {
    try {
        const { userId } = req.params;
        const myId = req.user.id;

        const messages = await Message.find({
            $or: [
                { sender: myId, recipient: userId },
                { sender: userId, recipient: myId },
            ],
        })
            .sort({ createdAt: 1 }) // Oldest first
            .populate("sender", "username avatar")
            .populate("recipient", "username avatar");

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch messages" });
    }
};

/* =========================
   GET CONVERSATIONS (Inbox)
========================= */
export const getConversations = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find all unique users interacted with
        const messages = await Message.find({
            $or: [{ sender: userId }, { recipient: userId }],
        })
            .sort({ createdAt: -1 })
            .populate("sender", "username avatar")
            .populate("recipient", "username avatar");

        const conversations = new Map();

        messages.forEach((msg) => {
            const otherUser =
                msg.sender._id.toString() === userId ? msg.recipient : msg.sender;

            const otherUserId = otherUser._id.toString();

            if (!conversations.has(otherUserId)) {
                conversations.set(otherUserId, {
                    user: otherUser,
                    lastMessage: msg.image ? "🖼️ Image" : msg.text,
                    createdAt: msg.createdAt,
                    isRead: msg.sender._id.toString() === userId || msg.isRead,
                });
            }
        });

        res.json(Array.from(conversations.values()));
    } catch (error) {
        res.status(500).json({ message: "Failed to load conversations" });
    }
};
