import mongoose, { Schema, models, model } from "mongoose";

const ServerSchema = new Schema({
  ownerId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  discordGuildId: { type: String },
  icon: { type: String },
  banner: { type: String },
  themeConfig: {
    type: Object,
    default: { mode: "dark", color: "#5865F2" },
  },
}, { timestamps: true });

export default models.Server || model("Server", ServerSchema);
