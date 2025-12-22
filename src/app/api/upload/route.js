import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();
        const { title, description, code, framework, catalog, tags, previewConfig, installationSteps, isOfficial } = body;

        if (!title || !code) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        let userId = session.user.id;

        // Ensure user exists in DB (for Admin Provider users)
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            const newUser = await prisma.user.create({
                data: {
                    name: session.user.name,
                    email: session.user.email,
                    role: session.user.role || "USER",
                }
            });
            userId = newUser.id;
        } else {
            userId = user.id;
        }

        const component = await prisma.component.create({
            data: {
                title,
                description,
                code,
                framework: framework || "react",
                category: catalog || "Uncategorized",
                tags: Array.isArray(tags) ? tags.join(",") : tags,
                previewConfig,
                installationSteps,
                catalogId: undefined, // Using category string for now
                userId,
                isOfficial: isOfficial !== undefined ? isOfficial : session.user.role === "ADMIN",
            },
        });

        return NextResponse.json(component);
    } catch (error) {
        console.error("Upload error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
