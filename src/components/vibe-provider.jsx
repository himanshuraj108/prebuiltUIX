"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const VibeContext = createContext();

export const VIBES = {
    NEO: "neo",
    GLASS: "glass",
    CLEAN: "clean",
    SOFT: "soft",
};

export function VibeProvider({ children }) {
    const [vibe, setVibe] = useState(VIBES.GLASS);

    // Apply vibe-specific CSS variables or classes to <body> or root
    useEffect(() => {
        const root = document.documentElement;

        // Reset
        root.style.removeProperty("--radius");
        root.style.removeProperty("--shadow-strength");

        switch (vibe) {
            case VIBES.NEO:
                root.style.setProperty("--radius", "0px");
                root.style.setProperty("--shadow-strength", "100%"); // Hard shadows
                break;
            case VIBES.GLASS:
                root.style.setProperty("--radius", "12px");
                break;
            case VIBES.SOFT:
                root.style.setProperty("--radius", "20px");
                break;
            case VIBES.CLEAN:
                root.style.setProperty("--radius", "4px");
                break;
        }
    }, [vibe]);

    return (
        <VibeContext.Provider value={{ vibe, setVibe }}>
            <div data-vibe={vibe} className="vibe-container transition-all duration-500">
                {children}
            </div>
        </VibeContext.Provider>
    );
}

export const useVibe = () => useContext(VibeContext);
