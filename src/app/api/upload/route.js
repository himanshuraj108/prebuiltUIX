import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import Component from "@/models/Component";
import { NextResponse } from "next/server";

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        await connectDB();

        const body = await req.json();
        const { title, description, code, framework, catalog, tags, previewConfig, installationSteps, isOfficial } = body;

        if (!title || !code) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        // Mongoose Create
        const component = await Component.create({
            title,
            description,
            code,
            framework: framework || "react",
            category: catalog || "Uncategorized",
            tags: Array.isArray(tags) ? tags.join(",") : tags,
            previewConfig,
            installationSteps,
            // Decoupled from User model to allow standalone DB inserts
            author: session.user.name || "Anonymous",
            userId: session.user.id || "manual-upload",
            isOfficial: isOfficial !== undefined ? isOfficial : session.user.role === "ADMIN",
        });

        return NextResponse.json(component);
    } catch (error) {
        console.error("Upload error:", error);
        return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
    }
}
