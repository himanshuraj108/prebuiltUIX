import connectDB from "@/lib/db";
import Component from "@/models/Component";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Absolute import to be safe
import mongoose from "mongoose";

export async function POST(req) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { componentId, text, replyToId } = await req.json();

        if (!componentId || !text) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        const component = await Component.findById(componentId);
        if (!component) {
            return new NextResponse("Component not found", { status: 404 });
        }

        const newComment = {
            _id: new mongoose.Types.ObjectId(), // Create explicit ID for client-side keys
            userId: session.user.id || session.user.email, // Fallback if id missing
            userName: session.user.name || "Anonymous",
            userImage: session.user.image,
            text,
            createdAt: new Date(),
            likes: [],
            replies: []
        };

        if (replyToId) {
            // Check if comments array exists before trying to find subdocument
            if (!component.comments) {
                return new NextResponse("Parent comment not found", { status: 404 });
            }

            // Find the parent comment and push to replies
            // Manual find is safer for String vs ObjectId comparison
            const parentComment = component.comments.find(c => c._id.toString() === replyToId);
            if (!parentComment) {
                return new NextResponse("Parent comment not found", { status: 404 });
            }
            // Ensure replies array exists (for backward compatibility)
            if (!parentComment.replies) {
                parentComment.replies = [];
            }
            parentComment.replies.push(newComment);
        } else {
            // Top level comment
            // Ensure comments array exists
            if (!component.comments) {
                component.comments = [];
            }
            component.comments.push(newComment);
        }

        await component.save();

        return NextResponse.json(newComment);

        // ... existing POST ...

    } catch (error) {
        console.error("Comment Error", error);
        return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { componentId, commentId, replyId } = await req.json();
        const userId = session.user.id || session.user.email;

        // Use findOne to get the document
        const component = await Component.findById(componentId);
        if (!component) {
            return new NextResponse("Component not found", { status: 404 });
        }

        // Find comment
        const comment = component.comments.find(c => c._id.toString() === commentId);
        if (!comment) {
            return new NextResponse("Comment not found", { status: 404 });
        }

        let target = comment;
        if (replyId) {
            if (!comment.replies) comment.replies = [];
            target = comment.replies.find(r => r._id.toString() === replyId);
            if (!target) {
                return new NextResponse("Reply not found", { status: 404 });
            }
        }

        // Toggle Like
        if (!target.likes) target.likes = [];
        const index = target.likes.indexOf(userId);

        if (index === -1) {
            target.likes.push(userId);
        } else {
            target.likes.splice(index, 1);
        }

        await component.save();

        return NextResponse.json({
            likes: target.likes,
            liked: index === -1
        });

    } catch (error) {
        console.error("Like Error", error);
        return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
    }
}
