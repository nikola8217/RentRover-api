import { Schema, model, InferSchemaType } from "mongoose";

const brandSchema = new Schema(
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

export type BrandDocument = InferSchemaType<typeof brandSchema>;

export const MongoBrandModel = model<BrandDocument>(
    "Brand",
    brandSchema
);
