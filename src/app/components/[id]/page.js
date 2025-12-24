import { ComponentView } from "@/components/component-view";
import connectDB from "@/lib/db";
import Component from "@/models/Component";
import { ALL_CATALOGS } from "@/data/catalogs";

export default async function CatalogPage({ params }) {
    const { id } = await params;
    const slug = id;

    // Find the catalog name from our static dictionary
    const catalogDef = ALL_CATALOGS.find(c => c.slug === slug);
    const categoryName = catalogDef ? catalogDef.name : slug;

    await connectDB();

    // Fetch ONLY official components for this category
    // Mongoose OR syntax: $or: [...]
    const rawComponents = await Component.find({
        isOfficial: true,
        $or: [
            { category: { $regex: new RegExp(`^${categoryName}$`, 'i') } },
            { category: { $regex: new RegExp(`^${slug}$`, 'i') } }
        ]
    }).sort({ createdAt: -1 }).lean();

    const components = rawComponents.map(doc => {
        const { _id, __v, ...rest } = doc; // Remove non-serializable fields
        return {
            ...rest,
            id: _id.toString(),
            createdAt: doc.createdAt?.toISOString(),
            updatedAt: doc.updatedAt?.toISOString()
        };
    });

    if (components.length === 0) {
        return (
            <div className="container py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Coming Soon</h1>
                <p className="text-muted-foreground">We haven't uploaded any official {categoryName} components yet.</p>
                <div className="mt-8 p-4 bg-white/5 inline-block rounded-lg border border-white/10">
                    <p className="text-xs text-muted-foreground">Check back later for updates!</p>
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
