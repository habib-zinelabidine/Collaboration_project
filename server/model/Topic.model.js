import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  topicName: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  createrId: { type: mongoose.Types.ObjectId, ref: "User" },
  members :[{type: mongoose.Types.ObjectId, ref: "User"}],
});

const Topic = mongoose.model("Topic", topicSchema);
export default Topic;
