import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const type = searchParams.get("type"); // 'component' or 'user'

    try {
        if (type === "component") {
            await prisma.component.delete({ where: { id } });
        } else if (type === "user") {
            await prisma.user.delete({ where: { id } });
        } else {
            return new NextResponse("Invalid type", { status: 400 });
        }

        return new NextResponse("OK");
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
