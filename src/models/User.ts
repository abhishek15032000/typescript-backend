import mongoose ,{Schema, Document, Model} from "mongoose";

export interface IUser extends Document{
    name: string;
    email: string;
    password: string;
}

const UserSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [50, "Name must be at most 50 characters long"]
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        index: true,
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;