"use client";

import { useParams } from "next/navigation";
import { ALL_COMPONENTS } from "@/data/components";
import { ComponentView } from "@/components/component-view";

function slugify(text) {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
}

export default function CatalogPage() {
    const params = useParams();
    const slug = params?.id; // We are using [id] folder but passing slug

    // 1. Try to find components by Catalog Slug
    let matches = ALL_COMPONENTS.filter(c => c.catalog && slugify(c.catalog) === slug);

    // 2. Fallback: If no matches, try to find by ID (Legacy support for /components/101)
    if (matches.length === 0) {
        const byId = ALL_COMPONENTS.find(c => c.id.toString() === slug);
        if (byId) matches = [byId];
    }

    if (matches.length === 0) {
        return (
            <div className="container py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Catalog Not Found</h1>
                <p className="text-muted-foreground">No components found for "{slug}".</p>
                {/* Debug info */}
                {/* <p className="text-xs text-muted-foreground mt-4">Slug: {slug}</p> */}
            </div>
        );
    }

    const title = matches[0].catalog || matches[0].title;

    return (
        <div className="container py-12 px-4 md:px-8 max-w-[1600px] mx-auto">
            <div className="mb-12 border-b border-white/10 pb-8">
                <h1 className="text-4xl font-extrabold mb-4 tracking-tight">{title}</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Browse our collection of {title.toLowerCase()} components. Fully responsive, accessible, and ready to drop into your project.
                </p>
            </div>

            <div className="space-y-24">
                {matches.map((component) => (
                    <ComponentView key={component.id} data={component} />
                ))}
            </div>
        </div>
    );
}
