import prisma from "@/lib/prisma";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns"; // Standard util, but might need install. Will use fallback.

async function getCommunityComponents() {
    try {
        const components = await prisma.component.findMany({
            where: { isOfficial: false },
            orderBy: { createdAt: "desc" },
            include: { user: true },
            take: 20
        });
        return components;
    } catch (error) {
        console.error("Failed to fetch community components:", error);
        return [];
    }
}

export default async function CommunityPage() {
    const components = await getCommunityComponents();

    return (
        <div className="container py-12 px-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                        Community Hub
                    </h1>
                    <p className="text-muted-foreground max-w-lg">
                        Discover unique UI components built by the PrebuiltUIX community.
                    </p>
                </div>
                <Link href="/upload">
                    <Button variant="neo" className="h-12 px-8 text-base shadow-[0_0_20px_-5px_#ec4899] hover:shadow-[0_0_30px_-5px_#ec4899] transition-all">
                        Upload Component
                    </Button>
                </Link>
            </div>

            {components.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                        <Eye className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">No components found yet</h3>
                    <p className="text-muted-foreground mb-8 max-w-md text-center">
                        The community feed is empty. Be the first developer to share your creation with the world.
                    </p>
                    <Link href="/upload">
                        <Button size="lg" className="bg-white text-black hover:bg-white/90">Share Your Work</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {components.map((comp) => (
                        <Link href={`/components/${comp.id}`} key={comp.id} className="group">
                            <Card className="h-full bg-black/40 border-white/10 overflow-hidden hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(236,72,153,0.2)]">
                                <div className="h-56 bg-gradient-to-br from-gray-900 via-black to-[#0a0a0a] relative flex items-center justify-center border-b border-white/5 group-hover:from-gray-900 group-hover:via-gray-900 group-hover:to-black transition-colors">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-xs font-mono text-white/30 group-hover:text-white/50 transition-colors uppercase tracking-widest">
                                        {comp.framework}
                                    </span>
                                </div>
                                <CardHeader className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <CardTitle className="text-xl font-bold line-clamp-1 group-hover:text-pink-500 transition-colors">{comp.title}</CardTitle>
                                        <Badge variant="outline" className="bg-white/5 border-white/10 text-[10px] h-5">
                                            {comp.framework}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                        {comp.description || "No description provided."}
                                    </p>
                                </CardHeader>
                                <CardFooter className="p-6 pt-0 flex justify-between text-xs text-muted-foreground mt-auto border-t border-white/5">
                                    <div className="flex items-center gap-2 pt-4">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold shadow-lg">
                                            {comp.user?.name?.[0].toUpperCase() || "U"}
                                        </div>
                                        <span className="text-white/80">{comp.user?.name || "Anonymous"}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 pt-4 text-white/40">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>
                                            {new Date(comp.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
