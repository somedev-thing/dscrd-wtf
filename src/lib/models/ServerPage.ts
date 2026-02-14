import mongoose, { Schema, models, model } from "mongoose";

const ServerPageSchema = new Schema({
  serverId: { type: String, required: true, index: true },
  slug: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String },
  position: { type: Number, default: 0 },
}, { timestamps: true });

// Compound unique index
ServerPageSchema.index({ serverId: 1, slug: 1 }, { unique: true });

export default models.ServerPage || model("ServerPage", ServerPageSchema);
