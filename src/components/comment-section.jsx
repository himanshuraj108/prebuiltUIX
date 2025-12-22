"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, ThumbsUp, MoreHorizontal, CornerDownRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { useRouter } from "next/navigation";

export function CommentSection({ componentId, initialComments = [], currentUser }) {
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState("");
    const [replyingTo, setReplyingTo] = useState(null); // Comment ID being replied to
    const [replyText, setReplyText] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleToggleLike = async (commentId, replyId = null) => {
        if (!currentUser) {
            router.push("/login");
            return;
        }

        // Optimistic Update
        const updateLikes = (items) => {
            return items.map(item => {
                const itemId = item._id || item.id;
                const targetId = replyId || commentId;

                if (itemId === targetId) {
                    const userId = currentUser.id || currentUser.email;
                    const likes = item.likes || [];
                    const isLiked = likes.includes(userId);
                    return {
                        ...item,
                        likes: isLiked
                            ? likes.filter(id => id !== userId)
                            : [...likes, userId]
                    };
                }

                // If checking for reply, recurse into replies of this comment?
                // Actually structure is simpler: comment -> replies.
                if (item.replies && !replyId && itemId === commentId) {
                    // If we are liking the parent, we don't change replies
                    return item;
                }

                // If we are looking for a reply, searches inside this comment
                if (replyId && item._id === commentId && item.replies) {
                    return {
                        ...item,
                        replies: updateLikes(item.replies)
                    };
                }

                return item;
            });
        };

        // Simpler approach for optimistic update specific to our structure
        setComments(prev => prev.map(c => {
            // If liking a Reply
            if (replyId) {
                if (c._id === commentId && c.replies) {
                    return {
                        ...c,
                        replies: c.replies.map(r => {
                            if (r._id === replyId) {
                                const userId = currentUser.id || currentUser.email;
                                const likes = r.likes || [];
                                const isLiked = likes.includes(userId);
                                return { ...r, likes: isLiked ? likes.filter(id => id !== userId) : [...likes, userId] };
                            }
                            return r;
                        })
                    };
                }
                return c;
            }
            // If liking a Comment
            if (c._id === commentId) {
                const userId = currentUser.id || currentUser.email;
                const likes = c.likes || [];
                const isLiked = likes.includes(userId);
                return { ...c, likes: isLiked ? likes.filter(id => id !== userId) : [...likes, userId] };
            }
            return c;
        }));


        try {
            const res = await fetch("/api/comments", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    componentId,
                    commentId,
                    replyId
                })
            });

            if (!res.ok) {
                // Revert if failed (todo: implement robust revert)
                console.error("Failed to like");
            }
        } catch (error) {
            console.error("Like error", error);
        }
    };

    const handleAddComment = async (parentId = null) => {
        if (!currentUser) {
            router.push("/login");
            return;
        }

        const textToSubmit = parentId ? replyText : newComment;
        if (!textToSubmit.trim()) return;

        setLoading(true);
        try {
            const res = await fetch("/api/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    componentId,
                    text: textToSubmit,
                    replyToId: parentId
                })
            });

            if (res.ok) {
                const addedComment = await res.json();

                if (parentId) {
                    // Add reply to specific comment
                    setComments(comments.map(c => {
                        if (c._id === parentId) {
                            return {
                                ...c,
                                replies: [...(c.replies || []), addedComment]
                            };
                        }
                        return c;
                    }));
                    setReplyingTo(null);
                    setReplyText("");
                } else {
                    // Add new top level comment
                    setComments([addedComment, ...comments]);
                    setNewComment("");
                }
            } else {
                const errorMsg = await res.text();
                console.error("Failed to add comment:", errorMsg);
                alert(`Error: ${errorMsg}`);
            }
        } catch (error) {
            console.error("Error adding comment:", error);
            alert("Something went wrong. Check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            {/* New Comment Input */}
            <div className="flex gap-4 mb-8">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={currentUser?.image} />
                    <AvatarFallback>{currentUser?.name?.[0]?.toUpperCase() || "?"}</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                    <Input
                        placeholder="Add a public comment..."
                        className="bg-transparent border-0 border-b border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-white px-0"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button
                        disabled={!newComment.trim() || loading}
                        onClick={() => handleAddComment(null)}
                        size="sm"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white"
                    >
                        Comment
                    </Button>
                </div>
            </div>

            {/* Comment List */}
            <div className="space-y-6">
                {comments.map((comment) => (
                    <div key={comment._id} className="flex gap-4 group">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.userName}`} />
                            <AvatarFallback>{comment.userName?.[0]}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                            {/* Comment Header */}
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm">@{comment.userName}</span>
                                <span className="text-xs text-muted-foreground">
                                    {comment.createdAt ? formatDistanceToNow(new Date(comment.createdAt)) : 'just now'} ago
                                </span>
                            </div>

                            {/* Comment Text */}
                            <p className="text-sm text-gray-300 mb-2">{comment.text}</p>

                            {/* Interaction Bar */}
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <button
                                    className={`flex items-center gap-1 transition-colors ${comment.likes?.includes(currentUser?.id || currentUser?.email) ? "text-indigo-400" : "hover:text-white"}`}
                                    onClick={() => handleToggleLike(comment._id)}
                                >
                                    <ThumbsUp className={`h-3 w-3 ${comment.likes?.includes(currentUser?.id || currentUser?.email) ? "fill-current" : ""}`} />
                                    <span>{comment.likes?.length || 0}</span>
                                </button>
                                <button
                                    className="hover:text-white transition-colors"
                                    onClick={() => {
                                        if (replyingTo !== comment._id) {
                                            setReplyingTo(comment._id);
                                            setReplyText(`@${comment.userName} `);
                                        } else {
                                            setReplyingTo(null);
                                        }
                                    }}
                                >
                                    Reply
                                </button>
                            </div>

                            {/* Reply Input */}
                            {replyingTo === comment._id && (
                                <div className="mt-4 flex gap-3 animate-in fade-in slide-in-from-top-1">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={currentUser?.image} />
                                        <AvatarFallback>{currentUser?.name?.[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 flex gap-2">
                                        <Input
                                            placeholder="Add a reply..."
                                            className="h-8 text-sm bg-transparent border-0 border-b border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-white px-0"
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            autoFocus
                                        />
                                        <div className="flex gap-1">
                                            <Button size="sm" variant="ghost" className="h-8 text-xs" onClick={() => setReplyingTo(null)}>Cancel</Button>
                                            <Button
                                                size="sm"
                                                className="h-8 text-xs bg-indigo-600 hover:bg-indigo-500 text-white"
                                                disabled={!replyText.trim() || loading}
                                                onClick={() => handleAddComment(comment._id)}
                                            >
                                                Reply
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Nested Replies */}
                            {comment.replies && comment.replies.length > 0 && (
                                <div className="mt-3 space-y-4">
                                    {comment.replies.map((reply, index) => (
                                        <div key={reply._id || index} className="flex gap-3">
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${reply.userName}`} />
                                                <AvatarFallback>{reply.userName?.[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <span className="font-semibold text-xs">@{reply.userName}</span>
                                                    <span className="text-[10px] text-muted-foreground">
                                                        {reply.createdAt ? formatDistanceToNow(new Date(reply.createdAt)) : 'just now'} ago
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-300 mb-1">{reply.text}</p>
                                                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                                                    <button
                                                        className={`flex items-center gap-1 transition-colors ${reply.likes?.includes(currentUser?.id || currentUser?.email) ? "text-indigo-400" : "hover:text-white"}`}
                                                        onClick={() => handleToggleLike(comment._id, reply._id)}
                                                    >
                                                        <ThumbsUp className={`h-2.5 w-2.5 ${reply.likes?.includes(currentUser?.id || currentUser?.email) ? "fill-current" : ""}`} />
                                                        <span>{reply.likes?.length || 0}</span>
                                                    </button>
                                                    <button
                                                        className="hover:text-white transition-colors"
                                                        onClick={() => {
                                                            setReplyingTo(comment._id);
                                                            setReplyText(`@${reply.userName} `);
                                                        }}
                                                    >
                                                        Reply
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
