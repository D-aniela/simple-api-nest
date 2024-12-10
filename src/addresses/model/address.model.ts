import * as mongoose from 'mongoose';

export const AddressSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    complement: {
      type: String,
      required: false,
    },
    zipCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
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

export interface Address extends mongoose.Document {
  street: string;
  number: string;
  complement: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
