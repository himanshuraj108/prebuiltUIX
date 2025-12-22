import mongoose from "mongoose";

const ComponentSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    framework: { type: String, default: "react" },
    category: { type: String, default: "Uncategorized" },
    tags: String,
    previewConfig: String,
    installationSteps: String,
    isOfficial: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    author: { type: String, default: "Anonymous" },
    userId: String, // Just a reference ID, usually email or sub
}, { timestamps: true });

export default mongoose.models.Component || mongoose.model("Component", ComponentSchema);
