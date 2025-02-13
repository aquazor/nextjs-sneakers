import mongoose from 'mongoose';
import { IProduct } from '@/types/product';

export const ItemSizeSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

export const BaseItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

export const ProductSchema = new mongoose.Schema({
  ...BaseItemSchema.obj,
  sizes: [ItemSizeSchema],
});

export default mongoose.models.Product ||
  mongoose.model<IProduct>('Product', ProductSchema);
