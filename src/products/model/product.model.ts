import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    tags: {
      type: [String],
      required: false,
    },
    discount: {
      type: Number,
      required: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    picture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Picture',
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export interface Product extends Document {
  name: string;
  description: string;
  price: number;
  quantity: number;
  tags: string[];
  discount: number;
  category: string;
  picture: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
