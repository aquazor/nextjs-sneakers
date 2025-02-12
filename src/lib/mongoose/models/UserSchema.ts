import mongoose from 'mongoose';
import { IUser } from '@/types/user';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
