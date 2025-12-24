import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Layout } from "lucide-react";
import connectDB from "@/lib/db";
import Component from "@/models/Component";

export const metadata = {
    title: "Official Templates - PrebuiltUIX",
    description: "Premium, production-ready templates for your next project.",
};

export default async function TemplatesPage() {
    await connectDB();

    // Fetch ONLY Official Templates
    const templates = await Component.find({
        isOfficial: true,
        type: "template"
    })
        .sort({ createdAt: -1 })
        .lean();

    return (
        <div className="container py-12 px-4 md:px-8 max-w-[1600px] mx-auto min-h-screen">
            <div className="mb-12 border-b border-white/10 pb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                            Official Templates
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            Production-ready layouts and dashboards, crafted by the PrebuiltUIX team.
                        </p>
                    </div>
                    <div>
                        {/* Link to Community Templates if they want user submissions */}
                        <Link href="/community?type=templates">
                            <Button variant="outline" className="gap-2">
                                <Eye className="w-4 h-4" />
                                Community Templates
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {templates.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-white/10 border-dashed">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                        <Layout className="w-10 h-10 text-muted-foreground opacity-50" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Coming Soon</h3>
                    <p className="text-muted-foreground max-w-md text-center">
                        We are crafting high-quality templates for you. Check back later!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {templates.map((template) => (
                        <Link key={template._id} href={`/view/${template._id}`}>
                            <div className="group relative block h-full">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
                                <Card className="relative h-full flex flex-col bg-black border-white/10 overflow-hidden rounded-xl hover:bg-black/80 transition-colors">
                                    {/* Preview Area (Simulated) */}
                                    <div className="h-48 bg-gradient-to-br from-gray-900 to-black border-b border-white/10 p-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                        <div className="w-32 h-20 rounded border border-white/10 bg-white/5 shadow-2xl skew-y-3 group-hover:skew-y-0 transition-all duration-500" />
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center justify-between mb-2">
                                            <Badge variant="outline" className="border-pink-500/30 text-pink-400 bg-pink-500/10">
                                                {template.framework}
                                            </Badge>
                                            <Badge variant="secondary" className="text-xs">
                                                Official
                                            </Badge>
                                        </div>

                                        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-pink-400 transition-colors">
                                            {template.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
                                            {template.description}
                                        </p>

                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto pt-4 border-t border-white/10">
                                            <span>{template.views || 0} views</span>
                                            <span>•</span>
                                            <span>{template.category}</span>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
