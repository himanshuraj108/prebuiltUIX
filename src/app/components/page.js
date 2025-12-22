"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ALL_CATALOGS } from "@/data/catalogs";

export default function ComponentsIndex() {
    // Group catalogs by their Group Name for a nicer display
    const grouped = ALL_CATALOGS.reduce((acc, item) => {
        if (!acc[item.group]) acc[item.group] = [];
        acc[item.group].push(item);
        return acc;
    }, {});

    return (
        <div className="container py-12 px-4 md:px-8 max-w-[1600px] mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Component Library</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Explore our comprehensive library of components, organized by category.
                </p>
            </div>

            <div className="space-y-16">
                {Object.entries(grouped).map(([groupName, items]) => (
                    <div key={groupName}>
                        <h2 className="text-2xl font-bold mb-6 text-white/80 border-b border-white/10 pb-2">{groupName}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {items.map((catalog) => (
                                <Link key={catalog.slug} href={`/components/${catalog.slug}`}>
                                    <motion.div whileHover={{ y: -5 }} className="h-full">
                                        <Card className="h-full p-6 bg-white/5 border-white/10 hover:border-indigo-500/50 hover:bg-white/10 transition-colors flex flex-col justify-between group">
                                            <div>
                                                <div className="flex items-center justify-between mb-4">
                                                    <Badge variant="outline" className="group-hover:text-indigo-400 group-hover:border-indigo-500/50 transition-colors">
                                                        {catalog.slug.length} variants
                                                    </Badge>
                                                    {/* Note: In real app we would count actual variants */}
                                                </div>
                                                <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{catalog.name}</h3>
                                                <p className="text-sm text-muted-foreground">Browse {catalog.name.toLowerCase()} components.</p>
                                            </div>
                                            <div className="mt-6 flex items-center text-sm font-medium text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                                                View Collection →
                                            </div>
                                        </Card>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
