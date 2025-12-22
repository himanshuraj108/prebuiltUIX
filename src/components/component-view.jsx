
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check, Copy, Monitor, Tablet, Smartphone } from "lucide-react";

export function ComponentView({ data, isFeedView = false }) {
    const [copied, setCopied] = useState(false);
    const [previewBg, setPreviewBg] = useState("bg-[#0F0F0F]");
    const [activeTab, setActiveTab] = useState("preview");
    const [previewWidth, setPreviewWidth] = useState("100%");

    // Simple JSX to HTML converter
    const getHtmlCode = (jsx) => {
        if (!jsx) return "";
        return jsx
            .replace(/className=/g, "class=")
            .replace(/\{`([^`]+)`\}/g, "$1") // Handle template literals possibly
            .replace(/=\{([^}]+)\}/g, '="$1"') // Handle dynamic props roughly
            .replace(/onClick=\{[^}]+\}/g, "") // Remove onClick handlers
            .replace(/\{[^}]+\}/g, "") // Remove other JS expressions roughly
            .replace(/<([^>]+)\s+\/>/g, "<$1 />") // Keep self closing for now or basic cleanup
            .replace(/\{\/\*.*?\*\/\}/gs, "") // Remove JSX comments
            .trim();
    };

    const displayCode = activeTab === "html" ? getHtmlCode(data.code) : data.code;

    const handleCopy = () => {
        navigator.clipboard.writeText(displayCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${isFeedView ? "mb-0" : "mb-20"}`}>
            {!isFeedView && (
                <div className="lg:col-span-3 mb-4">
                    <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20">{data.framework || "React + Tailwind"}</Badge>
                        <span className="flex items-center gap-1">
                            By <span className="text-foreground font-medium">{data.author}</span>
                        </span>
                        {data.description && <span className="border-l border-white/10 pl-4">{data.description}</span>}
                    </div>
                </div>
            )}

            <div className={`transition-all duration-500 ease-in-out ${previewWidth === "100%" ? "lg:col-span-3" : "lg:col-span-2"}`}>
                <Card className="min-h-[500px] border-white/10 overflow-hidden flex flex-col bg-[#050505] shadow-2xl">
                    {/* Toolbar */}
                    <div className="border-b border-white/10 p-4 flex justify-between items-center bg-black/60 backdrop-blur-sm flex-wrap gap-4">
                        <div className="flex bg-black/50 p-1 rounded-lg border border-white/5 gap-1">
                            <button
                                onClick={() => setActiveTab("preview")}
                                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === "preview" ? "bg-indigo-600 text-white shadow-lg" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                            >
                                Preview
                            </button>
                            <button
                                onClick={() => setActiveTab("code")}
                                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === "code" ? "bg-indigo-600 text-white shadow-lg" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                            >
                                React
                            </button>
                            <button
                                onClick={() => setActiveTab("html")}
                                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === "html" ? "bg-pink-600 text-white shadow-lg" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                            >
                                HTML
                            </button>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Device Toggles */}
                            <div className="flex gap-1 bg-black/50 p-1 rounded-lg border border-white/5 mr-2">
                                <button
                                    onClick={() => setPreviewWidth("100%")}
                                    className={`p-1.5 rounded transition-all ${previewWidth === "100%" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"}`}
                                    title="Desktop (100%)"
                                >
                                    <Monitor size={16} />
                                </button>
                                <button
                                    onClick={() => setPreviewWidth("768px")}
                                    className={`p-1.5 rounded transition-all ${previewWidth === "768px" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"}`}
                                    title="Tablet (768px)"
                                >
                                    <Tablet size={16} />
                                </button>
                                <button
                                    onClick={() => setPreviewWidth("375px")}
                                    className={`p-1.5 rounded transition-all ${previewWidth === "375px" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"}`}
                                    title="Mobile (375px)"
                                >
                                    <Smartphone size={16} />
                                </button>
                            </div>

                            {/* Framework Select */}
                            <div className="flex items-center gap-2">
                                <select
                                    className="h-8 bg-black/50 border border-white/10 rounded-md text-xs px-2 text-gray-400 focus:outline-none focus:border-indigo-500"
                                    defaultValue="react"
                                    onChange={(e) => {
                                        if (e.target.value === 'html') setActiveTab('html');
                                        else setActiveTab('code');
                                    }}
                                >
                                    <option value="react">React</option>
                                    <option value="vue">Vue</option>
                                    <option value="svelte">Svelte</option>
                                    <option value="html">HTML</option>
                                </select>

                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 px-2 bg-black/50 border-white/10 text-gray-400 hover:text-white"
                                    onClick={() => window.open('https://stackblitz.com', '_blank')}
                                    title="Open in Code Editor"
                                >
                                    <span className="sr-only">Open Editor</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
                                </Button>
                            </div>

                            <span className="w-px h-4 bg-white/10 mx-1"></span>

                            <div className="flex gap-2 bg-black/50 p-1.5 rounded-lg border border-white/5">
                                <button
                                    title="Dark Mode"
                                    className={`w-6 h-6 rounded bg-[#0F0F0F] border ${previewBg === "bg-[#0F0F0F]" ? "border-indigo-500 ring-1 ring-indigo-500" : "border-white/20"} transition-all`}
                                    onClick={() => setPreviewBg("bg-[#0F0F0F]")}
                                />
                                <button
                                    title="Light Mode"
                                    className={`w-6 h-6 rounded bg-gray-100 border ${previewBg === "bg-gray-100 text-black" ? "border-indigo-500 ring-1 ring-indigo-500" : "border-transparent"} transition-all`}
                                    onClick={() => setPreviewBg("bg-gray-100 text-black")}
                                />
                                <button
                                    title="Grid Mode"
                                    className={`w-6 h-6 rounded bg-slate-900 border ${previewBg.includes("bg-[linear-gradient") ? "border-indigo-500 ring-1 ring-indigo-500" : "border-white/20"} transition-all`}
                                    style={{ backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)", backgroundSize: "8px 8px" }}
                                    onClick={() => setPreviewBg("bg-[#1a1a1a] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px]")}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className={`flex-1 overflow-auto relative transition-colors duration-300 ${activeTab === "preview" ? previewBg : "bg-[#0d0d0d]"}`}>
                        {activeTab === "preview" ? (
                            <div className="min-h-full flex items-center justify-center p-8 lg:p-12">
                                <div
                                    className="w-full transition-all duration-500 ease-in-out border border-transparent"
                                    style={{ width: previewWidth, maxWidth: "100%" }}
                                >
                                    {previewWidth !== "100%" && (
                                        <div className="text-xs text-muted-foreground text-center mb-2 pb-2 border-b border-dashed border-white/10 w-full">
                                            {previewWidth === "768px" ? "Tablet View" : "Mobile View"}
                                        </div>
                                    )}
                                    <div dangerouslySetInnerHTML={{ __html: data.code }} className="w-full" />
                                </div>
                            </div>
                        ) : (
                            <div className="h-full relative font-mono text-sm leading-relaxed p-6 overflow-auto">
                                <Button size="icon" variant="outline" className="absolute top-4 right-4 h-8 w-8 bg-black/50 border-white/10" onClick={handleCopy}>
                                    {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                                </Button>
                                <div className="text-gray-400 select-text whitespace-pre">
                                    {displayCode}
                                </div>
                            </div>
                        )}
                    </div>
                </Card>
            </div>

            <div className={`space-y-6 transition-all duration-500 ease-in-out ${previewWidth === "100%" ? "lg:col-span-3 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0" : "lg:col-span-1"}`}>
                <Card className={`p-6 space-y-4 bg-transparent border-white/5 ${previewWidth === "100%" ? "lg:col-start-3" : ""}`}>
                    <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                        {activeTab === 'html' ? 'HTML Integration' : 'Installation'}
                    </h3>

                    {activeTab === 'html' ? (
                        <div className="bg-black/50 border border-white/10 p-3 rounded text-xs font-mono text-gray-400">
                            No dependencies required. Just copy-paste into your index.html.
                        </div>
                    ) : (
                        <div className="bg-black/50 border border-white/10 p-3 rounded text-xs font-mono flex justify-between items-center text-gray-400">
                            <span>npm install lucide-react clsx</span>
                            <Copy className="h-3 w-3 cursor-pointer hover:text-white" />
                        </div>
                    )}

                    <Button className={`w-full text-white ${activeTab === 'html' ? 'bg-pink-600 hover:bg-pink-500' : 'bg-indigo-600 hover:bg-indigo-500'}`} onClick={handleCopy}>
                        {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                        Copy {activeTab === 'html' ? 'HTML' : 'React'} Code
                    </Button>
                </Card>
            </div>
        </div>
    );
}
