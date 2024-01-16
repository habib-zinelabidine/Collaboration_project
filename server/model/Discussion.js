import mongoose from "mongoose";

const discussionSchema = new mongoose.Schema(
  {
    message: { type: String },
    topicId: { type: mongoose.Types.ObjectId, ref: "Topic" },
    privateMessageId: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
const Discussion = mongoose.model("Discussion", discussionSchema);
export default Discussion;
