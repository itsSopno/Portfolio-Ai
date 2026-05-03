import { Document, model, Schema } from "mongoose";

export interface User extends Document {
    name: string;
    email: string;
    bio: string;
    skills: string[];
    experience: string;
    socialLinks: {
        github?: string;
        linkedin?: string;
        twitter?: string;
    }
}

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String, default: "" },
    skills: { type: [String], default: [] },
    experience: { type: String, default: "" },
    socialLinks: {
        github: { type: String },
        linkedin: { type: String },
        twitter: { type: String }
    }
});

const UserModel = model<User>("User", userSchema);
export default UserModel;