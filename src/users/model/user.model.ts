import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
      required: false,
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

export interface User extends mongoose.Document {
  name: string;
  lastName: string;
  email: string;
  password: string;
  birthdate: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
