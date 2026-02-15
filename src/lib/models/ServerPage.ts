import mongoose, { Schema, models, model, type Document, type Types } from 'mongoose';

export interface ISubPage {
  slug: string;
  title: string;
  content: string;
}

export interface IServerPage extends Document {
  ownerId: Types.ObjectId;
  slug: string;
  name: string;
  customDomain: string;
  content: string;
  pages: ISubPage[];
  createdAt: Date;
  updatedAt: Date;
}

const SubPageSchema = new Schema<ISubPage>(
  {
    slug: { type: String, required: true },
    title: { type: String, default: '' },
    content: { type: String, default: '' },
  },
  { _id: false }
);

const ServerPageSchema = new Schema<IServerPage>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    slug: { type: String, required: true, unique: true },
    name: { type: String, default: '' },
    customDomain: { type: String, default: '' },
    content: { type: String, default: '' },
    pages: { type: [SubPageSchema], default: [] },
  },
  { timestamps: true }
);

ServerPageSchema.index({ slug: 1 }, { unique: true });
ServerPageSchema.index({ ownerId: 1 });

const ServerPage = models.ServerPage || model<IServerPage>('ServerPage', ServerPageSchema);
export default ServerPage;
