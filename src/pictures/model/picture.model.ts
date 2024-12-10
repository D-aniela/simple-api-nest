import * as mongoose from 'mongoose';

export const PictureSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export interface Picture extends Document {
  url: string;
  format: string;
  createdAt: Date;
  updatedAt: Date;
}
