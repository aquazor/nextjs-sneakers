import mongoose from 'mongoose';
import { IFavoriteItem } from '@/types/favorite';
import { ProductSchema } from './ItemSchema';

const FavoriteItemSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },

    ...ProductSchema.obj,
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
  mongoose.models.Favorite || mongoose.model<IFavoriteItem>('Favorite', FavoriteSchema);

export default Favorite;
