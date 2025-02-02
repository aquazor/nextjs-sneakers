import mongoose from 'mongoose';

export interface IProduct extends Document {
  _id: string;
  name: string;
  price: number;
  url: string;
  code: string;
  sizes: { _id: string; count: number; value: string; code: string }[];
}

const SizeSchema = new mongoose.Schema({
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

const ProductSchema = new mongoose.Schema({
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
  sizes: [SizeSchema],
  price: {
    type: Number,
    required: true,
  },
});

const Product =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
