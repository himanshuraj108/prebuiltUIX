import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Basic variance logic without CVA dependency (simulated)
const badgeVariants = (variant) => {
    const base = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    const variants = {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        glass: "border-transparent bg-white/10 text-white backdrop-blur-md shadow-sm border border-white/20",
        neon: "border-transparent bg-green-500 text-black shadow-[0_0_10px_#22c55e]",
    }
    return cn(base, variants[variant || "default"])
}

function Badge({ className, variant, ...props }) {
    return (
        <div className={cn(badgeVariants(variant), className)} {...props} />
    )
}

export { Badge, badgeVariants }
