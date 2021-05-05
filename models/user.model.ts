import { Schema, Model, model, Document, SchemaDefinition, SchemaOptions } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'The name is required']
    },
    email: {
      type: String,
      required: [true, 'The email is required'],
      unique: true
    },

    password: {
      type: String,
      required: [true, 'The password is required'],
      default: '###'
    },

    img: {
      type: String
    },

    role: {
      type: String,
      required: true,
      enum: ['ADMIN_ROLE', 'USER_ROLE'],
      default: 'USER_ROLE'
    },

    state: {
      type: Boolean,
      default: true
    },

    google: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: {
      transform: (doc, rest): any => {
        const { __v, password, ...object } = rest;
        return object;
      }
    }
  }
);

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  img: string;
  role: string;
  google: boolean;
  state: boolean;
}

// Set mongoose to create a singular collection name
export const User = model<IUser>('User', UserSchema);
