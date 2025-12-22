import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminClientBoard from "./client-board";

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
        redirect("/");
    }

    const components = await prisma.component.findMany({
        include: { user: true },
        orderBy: { createdAt: "desc" },
    });

    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="container py-12 px-4">
            <h1 className="text-3xl font-bold mb-8 text-red-500">Admin Dashboard</h1>
            <AdminClientBoard initialComponents={components} initialUsers={users} />
        </div>
    );
}
