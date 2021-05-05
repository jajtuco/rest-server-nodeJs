import { Schema, Model, model, Document, SchemaDefinition, SchemaOptions } from 'mongoose';

const RoleSchema = new Schema(
{
    role:{ 
        type: String,
        required: [true, 'The role is required']
    }

});

interface IRole extends Document {
    name: string,
    
}

// Set mongoose to create a singular collection name
export const Role = model<IRole>('Roles', RoleSchema);