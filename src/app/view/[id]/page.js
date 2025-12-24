import { TemplateView } from "@/components/template-view";
import connectDB from "@/lib/db";
import Component from "@/models/Component";
import { notFound } from "next/navigation";

export default async function ViewPage({ params }) {
    const { id } = await params;

    await connectDB();

    const raw = await Component.findById(id).lean();
    if (!raw) return notFound();

    const data = {
        ...raw,
        _id: raw._id.toString(),
        createdAt: raw.createdAt?.toISOString(),
        updatedAt: raw.updatedAt?.toISOString(),
    };

    return <TemplateView data={data} />;
}
