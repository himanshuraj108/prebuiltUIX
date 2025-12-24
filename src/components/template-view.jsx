"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Monitor, Tablet, Smartphone, ArrowLeft, Check, Code, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { LiveProvider, LiveError, LivePreview } from "react-live";
import * as LucideIcons from "lucide-react";

export function TemplateView({ data }) {
    const [previewWidth, setPreviewWidth] = useState("100%");
    const [downloading, setDownloading] = useState(false);
    const [showCode, setShowCode] = useState(false);
    const [key, setKey] = useState(0); // Force re-render if needed

    const handleDownload = () => {
        setDownloading(true);
        try {
            const blob = new Blob([data.code], { type: "text/plain" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${data.title.replace(/\s+/g, '-').toLowerCase()}.${data.framework === 'vue' ? 'vue' : data.framework === 'svelte' ? 'svelte' : 'jsx'}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            console.error("Download failed", err);
        } finally {
            setTimeout(() => setDownloading(false), 1000);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
            {/* Top Bar */}
            <header className="h-16 border-b border-white/10 flex items-center justify-between px-4 bg-[#050505]">
                <div className="flex items-center gap-4">
                    <Link href="/templates">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="font-bold text-sm md:text-base flex items-center gap-2">
                            {data.title}
                            <Badge variant="outline" className="text-[10px] border-pink-500/30 text-pink-400">TEMPLATE</Badge>
                        </h1>
                    </div>
                </div>

                {/* Device Toggles */}
                <div className="hidden md:flex bg-white/5 rounded-lg p-1 border border-white/5">
                    <button
                        onClick={() => setPreviewWidth("100%")}
                        className={`p-1.5 rounded transition-all ${previewWidth === "100%" ? "bg-white/10 text-white shadow-sm" : "text-gray-500 hover:text-gray-300"}`}
                        title="Desktop (100%)"
                    >
                        <Monitor size={16} />
                    </button>
                    <button
                        onClick={() => setPreviewWidth("768px")}
                        className={`p-1.5 rounded transition-all ${previewWidth === "768px" ? "bg-white/10 text-white shadow-sm" : "text-gray-500 hover:text-gray-300"}`}
                        title="Tablet (768px)"
                    >
                        <Tablet size={16} />
                    </button>
                    <button
                        onClick={() => setPreviewWidth("375px")}
                        className={`p-1.5 rounded transition-all ${previewWidth === "375px" ? "bg-white/10 text-white shadow-sm" : "text-gray-500 hover:text-gray-300"}`}
                        title="Mobile (375px)"
                    >
                        <Smartphone size={16} />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-white"
                        onClick={() => setKey(k => k + 1)}
                        title="Reload Preview"
                    >
                        <RefreshCcw className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={showCode ? "text-indigo-400 bg-indigo-500/10" : "text-muted-foreground"}
                        onClick={() => setShowCode(!showCode)}
                    >
                        <Code className="h-4 w-4 mr-2" />
                        {showCode ? "Hide Code" : "Show Code"}
                    </Button>
                    <Button
                        onClick={handleDownload}
                        disabled={downloading}
                        className="bg-pink-600 hover:bg-pink-700 text-white border-none shadow-lg shadow-pink-500/20"
                    >
                        {downloading ? (
                            <>
                                <Check className="mr-2 h-4 w-4" /> Downloaded
                            </>
                        ) : (
                            <>
                                <Download className="mr-2 h-4 w-4" /> Download Source
                            </>
                        )}
                    </Button>
                </div>
            </header>

            {/* Main Area */}
            <main className="flex-1 flex overflow-hidden relative">
                <LiveProvider code={data.code} scope={{ ...LucideIcons }} noInline={false} key={key}>

                    {/* Preview Frame */}
                    <div className="flex-1 bg-[#0F0F0F] relative overflow-auto flex justify-center py-8">
                        <div
                            className="transition-all duration-500 ease-in-out bg-black shadow-2xl border border-white/5 overflow-hidden flex flex-col"
                            style={{
                                width: previewWidth,
                                height: previewWidth === "100%" ? "100%" : "auto",
                                minHeight: "100%",
                                maxWidth: "100%",
                                borderRadius: previewWidth === "100%" ? "0" : "12px",
                                transformOrigin: "top center"
                            }}
                        >
                            <div className="flex-1 w-full h-full overflow-y-auto">
                                <LiveError className="p-4 text-red-400 bg-red-900/10 text-xs font-mono border-b border-red-500/20" />
                                <LivePreview className="w-full h-full" />
                            </div>
                        </div>
                    </div>

                    {/* Code Sidebar (Toggleable) */}
                    {showCode && (
                        <div className="w-1/3 border-l border-white/10 bg-[#050505] overflow-auto p-4 transition-all">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Source Code</span>
                                <Badge variant="secondary" className="text-xs">{data.framework}</Badge>
                            </div>
                            <pre className="text-xs font-mono text-gray-300 whitespace-pre-wrap select-all bg-white/5 p-4 rounded-lg border border-white/5">
                                {data.code}
                            </pre>
                        </div>
                    )}
                </LiveProvider>
            </main>
        </div>
    );
}
