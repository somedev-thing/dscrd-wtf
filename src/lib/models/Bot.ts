import mongoose, { Schema, models, model } from "mongoose";

const BotSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  inviteUrl: { type: String, required: true },
  clicks: { type: Number, default: 0 },
}, { timestamps: true });

export default models.Bot || model("Bot", BotSchema);
