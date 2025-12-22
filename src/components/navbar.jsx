"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sparkles, Menu, X, Palette } from "lucide-react"
import { useVibe, VIBES } from "@/components/vibe-provider"

import { useSession, signOut } from "next-auth/react"

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()
    const { vibe, setVibe } = useVibe()
    const { data: session, status } = useSession()
    const [avatarUrl, setAvatarUrl] = React.useState("")

    React.useEffect(() => {
        if (session?.user?.image) {
            setAvatarUrl(session.user.image);
        }

        // Fetch fresh profile to get the latest avatar (bypassing stale cookie)
        if (session?.user) {
            fetch("/api/user/profile")
                .then(res => res.json())
                .then(data => {
                    if (data.image) setAvatarUrl(data.image);
                })
                .catch(err => console.error(err));
        }
    }, [session]);

    const links = [
        { href: "/components", label: "Components" },
        { href: "/community", label: "Community" },
    ]

    // Only add Upload link if logged in
    if (session) {
        links.push({ href: "/upload", label: "Upload" })
    }

    // Add Admin link if admin
    if (session?.user?.role === "ADMIN") {
        links.push({ href: "/admin/dashboard", label: "Admin" })
    }

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

                    {status === "loading" ? (
                        <div className="h-8 w-20 bg-white/5 animate-pulse rounded" />
                    ) : session ? (
                        <div className="flex items-center gap-4">
                            <Link href="/settings" className="flex items-center gap-2 hover:opacity-80 transition-opacity" title="Account Settings">
                                <div className="h-8 w-8 rounded-full overflow-hidden border border-white/20">
                                    {avatarUrl ? (
                                        <img src={avatarUrl} alt={session.user.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="h-full w-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
                                            {session.user.name?.[0]?.toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <span className="text-sm text-white/60 hidden lg:inline-block">
                                    {session.user.name}
                                </span>
                            </Link>
                            <Button
                                variant="glass"
                                size="sm"
                                className="ml-2 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50"
                                onClick={() => signOut({ callbackUrl: "/" })}
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Link href="/login">
                            <Button variant="glass" size="sm" className="ml-2">
                                Get Started
                            </Button>
                        </Link>
                    )}
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
            {
                isOpen && (
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

                            {session ? (
                                <>
                                    <Link
                                        href="/settings"
                                        onClick={() => setIsOpen(false)}
                                        className="text-sm font-medium text-white/80 hover:text-white flex items-center gap-2"
                                    >
                                        <span>Settings</span>
                                    </Link>
                                    <Button
                                        variant="glass"
                                        size="sm"
                                        className="w-full text-red-400"
                                        onClick={() => {
                                            setIsOpen(false);
                                            signOut({ callbackUrl: "/" });
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <Link href="/login" onClick={() => setIsOpen(false)}>
                                    <Button variant="glass" size="sm" className="w-full">
                                        Get Started
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )
            }
        </nav >
    )
}
