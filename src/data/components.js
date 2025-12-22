export const ALL_COMPONENTS = [
  {
    id: 101,
    title: "Glassmorphism Navbar",
    category: "Navigation",
    catalog: "Navbar",
    description: "A premium glass-effect navigation bar with logo, links, and a call-to-action button.",
    views: 4200,
    official: true,
    author: "System",
    code: `<div class="w-full relative rounded-xl overflow-hidden bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center h-[200px] flex items-start pt-6 justify-center">
  <div class="absolute inset-0 bg-black/30"></div>
  <nav class="relative z-10 w-[90%] max-w-4xl mx-auto rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl px-6 py-4 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">P</div>
      <span class="font-bold text-white tracking-wide">Prebuilt</span>
    </div>
    <div class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-200">
      <a href="#" class="hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Products</a>
      <a href="#" class="hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Solutions</a>
      <a href="#" class="hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Pricing</a>
    </div>
    <div class="flex items-center gap-4">
      <button class="hidden md:block text-sm font-medium text-white/80 hover:text-white transition-colors">Log In</button>
      <button class="px-5 py-2 rounded-xl bg-white text-black text-sm font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all transform hover:-translate-y-0.5">Get Access</button>
    </div>
  </nav>
</div>`
  },
  {
    id: 102,
    title: "Hero Section (Dark Modern)",
    category: "Heroes",
    catalog: "Hero",
    description: "High-conversion hero section with gradient text and dual buttons.",
    views: 2800,
    official: true,
    author: "System",
    code: `<div class="relative w-full py-24 overflow-hidden bg-black text-white isolate">
  <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
  <div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] -z-10"></div>
  
  <div class="w-full max-w-4xl mx-auto px-6 text-center">
    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 hover:bg-white/10 transition-colors cursor-pointer group">
      <span class="relative flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
      </span>
      <span class="text-sm font-medium text-gray-300 group-hover:text-white">v2.0 is now live</span>
      <span class="text-gray-500">|</span>
      <span class="text-xs text-indigo-400 font-bold group-hover:translate-x-1 transition-transform">Read Changelog →</span>
    </div>
    
    <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
      Example of <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Next-Gen UI</span>
      <br />for Developers.
    </h1>
    
    <p class="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
      Stop wasting time on boilerplate. Detailed, accessible, and performant components 
      ready to copy-paste into your next big project.
    </p>
    
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
      <button class="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-gray-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95">
        Start Building Free
      </button>
      <button class="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-2 hover:border-indigo-500/50">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        Watch Demo
      </button>
    </div>
    
    <div class="mt-12 text-sm text-gray-500">
      <p>Trusted by frontend teams at <span class="font-semibold text-gray-300">Vercel</span>, <span class="font-semibold text-gray-300">Stripe</span>, and <span class="font-semibold text-gray-300">Linear</span>.</p>
    </div>
  </div>
</div>`
  },
  {
    id: 104,
    title: "Feature Grid (Interactive)",
    category: "Sections",
    catalog: "Section",
    description: "A 3-column feature grid with hover effects and icons.",
    views: 1540,
    official: true,
    author: "System",
    code: `<div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-black/20 rounded-3xl border border-white/5">
  {[
    { icon: "⚡", title: "Lightning Fast", desc: "Built on the edge for minimal latency." },
    { icon: "🔒", title: "Secure by Default", desc: "Enterprise-grade security." },
    { icon: "🎨", title: "Beautifully Designed", desc: "Pixels that tell a story." }
  ].map((item, i) => (
    <div key={i} class="group p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
      <div class="w-14 h-14 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-2xl mb-6 shadow-inner group-hover:scale-110 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50 transition-all">
        {item.icon}
      </div>
      <h3 class="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">{item.title}</h3>
      <p class="text-gray-400 leading-relaxed text-sm group-hover:text-gray-200">
        {item.desc}
      </p>
    </div>
  ))}
</div>`
  },
  {
    id: 106,
    title: "Pricing Cards (Detailed)",
    category: "Sections",
    catalog: "Price Tag",
    description: "Comparison pricing cards with a highlighted popular option.",
    views: 2600,
    official: true,
    author: "System",
    code: `<div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto p-4 items-center">
  {/* Starter Plan */}
  <div class="p-8 rounded-3xl border border-white/10 bg-black/40 flex flex-col hover:border-white/20 transition-colors">
    <h3 class="text-lg font-medium text-gray-400 mb-2">Starter</h3>
    <div class="text-4xl font-bold mb-6 text-white">$0<span class="text-lg text-gray-500 font-normal">/mo</span></div>
    <ul class="space-y-4 mb-8 flex-1">
      <li class="flex items-center gap-3 text-sm text-gray-300"><span class="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 text-white text-[10px]">✓</span> 1 Project</li>
      <li class="flex items-center gap-3 text-sm text-gray-300"><span class="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 text-white text-[10px]">✓</span> Community Support</li>
    </ul>
    <button class="w-full py-3 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/5">Start Free</button>
  </div>

  {/* Pro Plan */}
  <div class="relative p-8 rounded-3xl border border-indigo-500/50 bg-[#0c0c12] flex flex-col md:scale-110 md:-translate-y-2 shadow-[0_0_40px_rgba(99,102,241,0.15)] z-10">
    <div class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-xs font-bold text-white uppercase tracking-wider shadow-lg">Most Popular</div>
    <h3 class="text-lg font-medium text-indigo-400 mb-2">Pro</h3>
    <div class="text-5xl font-bold mb-6 text-white">$29<span class="text-lg text-gray-500 font-normal">/mo</span></div>
    <ul class="space-y-4 mb-8 flex-1">
      <li class="flex items-center gap-3 text-sm text-white font-medium"><span class="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px]">✓</span> Unlimited Projects</li>
      <li class="flex items-center gap-3 text-sm text-white font-medium"><span class="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px]">✓</span> Priority Support</li>
      <li class="flex items-center gap-3 text-sm text-white font-medium"><span class="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px]">✓</span> Analytics Dashboard</li>
    </ul>
    <button class="w-full py-3 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg hover:shadow-indigo-500/25">Get Started</button>
  </div>

  {/* Enterprise Plan */}
  <div class="p-8 rounded-3xl border border-white/10 bg-black/40 flex flex-col hover:border-white/20 transition-colors">
    <h3 class="text-lg font-medium text-gray-400 mb-2">Enterprise</h3>
    <div class="text-4xl font-bold mb-6 text-white">$99<span class="text-lg text-gray-500 font-normal">/mo</span></div>
    <ul class="space-y-4 mb-8 flex-1">
      <li class="flex items-center gap-3 text-sm text-gray-300"><span class="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 text-white text-[10px]">✓</span> Dedicated Support</li>
      <li class="flex items-center gap-3 text-sm text-gray-300"><span class="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 text-white text-[10px]">✓</span> Custom SLA</li>
      <li class="flex items-center gap-3 text-sm text-gray-300"><span class="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 text-white text-[10px]">✓</span> SSO & Audit Logs</li>
    </ul>
    <button class="w-full py-3 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/5">Contact Sales</button>
  </div>
</div>`
  },
  {
    id: 105,
    title: "Simple Clean Navbar",
    category: "Navigation",
    catalog: "Navbar",
    description: "A minimal white navigation bar for corporate sites.",
    views: 1200,
    official: true,
    author: "System",
    code: `<nav class="w-full border-b border-gray-200 bg-white px-6 py-3 flex items-center justify-between">
  <div class="font-bold text-xl tracking-tight">Brand</div>
  <div class="hidden md:flex gap-6 text-sm text-gray-600">
    <a href="#" class="hover:text-black">Features</a>
    <a href="#" class="hover:text-black">Pricing</a>
    <a href="#" class="hover:text-black">About</a>
  </div>
  <button class="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800">Sign Up</button>
</nav>`
  },
  {
    id: 107,
    title: "Gradient Hero",
    category: "Heroes",
    catalog: "Hero",
    description: "A simple centered hero with gradient background.",
    views: 900,
    official: true,
    author: "System",
    code: `<div class="bg-gradient-to-r from-purple-500 to-indigo-500 py-32 text-center text-white">
  <h1 class="text-4xl font-bold mb-4">Build Faster</h1>
  <p class="text-lg opacity-90 mb-8">The ultimate UI kit for modern web development.</p>
  <button class="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all">Get Started</button>
</div>`
  }
];
