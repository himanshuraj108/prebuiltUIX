import mongoose from "mongoose";

const CatalogSchema = new mongoose.Schema({
    name: String,
    slug: { type: String, unique: true },
    description: String,
    group: String,
}, { timestamps: true });

export default mongoose.models.Catalog || mongoose.model("Catalog", CatalogSchema);
