const mongoose = require("mongoose");
require("dotenv").config();

const ComponentSchema = new mongoose.Schema({}, { strict: false });
const Component = mongoose.models.Component || mongoose.model("Component", ComponentSchema);

async function main() {
    console.log("Promoting Template...");
    const uri = process.env.DATABASE_URL || process.env.MONGODB_URI;
    await mongoose.connect(uri);

    const res = await Component.updateOne(
        { title: "SaaS Admin Dashboard" },
        {
            $set: {
                isOfficial: true,
                type: "template",
                tags: "dashboard, admin, template, official, premium"
            }
        }
    );

    console.log("Update Result:", res);
    await mongoose.disconnect();
}

main();
