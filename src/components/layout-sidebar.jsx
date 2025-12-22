
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ChevronDown, ChevronRight, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATALOG_GROUPS, ALL_CATALOGS } from "@/data/catalogs";
import { motion, AnimatePresence } from "framer-motion";

export function LayoutSidebar() {
    const pathname = usePathname();
    const [searchTerm, setSearchTerm] = useState("");
    const [openGroups, setOpenGroups] = useState(
        CATALOG_GROUPS.map(g => g.group) // Default all open
    );

    const toggleGroup = (group) => {
        setOpenGroups(prev =>
            prev.includes(group)
                ? prev.filter(g => g !== group)
                : [...prev, group]
        );
    };

    const filteredGroups = CATALOG_GROUPS.map(group => {
        const filteredItems = group.items.filter(item =>
            item.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredItems.length === 0 && !group.group.toLowerCase().includes(searchTerm.toLowerCase())) {
            return null;
        }
        return {
            ...group,
            items: searchTerm ? filteredItems : group.items // If search is active, show only matching items
        };
    }).filter(Boolean);

    return (
        <aside className="fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] border-r border-white/10 bg-black/50 backdrop-blur-xl overflow-y-auto pb-10 scrollbar-hide">
            <div className="p-4 sticky top-0 bg-black/80 backdrop-blur-xl z-10 border-b border-white/5">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search components..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-muted-foreground/50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="p-3 space-y-1">
                <Link
                    href="/components"
                    className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-4",
                        pathname === "/components"
                            ? "bg-indigo-500/20 text-indigo-400"
                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    )}
                >
                    <LayoutGrid className="h-4 w-4" />
                    All Categories
                </Link>

                {filteredGroups.map((group) => {
                    const isOpen = openGroups.includes(group.group) || searchTerm.length > 0;

                    return (
                        <div key={group.group} className="space-y-1">
                            <button
                                onClick={() => toggleGroup(group.group)}
                                className="flex w-full items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 hover:text-foreground transition-colors group"
                            >
                                <span>{group.group.replace(' Components', '')}</span>
                                {isOpen ? <ChevronDown className="h-3 w-3 opacity-50" /> : <ChevronRight className="h-3 w-3 opacity-50" />}
                            </button>

                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="space-y-0.5 ml-2 border-l border-white/5 pl-2">
                                            {group.items.map((item) => {
                                                const slug = item.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
                                                const href = `/components/${slug}`;
                                                const isActive = pathname === href;

                                                return (
                                                    <Link
                                                        key={item}
                                                        href={href}
                                                        className={cn(
                                                            "flex items-center justify-between w-full px-3 py-1.5 rounded-md text-sm transition-all relative",
                                                            isActive
                                                                ? "bg-indigo-500/10 text-indigo-400 font-medium"
                                                                : "text-muted-foreground hover:text-white hover:bg-white/5"
                                                        )}
                                                    >
                                                        {item}
                                                        {isActive && (
                                                            <motion.div
                                                                layoutId="active-nav"
                                                                className="absolute left-0 w-0.5 h-4 bg-indigo-500 rounded-full"
                                                            />
                                                        )}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}

                {filteredGroups.length === 0 && (
                    <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                        No components found for "{searchTerm}"
                    </div>
                )}
            </div>
        </aside>
    );
}
