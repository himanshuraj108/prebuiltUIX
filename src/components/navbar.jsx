"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sparkles, Menu, X, Palette } from "lucide-react"
import { useVibe, VIBES } from "@/components/vibe-provider"

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()
    const { vibe, setVibe } = useVibe()

    const links = [
        { href: "/components", label: "Components" },
        { href: "/community", label: "Community" },
        { href: "/upload", label: "Upload" },
    ]

    const toggleVibe = () => {
        const vibes = Object.values(VIBES)
        const currentIndex = vibes.indexOf(vibe)
        const nextVibe = vibes[(currentIndex + 1) % vibes.length]
        setVibe(nextVibe)
    }

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="container flex h-16 items-center justify-between px-4 md:px-8">
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-purple-500/20">
                        <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        PrebuiltUIX
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-white",
                                pathname === link.href ? "text-white" : "text-white/60"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <Button variant="ghost" size="icon" onClick={toggleVibe} title={`Current Vibe: ${vibe}`}>
                        <Palette className="h-5 w-5 text-indigo-400" />
                    </Button>

                    <Link href="/login">
                        <Button variant="glass" size="sm" className="ml-2">
                            Get Started
                        </Button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-white/60 hover:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden border-b border-white/10 bg-black/90 backdrop-blur-xl"
                >
                    <div className="flex flex-col p-4 space-y-4">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-sm font-medium text-white/80 hover:text-white"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                            <Button variant="glass" size="sm" className="w-full">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            )}
        </nav>
    )
}
