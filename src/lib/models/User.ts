import mongoose, { Schema, models, model, type Document } from 'mongoose';

export interface ISocial {
  platform: string;
  url: string;
}

export interface IProfile {
  bio: string;
  theme: string;
  socials: ISocial[];
  customCss: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  emailVerified: Date | null;
  image: string;
  role: 'admin' | 'user';
  tier: 'lurker' | 'verified';
  slugs: string[];
  profile: IProfile;
  createdAt: Date;
  updatedAt: Date;
}

const SocialSchema = new Schema<ISocial>(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const ProfileSchema = new Schema<IProfile>(
  {
    bio: { type: String, default: '' },
    theme: { type: String, default: 'void' },
    socials: { type: [SocialSchema], default: [] },
    customCss: { type: String, default: '' },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Date, default: null },
    image: { type: String, default: '' },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    tier: { type: String, enum: ['lurker', 'verified'], default: 'lurker' },
    slugs: { type: [String], default: [] },
    profile: { type: ProfileSchema, default: () => ({}) },
  },
  { timestamps: true }
);

// Index for fast slug lookups
UserSchema.index({ slugs: 1 });
// UserSchema.index({ email: 1 }, { unique: true }); // Removed duplicate index

const User = models.User || model<IUser>('User', UserSchema);
export default User;
