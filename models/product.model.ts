import { Schema, Model, model, Document, SchemaDefinition, SchemaOptions } from 'mongoose';

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name is required'],
    unique: true
  },
  state: {
    type: Boolean,
    default: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  description: {
    type: String
  },
  available: {
    type: String,
    default: true
  },
  img: {
    type: String
  },
},
  {
    toJSON: {
      transform: (doc, rest): any => {
        const { __v, state, ...object } = rest;
        return object;
      }
    }
  });

interface IProduct extends Document {
  name: string;
  state: boolean;
  user: Object;
  price: number;
  category: Object;
  description: string;
  img: string;
  available: boolean;
}

// Set mongoose to create a singular collection name
export const Product = model<IProduct>('Product', ProductSchema);
