import { ComponentView } from "@/components/component-view";
import prisma from "@/lib/prisma";
import { ALL_CATALOGS } from "@/data/catalogs";

export default async function CatalogPage({ params }) {
    const slug = params.id;

    // Find the catalog name from our static dictionary to ensure we have a nice display name
    // (and to map slug back to proper Case if needed, though we save exactly what matches)
    const catalogDef = ALL_CATALOGS.find(c => c.slug === slug);
    const categoryName = catalogDef ? catalogDef.name : slug; // Fallback to slug if not found

    // Fetch ONLY official components for this category
    const components = await prisma.component.findMany({
        where: {
            /* 
               We match EITHER:
               1. isOfficial is true (Admin)
               2. category matches the slug OR the nice name 
                  (Since we save "Buttons", but slug is "buttons", we might need to check both or Regex)
               For now, we know Admin Upload saves "Buttons" (Proper Case).
            */
            isOfficial: true,
            OR: [
                { category: { equals: categoryName, mode: 'insensitive' } },
                { category: { equals: slug, mode: 'insensitive' } }
            ]
        },
        orderBy: { createdAt: "desc" }
    });

    if (components.length === 0) {
        return (
            <div className="container py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Coming Soon</h1>
                <p className="text-muted-foreground">We haven't uploaded any official {categoryName} components yet.</p>
                <div className="mt-8 p-4 bg-white/5 inline-block rounded-lg border border-white/10">
                    <p className="text-xs text-muted-foreground">Admin? Upload one at <span className="text-mono text-white">/admin/upload</span></p>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-12 px-4 md:px-8 max-w-[1600px] mx-auto">
            <div className="mb-12 border-b border-white/10 pb-8">
                <h1 className="text-4xl font-extrabold mb-4 tracking-tight">{categoryName}</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Browse our official collection of {categoryName.toLowerCase()} components. Fully responsive, accessible, and ready to drop into your project.
                </p>
            </div>

            <div className="space-y-24">
                {components.map((component) => (
                    <ComponentView key={component.id} data={component} />
                ))}
            </div>
        </div>
    );
}
