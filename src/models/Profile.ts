import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // Discord ID
  handle: { type: String, required: true, unique: true },
  bio: { type: String, default: '' },
  theme: { 
    type: String, 
    default: 'dark', 
    enum: ['dark', 'light', 'electric', 'void'] 
  },
  customColors: {
    primary: String,
    background: String,
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
