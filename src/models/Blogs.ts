import mongoose, {Schema, Document, Model, Types} from "mongoose";

export interface IBlog extends Document {
    title: string;
    content: string;
    imageUrl?: string;
    author: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const blogSchema : Schema<IBlog> = new Schema<IBlog>({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    imageUrl: { type: String, trim: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
}, {
    timestamps: true
})

export const Blog : Model<IBlog> = mongoose.model("Blog", blogSchema);

export default Blog;
