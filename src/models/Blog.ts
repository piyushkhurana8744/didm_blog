import mongoose, { Schema, Document } from 'mongoose';

export interface BlogDocument extends Document {
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  author: string;
  isFeatured: boolean;
  tags?: string[];
  rating?: number;
  readTime?: string;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<BlogDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model<BlogDocument>('Blog', blogSchema);
