// Community Page
// import prisma from "@/lib/prisma"; // REMOVED
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import connectDB from "@/lib/db";
import Component from "@/models/Component";
import { SocialCard } from "@/components/social-card";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function getCommunityComponents() {
    try {
        await connectDB();
        // lean() converts Mongoose documents to plain JS objects
        const components = await Component.find({ isOfficial: false })
            .sort({ createdAt: -1 })
            .limit(20)
            .lean();

        // Helper to serialize array of comments/replies
        const serializeComments = (comments) => {
            if (!comments) return [];
            return comments.map(c => ({
                ...c,
                _id: c._id.toString(),
                createdAt: c.createdAt?.toISOString(),
                likes: c.likes || [],
                replies: c.replies ? c.replies.map(r => ({
                    ...r,
                    _id: r._id.toString(),
                    createdAt: r.createdAt?.toISOString(),
                    likes: r.likes || []
                })) : []
            }));
        };

        return components.map(doc => {
            const { _id, __v, comments, ...rest } = doc;
            return {
                ...rest,
                id: _id.toString(),
                createdAt: doc.createdAt?.toISOString(),
                updatedAt: doc.updatedAt?.toISOString(),
                comments: serializeComments(comments)
            };
        });
    } catch (error) {
        console.error("Failed to fetch community components:", error);
        return [];
    }
}

export default async function CommunityPage() {
    const components = await getCommunityComponents();
    const session = await getServerSession(authOptions);
    const currentUser = session?.user;

    return (
        <div className="container py-8 px-4 max-w-5xl mx-auto">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6 border-b border-white/5 pb-8">
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                        Community Feed
                    </h1>
                    <p className="text-muted-foreground">
                        The latest creations from the community.
                    </p>
                </div>
                <Link href="/upload">
                    <Button variant="neo" className="h-10 px-6 shadow-[0_0_20px_-5px_#ec4899] hover:shadow-[0_0_30px_-5px_#ec4899] transition-all">
                        Create Post
                    </Button>
                </Link>
            </div>

            {components.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh] bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                        <Eye className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">No posts yet</h3>
                    <p className="text-muted-foreground mb-8 max-w-md text-center">
                        The feed is quiet. Be the first to share something amazing!
                    </p>
                    <Link href="/upload">
                        <Button size="lg" className="bg-white text-black hover:bg-white/90">Create Post</Button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-8">
                    {components.map((comp) => (
                        <SocialCard key={comp.id} component={comp} currentUser={currentUser} />
                    ))}
                </div>
            )}
        </div>
    );
}
