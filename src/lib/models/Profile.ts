import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // Discord ID
  handle: { type: String, required: true, unique: true },
  bio: { type: String, default: '' },
  displayName: { type: String },
  image: { type: String },
  banner: { type: String },
  bannerColor: { type: String },
  theme: { 
    type: String, 
    default: 'dark', 
    enum: ['dark', 'light', 'electric', 'void', 'custom'] 
  },
  customColors: {
    start: String,
    end: String,
    accent: String,
  },
  socials: [{
    platform: String,
    url: String,
    icon: String,
  }],
  badges: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
