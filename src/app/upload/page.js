"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { CATALOG_GROUPS } from "@/data/catalogs";

export default function UploadPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        catalog: "",
        code: "",
        framework: "react",
    });

    if (status === "loading") return <div className="p-20 text-center">Loading...</div>;

    if (status === "unauthenticated") {
        return (
            <div className="container py-20 flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold mb-4">Sign in to Upload</h1>
                <p className="text-muted-foreground mb-8">You need to be logged in to contribute to the community.</p>
                <Button onClick={() => signIn()}>Sign In / Sign Up</Button>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                router.push("/community");
                router.refresh();
            } else {
                alert("Failed to upload");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-12 px-4 max-w-6xl mx-auto min-h-[calc(100vh-4rem)] flex flex-col justify-center">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold mb-4">Share Your Creation</h1>
                <p className="text-muted-foreground">Contribute to the largest open-source UI library.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Form Section */}
                <Card className="p-8 space-y-6 bg-black/40 border-white/10 backdrop-blur-xl h-fit">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80">Title</label>
                            <Input
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                placeholder="E.g., Neon Glowing Card"
                                className="bg-white/5 border-white/10 focus:border-pink-500/50 focus:ring-pink-500/20 transition-all font-medium"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80">Description</label>
                            <textarea
                                className="flex w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/20 focus-visible:border-pink-500/50 disabled:cursor-not-allowed disabled:opacity-50 h-24 hover:bg-white/10 transition-colors resize-none"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                placeholder="Describe the functionality and usage..."
                            />
                        </div>

                        {/* Type Selection - Premium Cards */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-white/80">What are you creating?</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div
                                    onClick={() => setForm({ ...form, type: "component" })}
                                    className={`relative p-4 rounded-xl border transition-all cursor-pointer flex flex-col items-center text-center gap-2 group ${form.type === "component" || !form.type
                                        ? "bg-indigo-500/10 border-indigo-500/50 shadow-[0_0_20px_-5px_#6366f1]"
                                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                                        }`}
                                >
                                    <div className={`p-2 rounded-full ${form.type === "component" || !form.type ? "bg-indigo-500/20 text-indigo-400" : "bg-white/5 text-muted-foreground"}`}>
                                        <div className="w-5 h-5 rounded-md border-2 border-current" />
                                    </div>
                                    <div>
                                        <h3 className={`font-semibold text-sm ${form.type === "component" || !form.type ? "text-indigo-400" : "text-white/70"}`}>UI Component</h3>
                                        <p className="text-[10px] text-muted-foreground mt-0.5 max-w-[120px]">Single element like a button, card, or input.</p>
                                    </div>
                                </div>

                                <div
                                    onClick={() => setForm({ ...form, type: "template" })}
                                    className={`relative p-4 rounded-xl border transition-all cursor-pointer flex flex-col items-center text-center gap-2 group ${form.type === "template"
                                        ? "bg-pink-500/10 border-pink-500/50 shadow-[0_0_20px_-5px_#ec4899]"
                                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                                        }`}
                                >
                                    <div className={`p-2 rounded-full ${form.type === "template" ? "bg-pink-500/20 text-pink-400" : "bg-white/5 text-muted-foreground"}`}>
                                        <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
                                            <div className="bg-current rounded-[1px] opacity-40 col-span-2 h-1.5" />
                                            <div className="bg-current rounded-[1px] opacity-40 h-2.5" />
                                            <div className="bg-current rounded-[1px] opacity-40 h-2.5" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className={`font-semibold text-sm ${form.type === "template" ? "text-pink-400" : "text-white/70"}`}>Full Template</h3>
                                        <p className="text-[10px] text-muted-foreground mt-0.5 max-w-[120px]">Complete page layout or dashboard view.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80">Framework</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/20 focus-visible:border-pink-500/50 hover:bg-white/10 transition-colors"
                                value={form.framework}
                                onChange={(e) => setForm({ ...form, framework: e.target.value })}
                            >
                                <option value="react">React</option>
                                <option value="vue">Vue</option>
                                <option value="html">HTML/CSS</option>
                                <option value="svelte">Svelte</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80">Catalog Group</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/20 focus-visible:border-pink-500/50 hover:bg-white/10 transition-colors"
                                value={form.catalog}
                                onChange={(e) => setForm({ ...form, catalog: e.target.value })}
                            >
                                <option value="">Select Category</option>
                                {CATALOG_GROUPS.map((group) => (
                                    <optgroup key={group.group} label={group.group} className="bg-gray-900 text-white">
                                        {group.items.map((item) => (
                                            <option key={item} value={item} className="bg-gray-900">{item}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80">Code</label>
                            <textarea
                                className="flex w-full rounded-md border border-white/10 bg-black/60 font-mono text-xs text-emerald-400 px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500/50 h-80 leading-relaxed"
                                value={form.code}
                                onChange={(e) => setForm({ ...form, code: e.target.value })}
                                placeholder="Paste your component code here..."
                                spellCheck="false"
                            />
                        </div>

                        <Button
                            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 transition-all shadow-lg shadow-pink-500/20"
                            onClick={handleSubmit}
                            disabled={loading || !form.title || !form.code}
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? "Publishing..." : "Publish Component"}
                        </Button>
                    </div>
                </Card>

                {/* Preview Section */}
                <div className="space-y-6 sticky top-24 h-fit">
                    <Card className="min-h-[500px] flex items-center justify-center p-8 bg-black/40 border-white/10 relative overflow-hidden backdrop-blur-sm border-dashed rounded-xl group transition-colors hover:bg-black/50">
                        {form.code ? (
                            <div className="w-full max-w-full overflow-hidden">
                                <style jsx global>{`
                                    /* Scoped isolation for preview */
                                    .preview-sandbox { all: initial; font-family: sans-serif; }
                                `}</style>
                                <div dangerouslySetInnerHTML={{ __html: form.code }} />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-4 text-muted-foreground/50">
                                <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center">
                                    <Loader2 className="w-6 h-6 animate-[spin_10s_linear_infinite] opacity-50" />
                                </div>
                                <p className="text-sm font-medium uppercase tracking-wider">Live Preview</p>
                            </div>
                        )}

                        <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-xl group-hover:border-white/10 transition-colors" />
                    </Card>

                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex gap-3 items-start">
                        <div className="mt-0.5">
                            <Badge variant="outline" className="text-yellow-500 border-yellow-500/50">Use Safe Code</Badge>
                        </div>
                        <p className="text-xs text-yellow-500/80 leading-relaxed">
                            Ensure your code does not contain malicious scripts. The preview renders HTML directly.
                            Tailwind classes are supported automatically.
                        </p>
                    </div>
                </div>
            </div >
        </div >
    );
}
