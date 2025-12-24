const mongoose = require("mongoose");
require("dotenv").config();

const ComponentSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: String,
  framework: { type: String, default: "react" },
  type: { type: String, default: "component", enum: ["component", "template"] },
  category: { type: String, default: "Uncategorized" },
  tags: String,
  isOfficial: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  likes: [{ type: String }],
  userId: String,
}, { timestamps: true });

const Component = mongoose.models.Component || mongoose.model("Component", ComponentSchema);

const SAMPLE_TEMPLATE = {
  title: "SaaS Admin Dashboard",
  description: "A complete admin dashboard layout with sidebar, header, and stats cards. Fully responsive using Flexbox and Grid.",
  framework: "react",
  type: "template",
  category: "Dashboard",
  code: `
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-950 border-r border-gray-800 hidden md:flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-gray-800">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">AdminPro</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-600/10 text-blue-400 rounded-lg border border-blue-600/20">
            <span>📊</span> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
            <span>👥</span> Users
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
            <span>⚙️</span> Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-gray-950 border-b border-gray-800 flex items-center justify-between px-8">
          <h2 className="font-semibold text-lg">Overview</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 bg-white/5 rounded-full hover:bg-white/10">🔔</button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500"></div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800/50 border border-white/5 p-6 rounded-xl hover:border-blue-500/30 transition-colors">
              <h3 className="text-gray-400 text-sm font-medium">Total Revenue</h3>
              <p className="text-3xl font-bold mt-2">$45,231</p>
              <span className="text-green-400 text-xs mt-2 inline-block">↑ 12% from last month</span>
            </div>
            <div className="bg-gray-800/50 border border-white/5 p-6 rounded-xl hover:border-purple-500/30 transition-colors">
              <h3 className="text-gray-400 text-sm font-medium">Active Users</h3>
              <p className="text-3xl font-bold mt-2">2,405</p>
              <span className="text-green-400 text-xs mt-2 inline-block">↑ 5% this week</span>
            </div>
            <div className="bg-gray-800/50 border border-white/5 p-6 rounded-xl hover:border-pink-500/30 transition-colors">
              <h3 className="text-gray-400 text-sm font-medium">Pending Issues</h3>
              <p className="text-3xl font-bold mt-2">18</p>
              <span className="text-red-400 text-xs mt-2 inline-block">↓ 2 urgent</span>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800/30 border border-white/5 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-4">Recent Transactions</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">💰</div>
                    <div>
                      <p className="font-medium">Payment received</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                  </div>
                  <span className="text-green-400 font-mono">+$120.00</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
    `
};

async function seed() {
  console.log("Seeding Template...");
  const uri = process.env.DATABASE_URL || process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing DATABASE_URL or MONGODB_URI");
  await mongoose.connect(uri);

  // Check if template exists
  const exists = await Component.findOne({ title: SAMPLE_TEMPLATE.title });
  if (!exists) {
    await Component.create({
      ...SAMPLE_TEMPLATE,
      tags: "dashboard, admin, template, official",
      userId: "admin-seed",
      isOfficial: true
    });
    console.log("OFFICIAL Template seeded successfully!");
  } else {
    console.log("Template already exists.");
  }

  await mongoose.disconnect();
}

seed();
