import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, required: false }, // Password is optional for OAuth users
    emailVerified: Date,
    image: String,
    role: { type: String, default: "USER" }, // USER or ADMIN
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
