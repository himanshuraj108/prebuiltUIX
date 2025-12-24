import mongoose from "mongoose";

const ComponentSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    framework: { type: String, default: "react" },
    type: { type: String, default: "component", enum: ["component", "template"] },
    category: { type: String, default: "Uncategorized" },
    tags: String,
    previewConfig: String,
    installationSteps: String,
    isOfficial: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    likes: [{ type: String }], // Array of User IDs
    comments: [{
        userId: String,
        userName: String,
        userImage: String,
        text: String,
        createdAt: { type: Date, default: Date.now },
        likes: [{ type: String }],
        replies: [{
            userId: String,
            userName: String,
            userImage: String,
            text: String,
            createdAt: { type: Date, default: Date.now },
            likes: [{ type: String }]
        }]
    }],
    shares: { type: Number, default: 0 },
    author: { type: String, default: "Anonymous" },
    userId: String, // Just a reference ID, usually email or sub
}, { timestamps: true });

export default mongoose.models.Component || mongoose.model("Component", ComponentSchema);
