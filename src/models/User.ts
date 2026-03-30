import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  email: string;
  password: string;
  createdAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);
