import { Schema, model, InferSchemaType } from "mongoose";

const categorySchema = new Schema(
    {
        _id: {
            type: String,
            required: true
        },

        name: { 
            type: String, 
            required: true 
        }
    },
    {
        timestamps: true
    }
);

export type CategoryDocument = InferSchemaType<typeof categorySchema>;

export const MongoCategoryModel = model<CategoryDocument>(
    "Category",
    categorySchema
);
