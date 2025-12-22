"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

// Using a custom implementation since Radix might not be installed or verified.
// But wait, user has "lucide-react", "framer-motion". Radix is standard usually.
// I'll stick to a robust accessible custom switch using button or input to avoid "Module not found" if @radix-ui isn't there.
// Actually, I'll use a pure Framer Motion switch to be safe and flashy.

const Switch = React.forwardRef(({ className, checked, onCheckedChange, ...props }, ref) => (
    <button
        type="button"
        role="switch"
        aria-checked={checked}
        data-state={checked ? "checked" : "unchecked"}
        onClick={() => onCheckedChange?.(!checked)}
        ref={ref}
        className={cn(
            "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
            checked ? "bg-primary" : "bg-input",
            className
        )}
        {...props}
    >
        <motion.span
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={cn(
                "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0",
                checked ? "translate-x-5" : "translate-x-0"
            )}
        />
    </button>
))
Switch.displayName = "Switch"

export { Switch }
