import mongoose, { Schema, models, model, type Document, type Types } from 'mongoose';

export interface ILinkMeta {
  title: string;
  description: string;
}

export interface ILink extends Document {
  ownerId: Types.ObjectId;
  slug: string;
  type: 'bot' | 'server' | 'redirect';
  destination: string;
  clicks: number;
  meta: ILinkMeta;
  createdAt: Date;
  updatedAt: Date;
}

const LinkMetaSchema = new Schema<ILinkMeta>(
  {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { _id: false }
);

const LinkSchema = new Schema<ILink>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    slug: { type: String, required: true, unique: true },
    type: { type: String, enum: ['bot', 'server', 'redirect'], default: 'redirect' },
    destination: { type: String, required: true },
    clicks: { type: Number, default: 0 },
    meta: { type: LinkMetaSchema, default: () => ({}) },
  },
  { timestamps: true }
);

LinkSchema.index({ slug: 1 }, { unique: true });
LinkSchema.index({ ownerId: 1 });

const Link = models.Link || model<ILink>('Link', LinkSchema);
export default Link;
