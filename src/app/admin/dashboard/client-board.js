"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash2, User, FileCode, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Assuming Tabs wrapper works or we simulate

function SimpleTabs({ children }) {
    const [active, setActive] = useState("components");
    return (
        <div>
            <div className="flex space-x-4 mb-6 border-b border-white/10 pb-2">
                <button onClick={() => setActive("components")} className={`${active === "components" ? "text-white border-b-2 border-red-500" : "text-muted-foreground"}`}>Components</button>
                <button onClick={() => setActive("users")} className={`${active === "users" ? "text-white border-b-2 border-red-500" : "text-muted-foreground"}`}>Users</button>
            </div>
            <div className="absolute top-0 right-0">
                <Button onClick={() => window.location.href = '/admin/upload'} className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20">
                    <Plus className="h-4 w-4 mr-2" /> Upload New
                </Button>
            </div>
            {children(active)}
        </div>
    );
}

export default function AdminClientBoard({ initialComponents, initialUsers }) {
    const router = useRouter();
    const [loading, setLoading] = useState(null);

    const handleDelete = async (id, type) => {
        if (!confirm("Are you sure? This cannot be undone.")) return;
        setLoading(id);
        try {
            const res = await fetch(`/api/admin?id=${id}&type=${type}`, { method: "DELETE" });
            if (res.ok) {
                router.refresh();
            } else {
                alert("Failed to delete");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(null);
        }
    };

    return (
        <SimpleTabs>
            {(active) => (
                <>
                    {active === "components" && (
                        <div className="grid gap-4">
                            <h2 className="text-xl font-semibold mb-4">Managing {initialComponents.length} Uploads</h2>
                            {initialComponents.map((comp) => (
                                <Card key={comp.id} className="flex justify-between items-center p-4">
                                    <div>
                                        <h4 className="font-bold flex items-center gap-2">
                                            {comp.title}
                                            {comp.type === 'template' && <span className="text-[10px] bg-pink-500/20 text-pink-400 px-1 rounded uppercase">Template</span>}
                                        </h4>
                                        <p className="text-xs text-muted-foreground">by {comp.author || "Anonymous"} | {comp.framework} | {comp.isOfficial ? "OFFICIAL" : "Community"}</p>
                                    </div>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(comp.id, "component")} disabled={loading === comp.id}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    )}

                    {active === "users" && (
                        <div className="grid gap-4">
                            <h2 className="text-xl font-semibold mb-4">Managing {initialUsers.length} Users</h2>
                            {initialUsers.map((user) => (
                                <Card key={user.id} className="flex justify-between items-center p-4">
                                    <div>
                                        <h4 className="font-bold flex items-center gap-2"><User className="h-4 w-4" /> {user.name}</h4>
                                        <p className="text-xs text-muted-foreground">{user.email} | {user.role}</p>
                                    </div>
                                    {user.role !== "ADMIN" && (
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id, "user")} disabled={loading === user.id}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </Card>
                            ))}
                        </div>
                    )}
                </>
            )}
        </SimpleTabs>
    );
}
