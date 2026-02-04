import { io } from "../server.js";

export const emitToUser = (userId, event, data) => {
  if (!userId) return;
  io.to(userId.toString()).emit(event, data);
};
