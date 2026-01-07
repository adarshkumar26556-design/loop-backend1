const messageSchema = new mongoose.Schema({
  
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  text: String,
  media: String,

  // 👁️ Seen system
  seen: {
    type: Boolean,
    default: false,
  },

  // 🔥 Vanish modes
  vanishMode: {
    type: String,
    enum: ["none", "seen", "24h"],
    default: "none",
  },

  deleteAfter: Date,

}, { timestamps: true });
