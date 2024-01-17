import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Types.ObjectId, ref: "User" },
    receiverId: { type: mongoose.Types.ObjectId, ref: "User" },
    text: { type: String },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("message", messageSchema);
export default MessageModel;
