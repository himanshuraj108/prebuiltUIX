const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SAMPLES = [
    {
        title: "Glassmorphism Credit Card",
        description: "A realistic glass-effect credit card with holographic shimmers. Perfect for fintech apps.",
        framework: "react",
        code: `<div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
      <div className="w-full px-8 absolute top-8">
        <div className="flex justify-between">
          <div className="">
            <p className="font-light">Name</p>
            <p className="font-medium tracking-widest">HIMANSHU RAJ</p>
          </div>
          <img className="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png"/>
        </div>
        <div className="pt-1">
          <p className="font-light">Card Number</p>
          <p className="font-medium tracking-more-wider">4642  3489  9867  7632</p>
        </div>
        <div className="pt-6 pr-6">
          <div className="flex justify-between">
            <div className="">
              <p className="font-light text-xs">Valid</p>
              <p className="font-medium tracking-wider text-sm">11/25</p>
            </div>
            <div className="">
              <p className="font-light text-xs">CVV</p>
              <p className="font-bold tracking-more-wider text-sm">···</p>
            </div>
          </div>
        </div>
      </div>
    </div>`
    },
    {
        title: "Neon Cyberpunk Button",
        description: "High-intensity neon glow button with glitch effect on hover.",
        framework: "react",
        code: `<button className="px-8 py-3 rounded-none border-2 border-cyan-500 text-cyan-500 uppercase tracking-widest font-bold bg-transparent hover:bg-cyan-500 hover:text-black transition-all shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_40px_rgba(6,182,212,0.8)] relative overflow-hidden group">
      <span className="relative z-10">Cyberpunk Activate</span>
    </button>`
    },
    {
        title: "Minimalist Newsletter Input",
        description: "Clean, accessible newsletter signup with success state simulation.",
        framework: "vue",
        code: `<template>
  <div class="flex gap-2">
    <input class="border-b-2 border-gray-300 focus:border-black outline-none px-4 py-2" placeholder="Email address" />
    <button class="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800">Subscribe</button>
  </div>
</template>`
    },
    {
        title: "3D Flip Card",
        description: "Product card that flips 180 degrees to reveal details on hover.",
        framework: "html",
        code: `<div class="group w-64 h-80 [perspective:1000px]">
  <div class="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
    <div class="absolute inset-0 bg-indigo-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold [backface-visibility:hidden]">
      Front
    </div>
    <div class="absolute inset-0 bg-slate-800 rounded-xl flex items-center justify-center text-white text-2xl font-bold [transform:rotateY(180deg)] [backface-visibility:hidden]">
      Back
    </div>
  </div>
</div>`
    },
    {
        title: "Animated Loading Spinner",
        description: "Smooth SVG liquid loading animation.",
        framework: "react",
        code: `<div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>`
    },
    {
        title: "Pricing Table (Pro)",
        description: "Responsive pricing table with popular choice highlight.",
        framework: "react",
        code: `<div className="p-8 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-xl hover:border-indigo-500/50 transition-colors">
      <h3 className="text-xl font-bold text-white">Pro Plan</h3>
      <div className="text-4xl font-bold text-white mt-4">$29<span className="text-sm font-normal text-gray-400">/mo</span></div>
      <ul className="mt-8 space-y-4 text-gray-400">
        <li>✓ Unlimited Projects</li>
        <li>✓ Analytics Dashboard</li>
        <li>✓ Priority Support</li>
      </ul>
      <button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium">Get Started</button>
    </div>`
    },
    {
        title: "Notification Toast",
        description: "Slide-in notification with progress bar.",
        framework: "svelte",
        code: `<div class="fixed bottom-4 right-4 bg-white text-black p-4 rounded-lg shadow-2xl flex items-center gap-3 animate-slide-in">
  <div class="bg-green-100 p-2 rounded-full text-green-600">✓</div>
  <div>
    <h4 class="font-bold text-sm">Success!</h4>
    <p class="text-xs text-gray-500">Item added to cart.</p>
  </div>
</div>`
    },
    {
        title: "Gradient Mesh Hero",
        description: "Abstract gradient background generator used in the Hero section.",
        framework: "react",
        code: `<div className="absolute inset-0 bg-[radial-gradient(at_top_left,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black opacity-80"></div>`
    },
    {
        title: "Social Share Buttons",
        description: "Floating social action bar with tooltips.",
        framework: "react",
        code: `<div className="flex gap-2">
      <button className="w-10 h-10 rounded-full bg-blue-500 text-white hover:-translate-y-1 transition-transform">Tw</button>
      <button className="w-10 h-10 rounded-full bg-blue-700 text-white hover:-translate-y-1 transition-transform">Fb</button>
    </div>`
    },
    {
        title: "Accordion FAQ",
        description: "Smooth height animation for FAQ sections.",
        framework: "react",
        code: `<details className="group border border-white/10 rounded-lg bg-white/5 open:bg-white/10 transition-colors p-4">
    <summary className="font-medium cursor-pointer list-none flex justify-between items-center text-white">
      Is this free?
      <span className="transition group-open:rotate-180">▼</span>
    </summary>
    <p className="text-gray-400 mt-4 text-sm animate-fade-in">Yes, PrebuiltUIX is 100% open source and free forever.</p>
  </details>`
    }
];

async function main() {
    console.log("Seeding started...");

    // Ensure Admin User Exists
    const adminEmail = "admin@prebuiltuix.com";
    let user = await prisma.user.findUnique({ where: { email: adminEmail } });

    if (!user) {
        user = await prisma.user.create({
            data: {
                name: "Admin",
                email: adminEmail,
                role: "ADMIN"
            }
        });
        console.log("Admin user created.");
    }

    // Clear existing official components to avoid dups
    // await prisma.component.deleteMany({ where: { isOfficial: true } });

    for (const sample of SAMPLES) {
        await prisma.component.create({
            data: {
                ...sample,
                userId: user.id,
                isOfficial: true,
                tags: "seed, premium, showcase",
                views: Math.floor(Math.random() * 5000)
            }
        });
    }

    console.log(`Seeded ${SAMPLES.length} components.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
