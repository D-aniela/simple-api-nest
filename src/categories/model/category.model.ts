import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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

export interface Category extends Document {
  name: string;
  description: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
