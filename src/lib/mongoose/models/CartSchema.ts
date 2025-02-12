import mongoose from 'mongoose';
import { ICart } from '@/types/cart';
import { BaseItemSchema, ItemSizeSchema } from './ItemSchema';

const CartrItemSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },

  ...BaseItemSchema.obj,

  size: ItemSizeSchema,
  maxCount: {
    type: Number,
    required: true,
    default: 1,
  },
  count: {
    type: Number,
    required: true,
    default: 1,
  },
});

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [CartrItemSchema],
  },
  { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema);
export default Cart;
