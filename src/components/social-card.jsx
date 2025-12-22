"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, MoreHorizontal } from "lucide-react";
import { ComponentView } from "./component-view";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { CommentSection } from "./comment-section";
import { useRouter } from "next/navigation";

export function SocialCard({ component, currentUser }) {
    const [liked, setLiked] = useState((component.likes || []).includes(currentUser?.id));
    const [likesCount, setLikesCount] = useState((component.likes || []).length);
    const [disliked, setDisliked] = useState(false); // Simple local state for demo
    const [showComments, setShowComments] = useState(false);
    const router = useRouter(); // Import useRouter from next/navigation

    const checkAuth = () => {
        if (!currentUser) {
            router.push("/login");
            return false;
        }
        return true;
    };

    const handleLike = () => {
        if (!checkAuth()) return;

        // Here we would call API to toggle like
        if (liked) {
            setLikesCount(prev => prev - 1);
        } else {
            setLikesCount(prev => prev + 1);
            if (disliked) setDisliked(false);
        }
        setLiked(!liked);
    };

    const handleDislike = () => {
        if (!checkAuth()) return;

        if (disliked) {
            setDisliked(false);
        } else {
            setDisliked(true);
            if (liked) {
                setLiked(false);
                setLikesCount(prev => prev - 1);
            }
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden mb-8 shadow-2xl">
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-white/5 bg-black/40">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-white/10">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${component.author}`} />
                        <AvatarFallback>{component.author?.[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-sm hover:underline cursor-pointer">{component.author}</h3>
                            <Badge variant="outline" className="text-[10px] h-4 px-1 text-muted-foreground border-white/10">
                                {component.framework}
                            </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {component.createdAt ? formatDistanceToNow(new Date(component.createdAt), { addSuffix: true }) : "Just now"}
                        </p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </div>

            {/* Post Content (Caption) */}
            <div className="px-5 py-3 text-sm text-gray-300">
                <p>{component.description || `Check out this new ${component.title} component I built!`}</p>
            </div>

            {/* Component Preview */}
            <div className="border-y border-white/5 bg-black/20">
                {/* 
                   We use ComponentView in isFeedView mode. 
                   Pass full width to encourage full desktop view inside the feed 
                 */}
                <div className="p-4">
                    <ComponentView data={component} isFeedView={true} />
                </div>
            </div>

            {/* Footer / Interactions */}
            <div className="p-3 border-t border-white/5 bg-black/40">

                {/* Stats */}
                <div className="flex justify-between items-center px-2 mb-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        {likesCount > 0 && (
                            <>
                                <div className="bg-indigo-500 p-0.5 rounded-full">
                                    <ThumbsUp className="h-2 w-2 text-white" fill="white" />
                                </div>
                                <span>{likesCount} {likesCount === 1 ? 'like' : 'likes'}</span>
                            </>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <span>{component.comments?.length || 0} comments</span>
                        <span>{component.shares || 0} shares</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between border-t border-white/5 pt-2">
                    <Button
                        variant="ghost"
                        className={`flex-1 gap-2 hover:bg-white/5 ${liked ? "text-indigo-400" : "text-muted-foreground"}`}
                        onClick={handleLike}
                    >
                        <ThumbsUp className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
                        Like
                    </Button>
                    <Button
                        variant="ghost"
                        className={`flex-1 gap-2 hover:bg-white/5 ${disliked ? "text-red-400" : "text-muted-foreground"}`}
                        onClick={handleDislike}
                    >
                        <ThumbsDown className={`h-4 w-4 ${disliked ? "fill-current" : ""}`} />
                        Dislike
                    </Button>
                    <Button
                        variant="ghost"
                        className={`flex-1 gap-2 hover:bg-white/5 ${showComments ? "text-indigo-400 bg-white/5" : "text-muted-foreground"}`}
                        onClick={() => {
                            // Optional: Allow viewing comments even if logged out? 
                            // User asked for "like unlike and comment user should be authorized". 
                            // Viewing is usually fine, but let's enforce it for the ACTION of commenting.
                            // I'll keep view open, but input is protected.
                            setShowComments(!showComments);
                        }}
                    >
                        <MessageSquare className="h-4 w-4" />
                        Comment
                    </Button>
                    <Button variant="ghost" className="flex-1 gap-2 text-muted-foreground hover:bg-white/5">
                        <Share2 className="h-4 w-4" />
                        Share
                    </Button>
                </div>

                {/* Comment Section (Collapsible) */}
                {showComments && (
                    <div className="mt-4 pt-4 border-t border-white/5 animate-in fade-in slide-in-from-top-2">
                        <CommentSection
                            componentId={component.id || component._id}
                            initialComments={component.comments || []}
                            currentUser={currentUser}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
