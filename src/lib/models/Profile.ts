import mongoose, { Schema, models, model } from "mongoose";

const ProfileSchema = new Schema({
  userId: { type: String, required: true, unique: true, index: true },
  username: { type: String, unique: true, sparse: true },
  bio: { type: String, default: "Just another dscrd.wtf user" },
  themeConfig: {
    type: Object,
    default: { mode: "dark", color: "#5865F2" },
  },
  isVerified: { type: Boolean, default: false },
  plan: { type: String, default: "free" },
  banner: { type: String },
  selectedBadges: { type: [String], default: [] },
  displayGuilds: { type: [String], default: [] },
}, { timestamps: true });

export default models.Profile || model("Profile", ProfileSchema);
