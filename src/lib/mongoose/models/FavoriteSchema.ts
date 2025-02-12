import mongoose from 'mongoose';
import { IFavorite } from '@/types/favorite';
import { BaseItemSchema } from './ItemSchema';

const FavoriteItemSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },

    ...BaseItemSchema.obj,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const FavoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [FavoriteItemSchema],
});

const Favorite =
  mongoose.models.Favorite || mongoose.model<IFavorite>('Favorite', FavoriteSchema);

export default Favorite;
