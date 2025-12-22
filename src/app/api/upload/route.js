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
        const { title, description, code, framework } = body;

        if (!title || !code) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        // Basic User finding or creating (mock behavior since we use Github/Google providers that might not have seeded the User in Prisma yet if using basic NextAuth flow without full adapter syncing sometimes)
        // Actually, PrismaAdapter handles user creation on login.
        // But for the Admin credential provider, we need to ensure the user exists.

        let userId = session.user.id;

        // For Admin Credential provider, valid ID might not be a real db ID if not handled by adapter.
        // We'll search for user by email.
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            // Create user on the fly if it doesn't exist (e.g. Admin first time)
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
                userId,
                isOfficial: session.user.role === "ADMIN", // Auto-official if admin
            },
        });

        return NextResponse.json(component);
    } catch (error) {
        console.error("Upload error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
