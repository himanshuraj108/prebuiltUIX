import connectDB from "@/lib/db";
import Component from "@/models/Component";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminClientBoard from "./client-board";

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
        redirect("/");
    }

    await connectDB();

    const rawComponents = await Component.find({}).sort({ createdAt: -1 }).lean();
    const components = rawComponents.map(doc => {
        const { _id, __v, ...rest } = doc;
        return {
            ...rest,
            id: _id.toString(),
            createdAt: doc.createdAt?.toISOString(),
            updatedAt: doc.updatedAt?.toISOString()
        };
    });

    const rawUsers = await User.find({}).sort({ createdAt: -1 }).lean();
    const users = rawUsers.map(doc => {
        const { _id, __v, ...rest } = doc;
        return {
            ...rest,
            id: _id.toString(),
            createdAt: doc.createdAt?.toISOString(),
            updatedAt: doc.updatedAt?.toISOString()
        };
    });

    return (
        <div className="container py-12 px-4">
            <h1 className="text-3xl font-bold mb-8 text-red-500">Admin Dashboard</h1>
            <AdminClientBoard initialComponents={components} initialUsers={users} />
        </div>
    );
}
