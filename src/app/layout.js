import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";
import { VibeProvider } from "@/components/vibe-provider";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PrebuiltUIX - Advanced Copypaste UI Library",
  description: "The world's most advanced, free, and open-source UI library for developers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "min-h-screen bg-background antialiased selection:bg-purple-500/30 selection:text-purple-200")}>
        <Providers>
          <VibeProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background" />
              <div className="fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
              <main className="flex-1 pt-16">{children}</main>
            </div>
          </VibeProvider>
        </Providers>
      </body>
    </html>
  );
}
