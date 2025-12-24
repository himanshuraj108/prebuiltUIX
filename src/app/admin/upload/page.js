"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CATALOG_GROUPS } from "@/data/catalogs";
import { Loader2, Save, Plus, X } from "lucide-react";

export default function AdminUploadPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [tagInput, setTagInput] = useState("");

    const [form, setForm] = useState({
        title: "",
        description: "",
        catalog: "",
        group: "", // Logic to auto-select or manually select
        code: "",
        framework: "react",
        isOfficial: true,
        tags: [],
        previewConfig: "{}",
        installationSteps: "",
    });

    const handleAddTag = () => {
        if (!tagInput.trim()) return;
        if (!form.tags.includes(tagInput.trim())) {
            setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
        }
        setTagInput("");
    };

    const handleRemoveTag = (tag) => {
        setForm({ ...form, tags: form.tags.filter(t => t !== tag) });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                router.push("/admin/dashboard");
                router.refresh();
            } else {
                alert("Upload failed");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Flatten catalogs for easier selection if passing ID is needed, 
    // but here we might just store the slug/name as ID isn't easily available from static CATALOG_GROUPS.
    // Ideally we fetch categories from DB. For now, we assume user picks a valid category name.

    return (
        <div className="container py-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                        Universal Component Manager
                    </h1>
                    <p className="text-muted-foreground">Add new components to the official library.</p>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={loading || !form.title} className="bg-red-600 hover:bg-red-700 text-white">
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Save className="mr-2 h-4 w-4" />
                        Save Component
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Metadata */}
                <div className="space-y-6 lg:col-span-1">
                    <Card className="bg-black/40 border-white/10">
                        <CardHeader>
                            <CardTitle>Core Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title</label>
                                <Input
                                    value={form.title}
                                    onChange={e => setForm({ ...form, title: e.target.value })}
                                    placeholder="Component Name"
                                    className="bg-white/5 border-white/10"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <Textarea
                                    value={form.description}
                                    onChange={e => setForm({ ...form, description: e.target.value })}
                                    placeholder="Brief description..."
                                    className="bg-white/5 border-white/10 h-24"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Type</label>
                                    <select
                                        className="w-full bg-black/50 border border-white/10 rounded-md p-2 text-sm"
                                        value={form.type || "component"}
                                        onChange={e => setForm({ ...form, type: e.target.value })}
                                    >
                                        <option value="component">Component</option>
                                        <option value="template">Template</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Framework</label>
                                    <select
                                        className="w-full bg-black/50 border border-white/10 rounded-md p-2 text-sm"
                                        value={form.framework}
                                        onChange={e => setForm({ ...form, framework: e.target.value })}
                                    >
                                        <option value="react">React</option>
                                        <option value="vue">Vue</option>
                                        <option value="html">HTML</option>
                                        <option value="svelte">Svelte</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Catalog</label>
                                <select
                                    className="w-full bg-black/50 border border-white/10 rounded-md p-2 text-sm"
                                    value={form.catalog}
                                    onChange={e => setForm({ ...form, catalog: e.target.value })}
                                >
                                    <option value="">Select...</option>
                                    {CATALOG_GROUPS.map(g => (
                                        <optgroup key={g.group} label={g.group}>
                                            {g.items.map(item => (
                                                <option key={item} value={item}>{item}</option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                                <div className="space-y-0.5">
                                    <label className="text-sm font-medium text-white">Official / Premium</label>
                                    <p className="text-xs text-muted-foreground">Mark as official content</p>
                                </div>
                                <Switch
                                    checked={form.isOfficial}
                                    onCheckedChange={(checked) => setForm({ ...form, isOfficial: checked })}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-white/10">
                        <CardHeader>
                            <CardTitle>Tags & SEO</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    value={tagInput}
                                    onChange={e => setTagInput(e.target.value)}
                                    placeholder="Add tag..."
                                    className="bg-white/5 border-white/10"
                                    onKeyDown={e => e.key === 'Enter' && handleAddTag()}
                                />
                                <Button size="icon" onClick={handleAddTag} variant="secondary">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {form.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="gap-1 pl-2 pr-1 py-1">
                                        {tag}
                                        <button onClick={() => handleRemoveTag(tag)} className="hover:text-red-400">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Code & Config */}
                <div className="lg:col-span-2 space-y-6">
                    <Tabs defaultValue="code" className="w-full">
                        <TabsList className="bg-white/5 border border-white/10 w-full justify-start">
                            <TabsTrigger value="code">Component Code</TabsTrigger>
                            <TabsTrigger value="install">Installation Steps</TabsTrigger>
                            <TabsTrigger value="config">Preview Config</TabsTrigger>
                        </TabsList>

                        <TabsContent value="code" className="mt-4">
                            <Card className="bg-black/40 border-white/10 h-[600px] flex flex-col">
                                <Textarea
                                    value={form.code}
                                    onChange={e => setForm({ ...form, code: e.target.value })}
                                    placeholder="// Paste your component code here..."
                                    className="flex-1 font-mono text-xs bg-black/60 border-0 resize-none p-6 text-emerald-400 focus-visible:ring-0 leading-relaxed"
                                    spellCheck="false"
                                />
                            </Card>
                        </TabsContent>

                        <TabsContent value="install" className="mt-4">
                            <Card className="bg-black/40 border-white/10 h-[600px] flex flex-col">
                                <div className="p-4 text-xs text-muted-foreground border-b border-white/10">
                                    Markdown Supported. Describe how to install dependencies or utils.
                                </div>
                                <Textarea
                                    value={form.installationSteps}
                                    onChange={e => setForm({ ...form, installationSteps: e.target.value })}
                                    placeholder="## Installation&#10;&#10;npm install framer-motion"
                                    className="flex-1 font-mono text-sm bg-black/60 border-0 resize-none p-6 focus-visible:ring-0"
                                />
                            </Card>
                        </TabsContent>

                        <TabsContent value="config" className="mt-4">
                            <Card className="bg-black/40 border-white/10 h-[600px] flex flex-col">
                                <div className="p-4 text-xs text-muted-foreground border-b border-white/10">
                                    JSON Configuration for the Preview Render (Props, Context, etc.)
                                </div>
                                <Textarea
                                    value={form.previewConfig}
                                    onChange={e => setForm({ ...form, previewConfig: e.target.value })}
                                    placeholder={`{
  "darkMode": true,
  "padding": "4rem"
}`}
                                    className="flex-1 font-mono text-xs bg-black/60 border-0 resize-none p-6 text-yellow-400 focus-visible:ring-0"
                                />
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
