import * as mongoose from 'mongoose';
import { Product } from 'src/products/model/product.model';

export const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export interface Order extends mongoose.Document {
  customer: mongoose.Types.ObjectId;
  products: Product[];
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
