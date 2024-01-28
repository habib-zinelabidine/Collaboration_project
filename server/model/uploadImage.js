import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const ImageModel = mongoose.model("image", ImageSchema);
export default ImageModel;
