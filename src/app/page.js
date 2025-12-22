"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowRight, Code, Zap, Globe, Layers } from "lucide-react";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 lg:py-40 flex flex-col items-center text-center px-4 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl space-y-8 z-10"
        >
          <Badge variant="glass" className="px-4 py-1.5 text-sm mb-4">
            ✨ Introducing PrebuiltUIX 2.0
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            The Future of <br />
            <span className="text-indigo-400">Prebuilt UI Components</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-[42rem] mx-auto leading-relaxed">
            Stop building from scratch. Copy & paste beautiful, accessible, and high-performance components.
            Now with <span className="text-white font-semibold">MongoDB</span> power and Community uploads.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/components">
              <Button size="lg" className="h-12 px-8 text-lg shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] hover:shadow-[0_0_50px_-10px_rgba(99,102,241,0.8)] transition-all">
                Browse Components <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/upload">
              <Button variant="glass" size="lg" className="h-12 px-8 text-lg">
                Upload Your Own <Code className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Abstract Background Blurs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px] -z-10 animate-blob" />
      </section>

      {/* Features Grid */}
      <section className="container px-4 py-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div variants={item}>
            <Card glass className="h-full">
              <CardHeader>
                <Zap className="h-10 w-10 text-yellow-400 mb-2" />
                <CardTitle>Hyper Speed</CardTitle>
                <CardDescription>
                  Copy code in one click. No complex installation or proprietary runtime needed.
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card glass className="h-full">
              <CardHeader>
                <Globe className="h-10 w-10 text-blue-400 mb-2" />
                <CardTitle>Community Driven</CardTitle>
                <CardDescription>
                  Explore thousands of components uploaded by developers around the world.
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card glass className="h-full">
              <CardHeader>
                <Layers className="h-10 w-10 text-pink-400 mb-2" />
                <CardTitle>Framework Agnostic</CardTitle>
                <CardDescription>
                  Get code for React, Vue, Svelte, or just plain HTML/CSS. Universal Export.
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
