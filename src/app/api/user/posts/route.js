import connectDB from "@/lib/db";
import Component from "@/models/Component";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Find posts where userId matches the session user id
        const posts = await Component.find({ userId: session.user.id })
            .sort({ createdAt: -1 });

        return NextResponse.json(posts);

    } catch (error) {
        console.error("Fetch User Posts Error:", error);
        return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { id } = await req.json();

        // Find component and ensure it belongs to the user
        const component = await Component.findOne({ _id: id, userId: session.user.id });

        if (!component) {
            return new NextResponse("Component not found or unauthorized", { status: 404 });
        }

        await Component.findByIdAndDelete(id);

        return new NextResponse("Deleted", { status: 200 });

    } catch (error) {
        console.error("Delete Post Error:", error);
        return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
    }
}
