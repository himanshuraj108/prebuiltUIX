import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    emailVerified: Date,
    image: String,
    role: { type: String, default: "USER" }, // USER or ADMIN
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
