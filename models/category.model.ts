import { Schema, Model, model, Document, SchemaDefinition, SchemaOptions } from 'mongoose';

const CategorySchema = new Schema({
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
  }
},
  {
    toJSON: {
      transform: (doc, rest): any => {
        const { __v, state, ...object } = rest;
        return object;
      }
    }
  });

interface ICategory extends Document {
  name: string;
  state: boolean;
  user: Object;
}

// Set mongoose to create a singular collection name
export const Category = model<ICategory>('Category', CategorySchema);
