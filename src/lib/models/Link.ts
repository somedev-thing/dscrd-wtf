import mongoose, { Schema, models, model } from "mongoose";

const LinkSchema = new Schema({
  userId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String, default: "link" },
  position: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default models.Link || model("Link", LinkSchema);
