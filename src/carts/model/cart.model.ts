import * as mongoose from 'mongoose';
import { Product } from 'src/products/model/product.model';

export const CartSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export interface Cart extends mongoose.Document {
  customer: mongoose.Types.ObjectId;
  products: Product[];
  total: number;
  createdAt: Date;
}
